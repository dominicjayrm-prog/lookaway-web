import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import PostCard from '@/components/blog/PostCard';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, FOUNDER, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: `${FOUNDER.fullName} | Blanked Author`,
  description: `${FOUNDER.fullName}, ${FOUNDER.role.toLowerCase()} of Blanked. Writes about memory, brain training, and the science behind visual recall. Based in ${FOUNDER.location}.`,
  alternates: { canonical: `${SITE_URL}/authors/dominic-roworth` },
  openGraph: {
    type: 'profile',
    locale: 'en_GB',
    siteName: 'Blanked',
    title: `${FOUNDER.fullName} | Blanked Author`,
    description: `${FOUNDER.role} of Blanked. Memory science, brain training, and visual recall from ${FOUNDER.location}.`,
    url: `${SITE_URL}/authors/dominic-roworth`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary',
    title: `${FOUNDER.fullName} | Blanked Author`,
    description: `${FOUNDER.role} of Blanked. Memory science and visual recall, from ${FOUNDER.location}.`,
    images: [OG_IMAGE],
  },
};

export const revalidate = 3600;

export default async function AuthorPage() {
  const pageUrl = `${SITE_URL}/authors/dominic-roworth`;
  const allPosts = await listPublishedPosts().catch(() => []);

  // Right now every post is by Dominic, so list them all. If multi-author
  // ever happens, filter by an author_id column here.
  const posts = allPosts;

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': pageUrl,
    name: FOUNDER.fullName,
    givenName: FOUNDER.name,
    jobTitle: FOUNDER.role,
    description: FOUNDER.bio,
    image: `${SITE_URL}${FOUNDER.avatar}`,
    url: pageUrl,
    sameAs: [FOUNDER.linkedin, FOUNDER.instagram],
    worksFor: {
      '@type': 'Organization',
      name: 'Blanked',
      url: SITE_URL,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: FOUNDER.location,
    },
  };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Authors' },
          { name: FOUNDER.fullName },
        ]}
      />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '20px 24px 80px' }}>
        {/* Author profile card */}
        <div
          style={{
            display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24,
            alignItems: 'center', marginBottom: 40, padding: '24px 28px',
            background: 'white', borderRadius: 18, border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.03)',
          }}
          className="author-card"
        >
          <Image
            src={FOUNDER.avatar}
            alt={`${FOUNDER.fullName}, ${FOUNDER.role} of Blanked`}
            width={120}
            height={120}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            priority
          />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Author</div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: P.text, margin: '0 0 6px', letterSpacing: -0.4 }}>{FOUNDER.fullName}</h1>
            <div style={{ fontSize: 14, color: P.textD, marginBottom: 10 }}>{FOUNDER.role} of Blanked &middot; {FOUNDER.location}</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: P.accent, textDecoration: 'underline' }}>LinkedIn</a>
              <a href={FOUNDER.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: P.accent, textDecoration: 'underline' }}>Instagram</a>
              <a href={`mailto:${FOUNDER.email}`} style={{ fontSize: 13, color: P.accent, textDecoration: 'underline' }}>Email</a>
              <Link href="/about" style={{ fontSize: 13, color: P.accent, textDecoration: 'underline' }}>About Blanked</Link>
            </div>
          </div>
        </div>

        {/* Bio */}
        <section style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 17, color: '#636E72', lineHeight: 1.7, marginBottom: 14 }}>
            {FOUNDER.bio}
          </p>
          <p style={{ fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14 }}>
            Dominic founded Blanked in {FOUNDER.location} as a one-developer answer to the bloated, subscription-heavy world of brain-training apps. The bet: a single focused visual-memory game, two minutes a day, free, that respects the player and the research. The blog is where the same honest framing applies to the wider topic — what memory training can and cannot do, what the studies actually say, and where the marketing has gotten ahead of the evidence.
          </p>
          <p style={{ fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14 }}>
            Posts here cover memory science, brain-training app comparisons, audience-specific guidance (students, older adults, ADHD adults, office workers), and the occasional behind-the-scenes note on building Blanked itself. Sources are cited where claims go beyond textbook definitions. Marketing language is kept to a minimum.
          </p>
        </section>

        {/* Posts */}
        <section style={{ marginTop: 48 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.3 }}>
              Posts by {FOUNDER.name}
            </h2>
            <Link href="/blog" style={{ fontSize: 14, color: P.accent, textDecoration: 'underline' }}>All posts &rarr;</Link>
          </div>

          {posts.length === 0 ? (
            <p style={{ fontSize: 15, color: P.textD }}>No posts yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </section>

        <p style={{ fontSize: 12, color: P.textD, marginTop: 36, textAlign: 'center' }}>
          <Link href="/" style={{ color: P.accent, textDecoration: 'underline' }}>Back to Blanked home</Link>
        </p>
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>

      <style>{`
        @media (max-width: 600px) {
          .author-card { grid-template-columns: 1fr !important; text-align: center; }
          .author-card img { margin: 0 auto; }
        }
      `}</style>
    </div>
  );
}
