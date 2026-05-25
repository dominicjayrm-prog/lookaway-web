/**
 * One-shot migration: rename every blog post banner in Supabase Storage
 * from its legacy hash-only filename (e.g. `a39b097544f91eaf-1779689381519.png`)
 * to an SEO-friendly slug-based filename (e.g. `how-to-study-effectively-
 * 2026-a39b0975.png`). Updates the matching `banner_url` in the database
 * to point at the new file and deletes the original.
 *
 * Idempotent: posts whose banner filename already starts with the post slug
 * are skipped. Safe to call multiple times.
 *
 * Auth: admin session only. POST to /api/admin/rename-banners.
 */
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET = 'blog-banners';

function safeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

/** Extract the storage key (object path within the bucket) from a public
 *  Supabase URL like
 *  https://<project>.supabase.co/storage/v1/object/public/blog-banners/<key>
 */
function extractKey(url: string): string | null {
  const marker = `/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx < 0) return null;
  return url.slice(idx + marker.length);
}

interface RenameResult {
  slug: string;
  status: 'renamed' | 'skipped' | 'error';
  from?: string;
  to?: string;
  reason?: string;
}

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const admin = supabaseAdmin();

  const { data: posts, error: fetchErr } = await admin
    .from('blog_posts')
    .select('id, slug, banner_url')
    .not('banner_url', 'is', null);

  if (fetchErr) {
    return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  }

  const results: RenameResult[] = [];

  for (const post of posts ?? []) {
    const slug = safeSlug(post.slug);
    const currentKey = extractKey(post.banner_url as string);

    if (!currentKey) {
      results.push({ slug, status: 'error', reason: 'Could not parse banner URL' });
      continue;
    }

    // Already renamed? Skip.
    if (currentKey.startsWith(`${slug}-`) || currentKey.startsWith(`${slug}.`)) {
      results.push({ slug, status: 'skipped', from: currentKey, reason: 'Already slug-named' });
      continue;
    }

    // Preserve the file extension, append the last 8 hex chars of the
    // existing key (or "banner" if none) as a short suffix for uniqueness.
    const extMatch = currentKey.match(/\.([a-z0-9]+)$/i);
    const ext = extMatch ? extMatch[1] : 'png';
    const hashSuffix = currentKey.replace(/\..+$/, '').slice(0, 8) || 'banner';
    const newKey = `${slug}-${hashSuffix}.${ext}`;

    // Move (rename) the object inside the bucket. Supabase Storage exposes a
    // dedicated move() that does this in one round trip rather than
    // download+upload+delete.
    const { error: moveErr } = await admin.storage.from(BUCKET).move(currentKey, newKey);
    if (moveErr) {
      results.push({ slug, status: 'error', from: currentKey, to: newKey, reason: moveErr.message });
      continue;
    }

    const { data: pub } = admin.storage.from(BUCKET).getPublicUrl(newKey);
    const newUrl = pub.publicUrl;

    const { error: updateErr } = await admin
      .from('blog_posts')
      .update({ banner_url: newUrl })
      .eq('id', post.id);

    if (updateErr) {
      // Try to roll the file back so DB and storage do not drift apart.
      await admin.storage.from(BUCKET).move(newKey, currentKey).catch(() => {});
      results.push({ slug, status: 'error', from: currentKey, to: newKey, reason: `DB update failed: ${updateErr.message}` });
      continue;
    }

    results.push({ slug, status: 'renamed', from: currentKey, to: newKey });
  }

  const summary = {
    total: results.length,
    renamed: results.filter((r) => r.status === 'renamed').length,
    skipped: results.filter((r) => r.status === 'skipped').length,
    errors: results.filter((r) => r.status === 'error').length,
  };

  return NextResponse.json({ summary, results });
}
