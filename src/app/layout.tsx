import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL, FOUNDER, SOCIALS } from '@/lib/constants';
import '@/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAFAF7',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Blanked - Free Memory Training Game | Train Your Brain in 2 Minutes',
    template: '%s | Blanked - Memory Training Game',
  },
  description: 'Blanked is a free memory training game backed by science. Study the scene, it disappears, answer from memory. 6 game modes, 380+ levels. Play free on iOS.',
  keywords: [
    'memory game', 'brain training', 'visual memory', 'puzzle game',
    'brain game', 'cognitive training', 'memory training app', 'iOS game',
    'free brain game', 'blanked', 'blanked game',
  ],
  authors: [{ name: 'Blanked' }],
  creator: 'Blanked',
  publisher: 'Blanked',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    title: 'Blanked - Free Memory Training Game | Train Your Brain in 2 Minutes',
    description: 'Blanked is a free memory training game. Study the scene, it disappears, answer from memory. 6 game modes, 380+ levels. Free to play on iOS.',
    siteName: 'Blanked',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Blanked - Free Memory Training Game for iOS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blanked - Free Memory Training Game | Train Your Brain in 2 Minutes',
    description: 'Blanked is a free memory training game. Study the scene, it disappears, answer from memory. 6 game modes, 380+ levels. Free on iOS.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    'apple-itunes-app': 'app-id=6762019174',
  },
};

// Site-wide Organization + Person schema — gives Google a durable "who is
// behind Blanked" signal on every page, which pairs with the per-post
// Article author and the /about page to compound E-E-A-T.
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'Blanked',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon` },
      sameAs: [SOCIALS.facebook, SOCIALS.linkedin, SOCIALS.instagram],
      founder: { '@id': `${SITE_URL}/#founder` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Blanked',
      publisher: { '@id': `${SITE_URL}/#org` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#founder`,
      name: FOUNDER.fullName,
      givenName: FOUNDER.name,
      jobTitle: FOUNDER.role,
      worksFor: { '@id': `${SITE_URL}/#org` },
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}${FOUNDER.avatar}`,
      sameAs: [FOUNDER.linkedin, FOUNDER.instagram],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
