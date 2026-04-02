import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://playlookaway.app'),
  title: {
    default: 'LookAway — The Visual Memory Game',
    template: '%s | LookAway',
  },
  description: 'Study the scene. Look away. Answer from memory. A visual memory game with 200 levels across 6 worlds. Challenge friends head-to-head. Free to play.',
  keywords: [
    'memory game', 'brain training', 'visual memory', 'brain test',
    'puzzle game', 'memory test', 'brain game', 'daily puzzle',
    'memory challenge', 'visual puzzle', 'brain training app',
    'memory improvement', 'cognitive training', 'mind game',
  ],
  authors: [{ name: 'LookAway' }],
  creator: 'LookAway',
  publisher: 'LookAway',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://playlookaway.app',
    title: 'LookAway — How much can you remember?',
    description: 'Study the scene. Look away. Answer from memory. 200 levels. 6 worlds. Challenge your friends.',
    siteName: 'LookAway',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'LookAway — Visual Memory Game' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LookAway — How much can you remember?',
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
    canonical: 'https://playlookaway.app',
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
