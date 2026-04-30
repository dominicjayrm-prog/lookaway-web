import { SITE_URL } from '@/lib/constants';
import { listPublishedPosts } from '@/lib/blog';
import { COMPARISONS } from '@/lib/comparisons';

export const dynamic = 'force-dynamic';

interface AlternateLink {
  hreflang: string;
  href: string;
}

interface Entry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: AlternateLink[];
}

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderEntry(e: Entry): string {
  const lines = [
    `  <url>`,
    `    <loc>${esc(e.loc)}</loc>`,
  ];
  if (e.lastmod) lines.push(`    <lastmod>${esc(e.lastmod)}</lastmod>`);
  if (e.changefreq) lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
  if (typeof e.priority === 'number') lines.push(`    <priority>${e.priority.toFixed(1)}</priority>`);
  if (e.alternates) {
    for (const a of e.alternates) {
      lines.push(`    <xhtml:link rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}"/>`);
    }
  }
  lines.push(`  </url>`);
  return lines.join('\n');
}

export async function GET() {
  const posts = await listPublishedPosts().catch(() => []);
  const now = new Date().toISOString();

  const privacyAlts: AlternateLink[] = [
    { hreflang: 'en', href: `${SITE_URL}/privacy` },
    { hreflang: 'es-ES', href: `${SITE_URL}/es/privacy` },
  ];
  const termsAlts: AlternateLink[] = [
    { hreflang: 'en', href: `${SITE_URL}/terms` },
    { hreflang: 'es-ES', href: `${SITE_URL}/es/terms` },
  ];

  const staticEntries: Entry[] = [
    { loc: SITE_URL, lastmod: now, changefreq: 'weekly', priority: 1.0 },
    { loc: `${SITE_URL}/blog`, lastmod: now, changefreq: 'weekly', priority: 0.9 },
    { loc: `${SITE_URL}/about`, lastmod: now, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/support`, lastmod: now, changefreq: 'monthly', priority: 0.6 },
    { loc: `${SITE_URL}/press`, lastmod: now, changefreq: 'monthly', priority: 0.5 },
    { loc: `${SITE_URL}/compare`, lastmod: now, changefreq: 'weekly', priority: 0.8 },
    { loc: `${SITE_URL}/privacy`, lastmod: now, changefreq: 'monthly', priority: 0.3, alternates: privacyAlts },
    { loc: `${SITE_URL}/terms`, lastmod: now, changefreq: 'monthly', priority: 0.3, alternates: termsAlts },
    { loc: `${SITE_URL}/es/privacy`, lastmod: now, changefreq: 'monthly', priority: 0.3, alternates: privacyAlts },
    { loc: `${SITE_URL}/es/terms`, lastmod: now, changefreq: 'monthly', priority: 0.3, alternates: termsAlts },
  ];

  const compareEntries: Entry[] = Object.values(COMPARISONS).map((c) => ({
    loc: `${SITE_URL}/compare/${c.slug}`,
    lastmod: c.lastUpdated ? new Date(c.lastUpdated).toISOString() : now,
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const postEntries: Entry[] = posts.map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    lastmod: new Date(p.updated_at).toISOString(),
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const all = [...staticEntries, ...compareEntries, ...postEntries];
  const body = all.map(renderEntry).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=600',
    },
  });
}
