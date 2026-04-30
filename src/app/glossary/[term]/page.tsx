import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { GLOSSARY } from '@/lib/glossary';
import { COLORS, SITE_URL, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;

type Params = Promise<{ term: string }>;

export function generateStaticParams() {
  return Object.keys(GLOSSARY).map((term) => ({ term }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { term } = await params;
  const entry = GLOSSARY[term];
  if (!entry) return { title: 'Term not found', robots: { index: false } };

  const title = `${entry.name}: ${entry.tagline.charAt(0).toUpperCase()}${entry.tagline.slice(1)}`;
  const description = `${entry.name}: ${entry.tagline}. Plain-English definition with research citations.`;
  const url = `${SITE_URL}/glossary/${entry.slug}`;

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

export default async function GlossaryTermPage({ params }: { params: Params }) {
  const { term } = await params;
  const entry = GLOSSARY[term];
  if (!entry) notFound();

  const url = `${SITE_URL}/glossary/${entry.slug}`;

  const definedTermJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.name,
    description: entry.definition.join(' '),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Blanked Memory Science Glossary',
      url: `${SITE_URL}/glossary`,
    },
    url,
  };

  const faqJsonLd = entry.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entry.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  const otherEntries = Object.values(GLOSSARY).filter((e) => e.slug !== entry.slug);

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Glossary', url: `${SITE_URL}/glossary` },
        { name: entry.name },
      ]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
            <Link href="/glossary" style={{ color: P.accent, textDecoration: 'none' }}>Glossary</Link>
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            What is <span style={{ color: P.accent }}>{entry.name.toLowerCase()}</span>?
          </h1>
          <p style={{ fontSize: 16, color: P.textD, marginTop: 12 }}>{entry.tagline}.</p>
        </div>

        {/* Definition */}
        <section style={section}>
          <h2 style={h2}>Definition</h2>
          {entry.definition.map((p, i) => (
            <p key={i} style={paraStyle}>{p}</p>
          ))}
        </section>

        {/* Why it matters */}
        <section style={section}>
          <h2 style={h2}>Why it matters</h2>
          {entry.whyItMatters.map((p, i) => (
            <p key={i} style={paraStyle}>{p}</p>
          ))}
        </section>

        {/* How it works */}
        <section style={section}>
          <h2 style={h2}>How it works in the brain</h2>
          {entry.howItWorks.map((p, i) => (
            <p key={i} style={paraStyle}>{p}</p>
          ))}
        </section>

        {/* How to improve */}
        <section style={section}>
          <h2 style={h2}>How to improve {entry.name.toLowerCase()}</h2>
          {entry.howToImprove.map((p, i) => (
            <p key={i} style={paraStyle}>{p}</p>
          ))}
        </section>

        {/* CTA */}
        <section style={{ ...section, textAlign: 'center', padding: '32px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Train this with Blanked</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Blanked is a free visual memory game built around focused daily practice. Two minutes a day. Six modes that target different visual-memory dimensions. Try the free{' '}
            <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
            {' '}to set a baseline first.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>
            Download Blanked free
          </a>
        </section>

        {/* FAQ */}
        {entry.faqs.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={h2}>Frequently asked questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {entry.faqs.map((f, i) => (
                <details key={i} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 10, padding: '14px 18px' }}>
                  <summary style={{ cursor: 'pointer', fontSize: 15, fontWeight: 700, color: P.text }}>{f.q}</summary>
                  <p style={{ fontSize: 15, color: '#636E72', lineHeight: 1.65, marginTop: 10, marginBottom: 0 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Other glossary entries */}
        {otherEntries.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={h2}>Related terms</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {otherEntries.map((o) => (
                <Link
                  key={o.slug}
                  href={`/glossary/${o.slug}`}
                  style={{
                    display: 'block', padding: '14px 16px', borderRadius: 12,
                    background: 'white', border: '1px solid rgba(0,0,0,0.04)',
                    textDecoration: 'none', color: 'inherit',
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, color: P.text, marginBottom: 4 }}>{o.name}</div>
                  <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.4 }}>{o.tagline}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        {entry.sources && entry.sources.length > 0 && (
          <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
              {entry.sources.map((s, i) => (
                <li key={i}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={inlineLink}>{s.text}</a>
                  ) : s.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        {entry.lastUpdated && (
          <p style={{ fontSize: 12, color: P.textD, marginTop: 28, textAlign: 'center' }}>
            Last updated: {new Date(entry.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' · '}
            <Link href="/glossary" style={{ color: P.accent, textDecoration: 'underline' }}>back to glossary</Link>
          </p>
        )}
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>
    </div>
  );
}

const section: React.CSSProperties = { marginTop: 36 };
const h2: React.CSSProperties = {
  fontSize: 24, fontWeight: 800, color: COLORS.text, marginBottom: 14, letterSpacing: -0.3,
};
const paraStyle: React.CSSProperties = {
  fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14,
};
const ctaPrimary: React.CSSProperties = {
  display: 'inline-block', padding: '14px 28px', borderRadius: 12,
  background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700,
  textDecoration: 'none',
};
const inlineLink: React.CSSProperties = {
  color: COLORS.accent, textDecoration: 'underline',
};
