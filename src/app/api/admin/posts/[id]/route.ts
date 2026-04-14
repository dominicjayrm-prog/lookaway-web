import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { renderTiptapToHtml, countWords, readingTime } from '@/lib/tiptap-html';
import { isValidSlug } from '@/lib/slug';

async function requireAuth() {
  const session = await getSession();
  return session;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { data, error } = await supabaseAdmin().from('blog_posts').select('*').eq('id', id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  const body = await req.json();
  const { title, slug, subtitle, meta_description, keywords, banner_url, banner_alt, content, published } = body;

  if (!title?.trim()) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  if (!isValidSlug(slug)) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });

  // Get existing to check if we're transitioning to published
  const { data: existing } = await supabaseAdmin().from('blog_posts').select('published, published_at').eq('id', id).maybeSingle();
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const wordCount = countWords(content);
  const minutes = readingTime(wordCount);
  const contentHtml = renderTiptapToHtml(content);

  const update: Record<string, unknown> = {
    title: title.trim(),
    slug: slug.trim(),
    subtitle: subtitle || null,
    meta_description: meta_description || null,
    keywords: keywords || [],
    banner_url: banner_url || null,
    banner_alt: banner_alt || null,
    content,
    content_html: contentHtml,
    word_count: wordCount,
    reading_time_minutes: minutes,
  };

  if (published !== undefined) {
    update.published = Boolean(published);
    // Set published_at on first publish, keep existing otherwise
    if (published && !existing.published) {
      update.published_at = new Date().toISOString();
    }
    if (!published) {
      // Keep original published_at when unpublishing (for future re-publish)
    }
  }

  const { data, error } = await supabaseAdmin()
    .from('blog_posts')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { error } = await supabaseAdmin().from('blog_posts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
