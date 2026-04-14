import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET = 'blog-banners';
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type. Use JPG, PNG, WebP, or GIF.' }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 8MB)' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const hash = crypto.createHash('sha256').update(Buffer.from(bytes)).digest('hex').slice(0, 16);
  const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
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
