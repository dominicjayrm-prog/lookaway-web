import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET = 'blog-banners';
// Map of allowed MIME types to the canonical file extension we'll use when
// saving. This prevents an attacker who crafts a filename like `hack.php.png`
// from getting `php` as the stored extension — we ignore `file.name` entirely
// and derive the extension from the MIME type instead.
const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

/** Server-side slug sanitiser. Trusts nothing from the client. Keeps
 *  lowercase a-z, 0-9, and hyphens. Collapses runs of hyphens, trims, and
 *  hard-caps at 80 chars so even a malicious slug cannot blow up the file
 *  path. */
function safeSlug(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const ext = MIME_TO_EXT[file.type];
  if (!ext) {
    return NextResponse.json({ error: 'Unsupported file type. Use JPG, PNG, WebP, or GIF.' }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 8MB)' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const hash = crypto.createHash('sha256').update(Buffer.from(bytes)).digest('hex').slice(0, 8);
  // Prefer an SEO-friendly slug-based filename when the editor passes the
  // post slug along with the upload. Falls back to a hash-only filename for
  // brand-new posts where the slug has not been filled in yet. The short
  // content hash is always appended so a re-upload of a same-named banner
  // cannot collide with the previous one (Supabase upsert is false).
  const slug = safeSlug(form.get('slug'));
  const filename = slug
    ? `${slug}-${hash}.${ext}`
    : `${hash}-${Date.now()}.${ext}`;

  const admin = supabaseAdmin();
  const { error } = await admin.storage.from(BUCKET).upload(filename, bytes, {
    contentType: file.type,
    upsert: false,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: publicUrl } = admin.storage.from(BUCKET).getPublicUrl(filename);
  return NextResponse.json({ url: publicUrl.publicUrl, filename });
}
