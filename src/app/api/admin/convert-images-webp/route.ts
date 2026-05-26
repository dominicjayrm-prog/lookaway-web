/**
 * One-shot migration: convert every PNG / JPEG blog image (banner_url plus
 * inline images inside post bodies) to WebP at quality 82, server-side via
 * sharp. Updates blog_posts.banner_url and rewrites the markdown source
 * + content_html to point at the new .webp URLs.
 *
 * Idempotent: images already in .webp (or .gif, which we leave alone) are
 * skipped. Safe to run multiple times.
 *
 * Does NOT delete the old PNG files. Run /api/admin/cleanup-orphan-banners
 * after verifying everything looks good to remove the now-orphaned PNGs.
 *
 * Auth: admin session only. POST to /api/admin/convert-images-webp.
 */
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { mdToHtml } from '@/lib/markdown';

const BUCKET = 'blog-banners';
const STORAGE_PREFIX = `/storage/v1/object/public/${BUCKET}/`;
const WEBP_QUALITY = 82;
// Generous cap: many in-body images are portrait or square. 1600x1600 keeps
// them sharp on retina while still slashing file weight. Banner aspect
// (1200x630) fits comfortably under this.
const MAX_DIMENSION = 1600;

interface ConvertedFile {
  oldKey: string;
  newKey: string;
  newUrl: string;
  originalBytes: number;
  convertedBytes: number;
}

interface PostResult {
  slug: string;
  status: 'updated' | 'skipped' | 'error';
  banner?: 'converted' | 'already-webp' | 'gif-skipped' | 'error';
  inlineConverted?: number;
  inlineSkipped?: number;
  reason?: string;
}

/** Pull the storage key out of a public Supabase URL. Returns null if the
 *  URL is not from our bucket (external image, leave alone). */
function extractKey(url: string | null | undefined): string | null {
  if (!url) return null;
  const idx = url.indexOf(STORAGE_PREFIX);
  if (idx < 0) return null;
  return url.slice(idx + STORAGE_PREFIX.length);
}

/** Should this storage key be converted? */
function needsConversion(key: string): boolean {
  return /\.(png|jpe?g)$/i.test(key);
}

/** Cache so the same image referenced from multiple posts is only converted
 *  once per migration run. */
const conversionCache = new Map<string, ConvertedFile>();

/** Download an image from Supabase Storage, convert to WebP, upload back
 *  with the same base filename but .webp extension. Returns the new public
 *  URL or null if conversion was not applicable / failed. */
async function convertOne(key: string): Promise<ConvertedFile | { error: string } | null> {
  // Already converted in this run? Use cached result.
  if (conversionCache.has(key)) return conversionCache.get(key)!;

  if (!needsConversion(key)) return null;

  const admin = supabaseAdmin();
  const { data: downloaded, error: dlErr } = await admin.storage.from(BUCKET).download(key);
  if (dlErr || !downloaded) {
    return { error: `download failed: ${dlErr?.message ?? 'no data'}` };
  }
  const inputBytes = Buffer.from(await downloaded.arrayBuffer());

  let webpBuffer: Buffer;
  try {
    webpBuffer = await sharp(inputBytes)
      .rotate()
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 5 })
      .toBuffer();
  } catch (e) {
    return { error: `sharp failed: ${e instanceof Error ? e.message : String(e)}` };
  }

  // Strip the old extension and append .webp.
  const newKey = key.replace(/\.(png|jpe?g)$/i, '.webp');

  const { error: upErr } = await admin.storage.from(BUCKET).upload(newKey, webpBuffer, {
    contentType: 'image/webp',
    upsert: true, // idempotent re-runs overwrite the same target
  });
  if (upErr) return { error: `upload failed: ${upErr.message}` };

  const { data: pub } = admin.storage.from(BUCKET).getPublicUrl(newKey);
  const result: ConvertedFile = {
    oldKey: key,
    newKey,
    newUrl: pub.publicUrl,
    originalBytes: inputBytes.length,
    convertedBytes: webpBuffer.length,
  };
  conversionCache.set(key, result);
  return result;
}

/** Find every Supabase-bucket image URL referenced in a markdown source.
 *  Catches both ![alt](url) and bare URLs in HTML. */
