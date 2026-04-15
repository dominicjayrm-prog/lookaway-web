import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Public client — respects RLS. Safe for server and browser. */
export function supabasePublic() {
  if (!url || !anonKey) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  return createClient(url, anonKey);
}

/** Admin client — bypasses RLS. SERVER ONLY. Never import into a Client Component. */
export function supabaseAdmin() {
  if (!url || !serviceKey) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Type for a blog post row. */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  banner_url: string | null;
  banner_alt: string | null;
  content: unknown; // TipTap JSON
  content_html: string;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[];
  reading_time_minutes: number;
  word_count: number;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  /** Optional FAQ entries rendered as an accordion + FAQPage JSON-LD on the public post. */
  faqs: BlogFaq[];
}

export interface BlogFaq {
  q: string;
  a: string;
}
