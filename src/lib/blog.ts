import { supabasePublic, supabaseAdmin, type BlogPost } from './supabase';

/** List all published posts, newest first. Public (uses RLS). */
export async function listPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabasePublic()
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  if (error) { console.error('listPublishedPosts', error); return []; }
  return (data ?? []) as BlogPost[];
}

/** Get a single published post by slug. Returns null if not found or unpublished. */
export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabasePublic()
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) { console.error('getPublishedPostBySlug', error); return null; }
  return data as BlogPost | null;
}

/** Get 3 related published posts by keyword overlap. Excludes the given post id. */
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  if (!post.keywords || post.keywords.length === 0) {
    // No keywords — fall back to most recent other posts
    const { data } = await supabasePublic()
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .neq('id', post.id)
      .order('published_at', { ascending: false })
      .limit(limit);
    return (data ?? []) as BlogPost[];
  }
  const { data } = await supabasePublic()
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .neq('id', post.id)
    .overlaps('keywords', post.keywords)
    .order('published_at', { ascending: false })
    .limit(limit);
  return (data ?? []) as BlogPost[];
}

/** Admin: list all posts (published + draft), newest first. */
export async function adminListPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabaseAdmin()
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) { console.error('adminListPosts', error); return []; }
  return (data ?? []) as BlogPost[];
}

/** Admin: get a post by id (published or draft). */
export async function adminGetPost(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabaseAdmin()
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) { console.error('adminGetPost', error); return null; }
  return data as BlogPost | null;
}

/** Admin: get all existing slugs (for duplicate detection). */
export async function adminListSlugs(excludeId?: string): Promise<string[]> {
  const query = supabaseAdmin().from('blog_posts').select('slug, id');
  const { data, error } = await query;
  if (error) { console.error('adminListSlugs', error); return []; }
  return (data ?? []).filter(r => r.id !== excludeId).map(r => r.slug as string);
}

/** Admin: get all published slugs (for internal link validation). */
export async function listPublishedSlugs(): Promise<string[]> {
  const { data } = await supabasePublic()
    .from('blog_posts')
    .select('slug')
    .eq('published', true);
  return (data ?? []).map(r => r.slug as string);
}