function findImageUrls(md: string): string[] {
  const urls = new Set<string>();
  // Markdown image syntax
  for (const m of md.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)) {
    const u = m[1].split(/\s+/)[0];
    if (u && u.includes(STORAGE_PREFIX)) urls.add(u);
  }
  // Raw HTML img tags (older posts may have these)
  for (const m of md.matchAll(/<img[^>]+src\s*=\s*["']([^"']+)["']/gi)) {
    if (m[1].includes(STORAGE_PREFIX)) urls.add(m[1]);
  }
  return Array.from(urls);
}

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const admin = supabaseAdmin();
  conversionCache.clear();

  const { data: posts, error: fetchErr } = await admin
    .from('blog_posts')
    .select('id, slug, banner_url, content, content_html');
  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 });

  const results: PostResult[] = [];
  let totalOriginalBytes = 0;
  let totalConvertedBytes = 0;

  for (const post of posts ?? []) {
    const r: PostResult = { slug: post.slug, status: 'skipped' };

    // -- Banner --
    const bannerKey = extractKey(post.banner_url as string | null);
    let newBannerUrl: string | null = null;

    if (!bannerKey) {
      r.banner = post.banner_url ? 'skipped' as never : undefined;
    } else if (/\.gif$/i.test(bannerKey)) {
      r.banner = 'gif-skipped';
    } else if (/\.webp$/i.test(bannerKey)) {
      r.banner = 'already-webp';
    } else {
      const conv = await convertOne(bannerKey);
      if (conv && 'error' in conv) {
        r.banner = 'error';
        r.reason = `banner: ${conv.error}`;
      } else if (conv) {
        r.banner = 'converted';
        newBannerUrl = conv.newUrl;
        totalOriginalBytes += conv.originalBytes;
        totalConvertedBytes += conv.convertedBytes;
      }
    }

    // -- Inline images --
    type ContentBlob = { type?: string; source?: unknown };
    const content = post.content as ContentBlob | null;
    const md = typeof content?.source === 'string' ? content.source : '';
    const urls = findImageUrls(md);

    const replacements: Array<{ from: string; to: string }> = [];
    let inlineConverted = 0;
    let inlineSkipped = 0;

    for (const url of urls) {
      const key = extractKey(url);
      if (!key) continue;
      if (/\.gif$/i.test(key) || /\.webp$/i.test(key)) {
        inlineSkipped += 1;
        continue;
      }
      const conv = await convertOne(key);
      if (!conv || 'error' in conv) {
        inlineSkipped += 1;
        if (conv && 'error' in conv && !r.reason) {
          r.reason = `inline ${key}: ${conv.error}`;
        }
        continue;
      }
      replacements.push({ from: url, to: conv.newUrl });
      inlineConverted += 1;
      totalOriginalBytes += conv.originalBytes;
      totalConvertedBytes += conv.convertedBytes;
    }

    r.inlineConverted = inlineConverted;
    r.inlineSkipped = inlineSkipped;

    // -- Save updates if anything changed --
    if (newBannerUrl || replacements.length > 0) {
      let newMd = md;
      for (const rep of replacements) {
        // Global string replace; URLs are stable so this is safe.
        newMd = newMd.split(rep.from).join(rep.to);
      }
      const newContentHtml = replacements.length > 0
        ? mdToHtml(newMd)
        : (post.content_html as string);

      const update: Record<string, unknown> = {};
      if (newBannerUrl) update.banner_url = newBannerUrl;
      if (replacements.length > 0) {
        update.content = { ...(content ?? {}), type: 'markdown', source: newMd };
        update.content_html = newContentHtml;
      }

      const { error: updErr } = await admin.from('blog_posts').update(update).eq('id', post.id);
      if (updErr) {
        r.status = 'error';
        r.reason = `DB update failed: ${updErr.message}`;
      } else {
        r.status = 'updated';
      }
    }

    results.push(r);
  }

  const summary = {
    posts: results.length,
    updated: results.filter((r) => r.status === 'updated').length,
    skipped: results.filter((r) => r.status === 'skipped').length,
    errors: results.filter((r) => r.status === 'error').length,
    uniqueImagesConverted: conversionCache.size,
    bytesSavedMB: ((totalOriginalBytes - totalConvertedBytes) / 1024 / 1024).toFixed(2),
    compressionRatio: totalConvertedBytes > 0
      ? (totalOriginalBytes / totalConvertedBytes).toFixed(2) + 'x'
      : 'n/a',
  };

  return NextResponse.json({ summary, results });
}
