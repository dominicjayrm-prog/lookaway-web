import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const sb = supabaseAdmin();

  const { data: source, error: fetchErr } = await sb
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  if (!source) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const baseSlug = `${source.slug}-copy`.slice(0, 60);

  const insertBody = {
    title: `Copy of ${source.title}`.slice(0, 200),
    subtitle: source.subtitle,
    meta_description: source.meta_description,
    keywords: source.keywords ?? [],
    banner_url: source.banner_url,
    banner_alt: source.banner_alt,
    content: source.content,
    content_html: source.content_html,
    word_count: source.word_count,
    reading_time_minutes: source.reading_time_minutes,
    faqs: source.faqs ?? [],
    published: false,
    published_at: null,
  };

  // Try a fresh slug up to a handful of times. If the slug we picked loses
  // a race against another concurrent request (unique constraint violation
  // '23505'), append a suffix and retry. Falls back to a timestamp on the
  // last attempt so the insert always eventually succeeds.
  const candidates: string[] = [baseSlug];
  for (let n = 2; n <= 9; n++) {
    const suffix = `-${n}`;
    candidates.push(`${baseSlug.slice(0, 60 - suffix.length)}${suffix}`);
  }
  const tsSuffix = `-${Date.now().toString(36).slice(-6)}`;
  candidates.push(`${baseSlug.slice(0, 60 - tsSuffix.length)}${tsSuffix}`);

  for (const slug of candidates) {
    const { data, error } = await sb
      .from('blog_posts')
      .insert({ ...insertBody, slug })
      .select()
      .single();
    if (!error) return NextResponse.json(data);
    // 23505 = unique_violation; try the next candidate slug.
    if (error.code !== '23505') {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Could not allocate a free clone slug' }, { status: 500 });
}
