import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import sharp from 'sharp';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET = 'blog-banners';
// Allowed input MIME types. We accept PNG / JPG / WebP and transcode them
// to WebP server-side so the file actually stored is always small and
// modern. GIFs (often animated) bypass conversion and are stored as-is.
// `file.name` is ignored entirely so a filename like `hack.php.png` cannot
// give us `php` as the stored extension.
const ACCEPTED_INPUT = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

// Sharp WebP encode tuning. Quality 82 is the sweet spot for photo-style
// banners: visually lossless to the eye, ~10x smaller than the source PNG.
const WEBP_QUALITY = 82;
// Cap dimensions at 1600x840 (2x the recommended 1200x630 social size).
// Most uploads from ChatGPT come in at 1024 or 1536; this is a safety
// ceiling for anyone uploading an absurdly large file by mistake.
const MAX_W = 1600;
const MAX_H = 840;

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

  if (!ACCEPTED_INPUT.has(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type. Use JPG, PNG, WebP, or GIF.' }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 8MB)' }, { status: 400 });
  }

  const inputBytes = Buffer.from(await file.arrayBuffer());

  // GIF (often animated): store as-is, animated WebP is supported but
  // sharp's animated GIF -> animated WebP path is finicky and not worth
  // the risk for a niche format that we rarely use for banners anyway.
  let outBytes: Buffer = inputBytes;
  let outExt = 'gif';
  let outContentType = 'image/gif';

  if (file.type !== 'image/gif') {
    // Resize down (only if the image is bigger than the cap), then encode
    // as WebP. withoutEnlargement keeps small uploads at their natural
    // size; fit:inside preserves aspect ratio.
    outBytes = await sharp(inputBytes)
      .rotate() // honour EXIF orientation
      .resize({ width: MAX_W, height: MAX_H, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 5 })
      .toBuffer();
    outExt = 'webp';
    outContentType = 'image/webp';
  }

  const hash = crypto.createHash('sha256').update(outBytes).digest('hex').slice(0, 8);
  // Prefer an SEO-friendly slug-based filename when the editor passes the
  // post slug along with the upload. Falls back to a hash-only filename for
  // brand-new posts where the slug has not been filled in yet.
  const slug = safeSlug(form.get('slug'));
  const filename = slug
    ? `${slug}-${hash}.${outExt}`
    : `${hash}-${Date.now()}.${outExt}`;

  const admin = supabaseAdmin();
  const { error } = await admin.storage.from(BUCKET).upload(filename, outBytes, {
    contentType: outContentType,
    upsert: false,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: publicUrl } = admin.storage.from(BUCKET).getPublicUrl(filename);
  return NextResponse.json({
    url: publicUrl.publicUrl,
    filename,
    originalBytes: inputBytes.length,
    storedBytes: outBytes.length,
  });
}
