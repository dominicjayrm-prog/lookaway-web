import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { COMPARISONS } from '@/lib/comparisons';
import { COLORS, SITE_URL } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Compare Blanked vs other memory training apps',
  description:
    'Honest comparisons of Blanked vs Lumosity, Peak, Elevate, Impulse, BrainHQ and more. Find the brain-training app that fits how you actually want to train.',
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: {
    type: 'website',
    title: 'Compare Blanked vs other memory training apps',
    description:
      'Honest comparisons of Blanked against the major brain-training apps. Find the one that fits how you actually want to train.',
    url: `${SITE_URL}/compare`,
    images: ['/opengraph-image'],
    siteName: 'Blanked',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Blanked vs other memory training apps',
    description: 'Honest, side-by-side comparisons of Blanked against the major brain-training apps.',
    images: ['/opengraph-image'],
  },
};

export default function CompareHubPage() {
  const comparisons = Object.values(COMPARISONS);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: comparisons.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/compare/${c.slug}`,
      name: `Blanked vs ${c.name}`,
    })),
  };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Compare' },
        ]}
      />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '20px 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Blink size={72} expression="thinking" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Compare</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Blanked vs the brain-training world
          </h1>
          <p style={{ fontSize: 16, color: P.textM, marginTop: 12, lineHeight: 1.6, maxWidth: 620, margin: '12px auto 0' }}>
            Honest, side-by-side comparisons. Where the other app is genuinely better, we say so. The goal is helping you pick what actually fits, not selling a story.
          </p>
        </div>

        {/* Comparison cards */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                style={cardStyle}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
                  Blanked vs
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: P.text, marginBottom: 6 }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 13, color: P.textD, marginBottom: 14 }}>
                  {c.tagline}
                </div>
                <div style={{ fontSize: 14, color: '#636E72', lineHeight: 1.55 }}>
                  {c.verdict.split('.')[0]}.
                </div>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: P.accent }}>
                  Read the comparison &rarr;
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Master matrix */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: P.text, marginBottom: 14 }}>
            At a glance
          </h2>
          <p style={{ fontSize: 15, color: P.textM, marginBottom: 18, lineHeight: 1.6 }}>
            Quick reference for how Blanked compares against each app on the things people most often ask about.
          </p>
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.03)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#FAFAF7', borderBottom: '1px solid #F0EFE9' }}>
                    <th style={thStyle}>App</th>
                    <th style={thStyle}>Focus</th>
                    <th style={thStyle}>Session</th>
                    <th style={thStyle}>Free tier</th>
                    <th style={thStyle}>Friend duels</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: `${P.accent}06`, borderBottom: '1px solid #F5F4F0' }}>
                    <td style={{ ...tdStyle, fontWeight: 700, color: P.accent }}>Blanked</td>
                    <td style={tdStyle}>Visual memory, deep</td>
                    <td style={tdStyle}>2 min</td>
                    <td style={tdStyle}>Full game free</td>
                    <td style={tdStyle}>Yes, identical scenes</td>
                  </tr>
                  {comparisons.map((c, i) => (
                    <tr key={c.slug} style={{ borderBottom: i === comparisons.length - 1 ? 'none' : '1px solid #F5F4F0' }}>
                      <td style={{ ...tdStyle, fontWeight: 700, color: P.text }}>
                        <Link href={`/compare/${c.slug}`} style={{ color: P.text, textDecoration: 'none' }}>
                          {c.name}
                        </Link>
                      </td>
                      <td style={tdStyle}>
                        {c.rows.find((r) => r.feature === 'Core focus')?.competitor ?? '—'}
                      </td>
                      <td style={tdStyle}>
                        {c.rows.find((r) => r.feature === 'Session length')?.competitor ?? '—'}
                      </td>
                      <td style={tdStyle}>
                        {c.rows.find((r) => r.feature === 'Free tier')?.competitor
                          ?? c.rows.find((r) => r.feature === 'Price')?.competitor
                          ?? '—'}
                      </td>
                      <td style={tdStyle}>
                        {c.rows.find((r) => r.feature === 'Head-to-head with friends')?.competitor ?? 'No'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How we compare */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: P.text, marginBottom: 14 }}>
            How we write these comparisons
          </h2>
          <p style={paraStyle}>
            Comparison pages on the internet are usually thinly disguised sales copy. We try not to do that. Each page on this hub follows the same rules.
          </p>
          <ul style={ulStyle}>
            <li>If the other app is genuinely better at something, we say so. There is always something.</li>
            <li>Pricing changes too often to publish a number, so we describe the model (free, freemium, subscription) rather than guess at this month’s figure.</li>
            <li>Where we cite research, we link to the actual paper or press release. No vague “studies show”.</li>
            <li>Each page ends with the categories of person who should pick the other app, not just the ones who should pick Blanked.</li>
            <li>If you spot something that has changed or that we got wrong, email us and we will update it.</li>
          </ul>
        </section>

        {/* CTA back home */}
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <Link href="/" style={{ fontSize: 14, color: P.accent, textDecoration: 'underline' }}>
            &larr; Back to Blanked home
          </Link>
        </div>
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  display: 'block',
  background: 'white',
  border: '1px solid rgba(0,0,0,0.05)',
  borderRadius: 14,
  padding: '20px 22px',
  textDecoration: 'none',
  color: 'inherit',
  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
};

const thStyle: React.CSSProperties = {
  padding: '12px 14px',
  fontSize: 11,
  fontWeight: 700,
  color: '#636E72',
  letterSpacing: 0.5,
  textTransform: 'uppercase',
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  padding: '12px 14px',
  fontSize: 13,
  color: '#636E72',
  lineHeight: 1.5,
  verticalAlign: 'top',
};

const paraStyle: React.CSSProperties = {
  fontSize: 16,
  color: '#636E72',
  lineHeight: 1.7,
  marginBottom: 12,
};

const ulStyle: React.CSSProperties = {
  fontSize: 16,
  color: '#636E72',
  lineHeight: 1.7,
  paddingLeft: 22,
  marginBottom: 12,
};
