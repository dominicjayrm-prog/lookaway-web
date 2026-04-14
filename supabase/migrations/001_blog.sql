-- Blanked blog — run this in your Supabase SQL editor (existing mobile app project)

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  banner_url TEXT,
  banner_alt TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_html TEXT NOT NULL DEFAULT '',
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[] DEFAULT '{}',
  reading_time_minutes INT DEFAULT 0,
  word_count INT DEFAULT 0,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts(published, published_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION update_blog_posts_updated_at();

-- Row-Level Security: public can read only published posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are publicly readable"
ON blog_posts FOR SELECT
USING (published = true);

-- All writes require service-role key (bypasses RLS), so no write policies needed.

-- Storage bucket for banners
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-banners', 'blog-banners', true)
ON CONFLICT (id) DO NOTHING;

-- Public read on banners
CREATE POLICY "Public read on blog banners"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-banners');
