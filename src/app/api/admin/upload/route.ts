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
  const hash = crypto.createHash('sha256').update(Buffer.from(bytes)).digest('hex').slice(0, 16);
  const filename = `${hash}-${Date.now()}.${ext}`;

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
