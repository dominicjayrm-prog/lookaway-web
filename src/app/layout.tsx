import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Blanked — The Visual Memory Game',
    template: '%s | Blanked',
  },
  description: 'Study the scene. It disappears. Answer from memory. A visual memory game with 200 levels across 6 worlds. Challenge friends head-to-head. Free to play.',
  keywords: [
    'memory game', 'brain training', 'visual memory', 'brain test',
    'puzzle game', 'memory test', 'brain game', 'daily puzzle',
    'memory challenge', 'visual puzzle', 'brain training app',
    'memory improvement', 'cognitive training', 'mind game',
    'blanked', 'blanked game', 'blanked app',
  ],
  authors: [{ name: 'Blanked' }],
  creator: 'Blanked',
  publisher: 'Blanked',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    title: "Blanked — Don't blank.",
    description: 'Study the scene. It disappears. Answer from memory. 200 levels. 6 worlds. Challenge your friends.',
    siteName: 'Blanked',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Blanked — Visual Memory Game' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Blanked — Don't blank.",
    description: 'A visual memory game that starts simple and gets impossibly hard. Challenge friends head-to-head.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
