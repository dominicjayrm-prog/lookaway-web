# Blanked Admin Panel — Setup Guide

Password-protected admin at `/admin` with a Notion-style blog editor, SEO validator, and public blog at `/blog`.

## One-time setup

### 1. Supabase — run the SQL migration

Open your existing Blanked mobile app Supabase project → SQL Editor → paste the contents of `supabase/migrations/001_blog.sql` and run it.

This creates:
- `blog_posts` table
- `blog-banners` storage bucket
- Row-level security (public read when `published = true`, writes require service role)

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=         # Supabase → Settings → API → Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Supabase → Settings → API → anon public key
SUPABASE_SERVICE_ROLE_KEY=        # Supabase → Settings → API → service_role secret key
ADMIN_EMAIL=dominicjay.rm@gmail.com
ADMIN_PASSWORD_HASH=$2b$10$rhsn8qleUFveGo.AKUrRiOfFyM1a2BSYxkJniedMPl7SSgiJ4VHEu
SESSION_SECRET=7a0658ec627c85c82a42b3c6ac9dbf8d0cbbb761005871b40d318dbda5352b10
```

(Password hash above corresponds to `Blanked2026`. To change, run:
`node -e "require('bcryptjs').hash('NEW_PASSWORD', 10).then(h => console.log(h))"`)

### 3. Add the same env vars to Vercel

Vercel dashboard → project → Settings → Environment Variables → paste all 6 vars for Production + Preview + Development → Save → Redeploy.

## Daily use

### Login
Go to `/admin/login`, sign in with the credentials above.

### Write a post
- Click "+ New post"
- Type title (auto-slugs)
- Write content — use the toolbar for H2/H3/bold/lists/links/images
- Paste from AI: content paste preserves formatting; use heading dropdown to convert to H2/H3
- Upload a banner image (1200×630 recommended)
- Fill meta description (120-160 chars)
- Add 3-5 keywords (used for related-posts matching)
- Watch the SEO panel turn green before clicking **Publish**

### SEO panel checks
- **Errors (red)** block publish — must be fixed
- **Warnings (gold)** don't block but should be fixed for best SEO
- **Link check** runs 2 seconds after you stop typing
- Published post auto-appears at `/blog/[your-slug]`

### Manage posts
`/admin` shows all posts with edit/view/delete. Drafts aren't visible to the public or Google.

## What's wired up

- **Live SEO validation**: title length, meta description length, slug format, duplicate slug detection, H1 count, heading hierarchy, image alt text, word count, broken internal/external links
- **Auto-save every 10s** on existing posts
- **JSON-LD Article schema** on every post (Google rich results)
- **Per-post OG image** auto-generated with banner + title
- **Sitemap.xml** includes every published post
- **RSS feed** at `/blog/feed.xml`
- **Canonical URLs** on every post page
- **robots.txt** already allows blog

## Submit to Google after launch

1. Deploy with env vars set in Vercel
2. Go to [search.google.com/search-console](https://search.google.com/search-console)
3. Add property for `playblanked.com`
4. Verify (easiest: DNS TXT record)
5. Submit sitemap URL: `https://playblanked.com/sitemap.xml`
6. Publish 3-5 posts before launch so Google has content to crawl
