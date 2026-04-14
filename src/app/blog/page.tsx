import type { Metadata } from 'next';
import Link from 'next/link';
import { listPublishedPosts } from '@/lib/blog';
import PostCard from '@/components/blog/PostCard';
import Footer from '@/components/Footer';
import Blink from '@/components/Blink';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on memory, brain training, and cognitive science from the team behind Blanked. Tips, research, and game-design insights.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog | Blanked',
    description: 'Articles on memory, brain training, and cognitive science from the team behind Blanked.',
    url: `${SITE_URL}/blog`,
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Blanked',
    description: 'Articles on memory, brain training, and cognitive science.',
  },
};

export const dynamic = 'force-dynamic';

export default async function BlogIndexPage() {
  const posts = await listPublishedPosts();

  return (
    <div style={{ width: '100%', background: '#FAFAF7', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: '#6C5CE7' }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6C5CE7', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>The Blanked Blog</div>
          <h1 style={{ fontSize: 44, fontWeight: 800, color: '#1A1A18', margin: 0, letterSpacing: -1 }}>
            Memory, <span style={{ color: '#6C5CE7' }}>trained</span>.
          </h1>
          <p style={{ fontSize: 16, color: '#636E72', maxWidth: 560, margin: '12px auto 0', lineHeight: 1.6 }}>
            Practical articles on memory, brain training, and the science of learning — from the team behind Blanked.
          </p>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#636E72', fontSize: 15 }}>
            Nothing published yet — check back soon.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {posts.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>
    </div>
  );
}
