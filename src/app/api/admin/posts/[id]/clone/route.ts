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

  // Find a free slug. Start with "<slug>-copy", then append -2, -3, ... if taken.
  const baseSlug = `${source.slug}-copy`.slice(0, 60);
  const { data: existing } = await sb
    .from('blog_posts')
    .select('slug')
    .like('slug', `${baseSlug}%`);
  const taken = new Set((existing ?? []).map(r => r.slug as string));
  let newSlug = baseSlug;
  let n = 2;
  while (taken.has(newSlug)) {
    const suffix = `-${n}`;
    newSlug = `${baseSlug.slice(0, 60 - suffix.length)}${suffix}`;
    n += 1;
    if (n > 100) break; // sanity
  }

  const { data, error } = await sb
    .from('blog_posts')
    .insert({
      title: `Copy of ${source.title}`.slice(0, 200),
      slug: newSlug,
      subtitle: source.subtitle,
      meta_description: source.meta_description,
      keywords: source.keywords ?? [],
      banner_url: source.banner_url,
      banner_alt: source.banner_alt,
      content: source.content,
      content_html: source.content_html,
      word_count: source.word_count,
      reading_time_minutes: source.reading_time_minutes,
      published: false,
      published_at: null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
