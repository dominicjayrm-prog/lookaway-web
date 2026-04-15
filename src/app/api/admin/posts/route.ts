import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { mdToHtml, mdWordCount, mdReadingTime } from '@/lib/markdown';
import { isValidSlug } from '@/lib/slug';
import { sanitizeFaqs } from '@/lib/faqs';

async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function POST(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { title, slug, subtitle, meta_description, keywords, banner_url, banner_alt, content, faqs, published } = body;

  if (!title?.trim()) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  if (!isValidSlug(slug)) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });

  const md = typeof content === 'string' ? content : '';
  const wordCount = mdWordCount(md);
  const minutes = mdReadingTime(wordCount);
  const contentHtml = mdToHtml(md);
  const cleanFaqs = sanitizeFaqs(faqs);

  const { data, error } = await supabaseAdmin()
    .from('blog_posts')
    .insert({
      title: title.trim(),
      slug: slug.trim(),
      subtitle: subtitle || null,
      meta_description: meta_description || null,
      keywords: keywords || [],
      banner_url: banner_url || null,
      banner_alt: banner_alt || null,
      // Store the markdown source in the JSONB column so the editor can
      // round-trip it. HTML is separate, in content_html.
      content: { type: 'markdown', source: md },
      content_html: contentHtml,
      word_count: wordCount,
      reading_time_minutes: minutes,
      faqs: cleanFaqs,
      published: Boolean(published),
      published_at: published ? new Date().toISOString() : null,
    })
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

export async function GET() {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabaseAdmin().from('blog_posts').select('*').order('updated_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
