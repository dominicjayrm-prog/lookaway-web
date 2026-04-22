import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { listPublishedPosts } from '@/lib/blog';
import { COMPARISONS } from '@/lib/comparisons';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPublishedPosts().catch(() => []);

  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/support`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          'en-GB': `${SITE_URL}/privacy`,
          'es-ES': `${SITE_URL}/es/privacy`,
        },
      },
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          'en-GB': `${SITE_URL}/terms`,
          'es-ES': `${SITE_URL}/es/terms`,
        },
      },
    },
    {
      url: `${SITE_URL}/es/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          'en-GB': `${SITE_URL}/privacy`,
          'es-ES': `${SITE_URL}/es/privacy`,
        },
      },
    },
    {
      url: `${SITE_URL}/es/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          'en-GB': `${SITE_URL}/terms`,
          'es-ES': `${SITE_URL}/es/terms`,
        },
      },
    },
    { url: `${SITE_URL}/press`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const compareEntries: MetadataRoute.Sitemap = Object.values(COMPARISONS).map((c) => ({
    url: `${SITE_URL}/compare/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...compareEntries, ...postEntries];
}
