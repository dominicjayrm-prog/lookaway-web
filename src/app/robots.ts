// TODO: Update domain from playlookaway.app to new Blanked domain
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/challenge/', '/invite/'],
    },
    sitemap: 'https://playlookaway.app/sitemap.xml',
  };
}
