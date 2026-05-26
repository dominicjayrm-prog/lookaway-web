/**
 * One-shot cleanup: delete every file in the blog-banners bucket that is
 * not currently referenced by any blog post (banner_url, in-body markdown
 * image, or in-body HTML img tag). Designed to run AFTER
 * /api/admin/convert-images-webp so the now-orphaned PNG originals are
 * removed without taking the live site with them.
 *
 * Safety:
 *   - Builds the "referenced" set from the DB before deleting anything.
 *   - Refuses to run if the referenced set is empty (would mean a query
 *     bug or empty DB; either way we should not nuke the bucket).
 *   - Dry-run mode via ?dryRun=1 query param so the operator can preview
 *     what would be deleted first.
 *
 * Auth: admin session only. POST to /api/admin/cleanup-orphan-banners.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET = 'blog-banners';
const STORAGE_PREFIX = `/storage/v1/object/public/${BUCKET}/`;

function extractKey(url: string | null | undefined): string | null {
  if (!url) return null;
  const idx = url.indexOf(STORAGE_PREFIX);
  if (idx < 0) return null;
  return url.slice(idx + STORAGE_PREFIX.length);
}

function collectReferencedKeys(posts: Array<{ banner_url: string | null; content: unknown }>): Set<string> {
  const refs = new Set<string>();
  for (const p of posts) {
    const bk = extractKey(p.banner_url);
    if (bk) refs.add(bk);

    const content = p.content as { source?: unknown } | null;
    const md = typeof content?.source === 'string' ? content.source : '';
    if (!md) continue;

    for (const m of md.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)) {
      const u = m[1].split(/\s+/)[0];
      const k = extractKey(u);
      if (k) refs.add(k);
    }
    for (const m of md.matchAll(/<img[^>]+src\s*=\s*["']([^"']+)["']/gi)) {
      const k = extractKey(m[1]);
      if (k) refs.add(k);
    }
  }
  return refs;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dryRun = req.nextUrl.searchParams.get('dryRun') === '1';

  const admin = supabaseAdmin();

  // 1. Pull every blog post and build the referenced-keys set.
  const { data: posts, error: postsErr } = await admin
    .from('blog_posts')
    .select('banner_url, content');
  if (postsErr) return NextResponse.json({ error: postsErr.message }, { status: 500 });

  const referenced = collectReferencedKeys(posts ?? []);

  // Safety: refuse to run if the referenced set is suspiciously empty.
  if (referenced.size === 0) {
    return NextResponse.json({
      error: 'Refusing to run: zero referenced keys found. Either the DB is empty or the URL parser missed everything. Investigate before retrying.',
    }, { status: 400 });
  }

  // 2. List every object in the bucket. Supabase storage list() paginates;
  //    pull pages of 1000 until exhausted.
  const allKeys: string[] = [];
  let offset = 0;
  const PAGE = 1000;
  while (true) {
    const { data: page, error: listErr } = await admin.storage
      .from(BUCKET)
      .list('', { limit: PAGE, offset });
    if (listErr) return NextResponse.json({ error: listErr.message }, { status: 500 });
    if (!page || page.length === 0) break;
    for (const f of page) {
      if (f.name) allKeys.push(f.name);
    }
    if (page.length < PAGE) break;
    offset += PAGE;
  }

  const orphaned = allKeys.filter((k) => !referenced.has(k));

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      totalInBucket: allKeys.length,
      referenced: referenced.size,
      wouldDelete: orphaned.length,
      orphanedKeys: orphaned,
    });
  }

  // 3. Delete orphans in chunks (Supabase storage.remove takes an array).
  let deleted = 0;
  const errors: string[] = [];
  const CHUNK = 100;
  for (let i = 0; i < orphaned.length; i += CHUNK) {
    const chunk = orphaned.slice(i, i + CHUNK);
    const { error: rmErr } = await admin.storage.from(BUCKET).remove(chunk);
    if (rmErr) {
      errors.push(`chunk starting at ${i}: ${rmErr.message}`);
    } else {
      deleted += chunk.length;
    }
  }

  return NextResponse.json({
    dryRun: false,
    totalInBucket: allKeys.length,
    referenced: referenced.size,
    deleted,
    errors,
  });
}
