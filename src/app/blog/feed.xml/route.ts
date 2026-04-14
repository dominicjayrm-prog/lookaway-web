import { listPublishedPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

function esc(s: string | null | undefined) {
  if (!s) return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await listPublishedPosts();
  const now = new Date().toUTCString();

  const items = posts
    .map((p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <description>${esc(p.meta_description ?? p.subtitle ?? '')}</description>
      <pubDate>${p.published_at ? new Date(p.published_at).toUTCString() : now}</pubDate>
    </item>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blanked Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Articles on memory, brain training, and cognitive science.</description>
    <language>en-GB</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=600',
    },
  });
}
