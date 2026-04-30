import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { listPublishedPosts } from '@/lib/blog';
import { COMPARISONS } from '@/lib/comparisons';
import { GLOSSARY } from '@/lib/glossary';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPublishedPosts().catch(() => []);
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/press`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/memory-test`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/memory-training-for-students`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/memory-games-for-seniors`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/memory-training-for-adhd`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/brain-games-for-office-workers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/delete-account`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/es/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/es/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const compareEntries: MetadataRoute.Sitemap = Object.values(COMPARISONS).map((c) => ({
    url: `${SITE_URL}/compare/${c.slug}`,
    lastModified: c.lastUpdated ? new Date(c.lastUpdated) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const glossaryEntries: MetadataRoute.Sitemap = Object.values(GLOSSARY).map((g) => ({
    url: `${SITE_URL}/glossary/${g.slug}`,
    lastModified: g.lastUpdated ? new Date(g.lastUpdated) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...compareEntries, ...glossaryEntries, ...postEntries];
}
