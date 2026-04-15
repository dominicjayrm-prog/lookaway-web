import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BlogDownloadCTA from '@/components/blog/BlogDownloadCTA';
import { COMPARISONS } from '@/lib/comparisons';
import { COLORS, SITE_URL } from '@/lib/constants';

type Params = Promise<{ vs: string }>;

export function generateStaticParams() {
  return Object.keys(COMPARISONS).map((vs) => ({ vs }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { vs } = await params;
  const c = COMPARISONS[vs];
  if (!c) return { title: 'Comparison not found', robots: { index: false } };

  const title = `Blanked vs ${c.name}: which memory game is right for you?`;
  const description = `An honest comparison of Blanked and ${c.name}. Pricing, focus, session length, and who each one is built for.`;
  const url = `${SITE_URL}/compare/${c.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: ['/opengraph-image'],
      siteName: 'Blanked',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
  };
}

const P = COLORS;

export default async function ComparePage({ params }: { params: Params }) {
  const { vs } = await params;
  const c = COMPARISONS[vs];
  if (!c) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Blanked vs ${c.name}`,
    description: `An honest comparison of Blanked and ${c.name}.`,
    author: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/compare/${c.slug}` },
  };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 820, margin: '0 auto', padding: '20px 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Blink size={72} expression="thinking" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Compare</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Blanked vs <span style={{ color: P.accent }}>{c.name}</span>
          </h1>
          <p style={{ fontSize: 15, color: P.textD, marginTop: 8 }}>
            {c.tagline}
          </p>
        </div>

        {/* Verdict card */}
        <div
          style={{
            background: `${P.accent}08`,
            border: `1px solid ${P.accent}20`,
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 40,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>
            The short answer
          </div>
          <p style={{ fontSize: 16, color: P.text, lineHeight: 1.6, margin: 0 }}>
            {c.verdict}
          </p>
        </div>

        {/* About competitor */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: P.text, marginBottom: 12 }}>About {c.name}</h2>
          <p style={{ fontSize: 16, color: '#636E72', lineHeight: 1.7 }}>
            {c.aboutCompetitor}
          </p>
        </section>

        {/* Comparison table */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: P.text, marginBottom: 12 }}>
            Head-to-head
          </h2>
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', borderBottom: '1px solid #F0EFE9', background: '#FAFAF7' }}>
              <div style={hCell}>Feature</div>
              <div style={{ ...hCell, color: P.accent }}>Blanked</div>
              <div style={hCell}>{c.name}</div>
            </div>
            {c.rows.map((row, i) => {
              const isUs = row.advantage === 'blanked';
              const isThem = row.advantage === 'competitor';
              return (
                <div
                  key={i}
                  style={{
                    display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr',
                    borderBottom: i === c.rows.length - 1 ? 'none' : '1px solid #F5F4F0',
                  }}
                >
                  <div style={{ ...cell, fontWeight: 600, color: P.text }}>{row.feature}</div>
                  <div style={{
                    ...cell,
                    background: isUs ? `${P.green}08` : 'transparent',
                    fontWeight: isUs ? 600 : 500,
                    color: isUs ? P.green : '#636E72',
                  }}>
                    {row.blanked}
                  </div>
                  <div style={{
                    ...cell,
                    background: isThem ? `${P.green}08` : 'transparent',
                    fontWeight: isThem ? 600 : 500,
                    color: isThem ? P.green : '#636E72',
                  }}>
                    {row.competitor}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pick Blanked / Pick competitor */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }} className="pick-grid">
          <div style={pickCard(P.accent)}>
            <div style={{ fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
              Pick Blanked if
            </div>
            <ul style={pickList}>
              {c.pickBlankedIf.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div style={pickCard('#B2BEC3')}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
              Pick {c.name} if
            </div>
            <ul style={pickList}>
              {c.pickCompetitorIf.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </section>

        <BlogDownloadCTA />

        {/* Other comparisons */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: P.text, marginBottom: 14 }}>Other comparisons</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {Object.values(COMPARISONS)
              .filter((o) => o.slug !== c.slug)
              .map((o) => (
                <Link key={o.slug} href={`/compare/${o.slug}`} style={otherCardStyle}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: P.text }}>Blanked vs {o.name}</div>
                  <div style={{ fontSize: 12, color: P.textD, marginTop: 2 }}>{o.tagline}</div>
                </Link>
              ))}
          </div>
        </section>
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .pick-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const hCell: React.CSSProperties = {
  padding: '12px 16px', fontSize: 12, fontWeight: 700,
  color: '#636E72', letterSpacing: 0.5, textTransform: 'uppercase',
};
const cell: React.CSSProperties = {
  padding: '14px 16px', fontSize: 14, lineHeight: 1.5,
};
const pickCard = (accent: string): React.CSSProperties => ({
  background: 'white', border: `1.5px solid ${accent}25`,
  borderRadius: 14, padding: '18px 20px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
});
const pickList: React.CSSProperties = {
  listStyle: 'none', padding: 0, margin: 0,
  display: 'flex', flexDirection: 'column', gap: 8,
  fontSize: 14, color: '#636E72', lineHeight: 1.5,
};
const otherCardStyle: React.CSSProperties = {
  display: 'block', padding: '12px 14px', borderRadius: 10,
  background: 'white', border: '1px solid rgba(0,0,0,0.04)',
  textDecoration: 'none', color: 'inherit',
  boxShadow: '0 1px 6px rgba(0,0,0,0.02)',
};
