import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { GLOSSARY } from '@/lib/glossary';
import { COLORS, SITE_URL } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Memory Science Glossary: Plain-English Definitions',
  description:
    'A glossary of memory-science terms in plain English. Working memory, visual memory, short-term memory, and more, with real research citations.',
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    type: 'website',
    title: 'Memory Science Glossary',
    description: 'Memory-science terms explained in plain English.',
    url: `${SITE_URL}/glossary`,
    images: ['/opengraph-image'],
    siteName: 'Blanked',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory Science Glossary',
    description: 'Memory-science terms explained in plain English.',
    images: ['/opengraph-image'],
  },
};

export default function GlossaryHubPage() {
  const entries = Object.values(GLOSSARY);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: entries.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/glossary/${e.slug}`,
      name: e.name,
    })),
  };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Glossary' },
      ]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Blink size={72} expression="thinking" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Glossary</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Memory science, in <span style={{ color: P.accent }}>plain English</span>
          </h1>
          <p style={{ fontSize: 16, color: P.textM, marginTop: 14, lineHeight: 1.6, maxWidth: 600, margin: '14px auto 0' }}>
            Short, accurate definitions of the memory-science terms that come up most often. Sources cited where claims go beyond textbook definitions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 40 }}>
          {entries.map((e) => (
            <Link
              key={e.slug}
              href={`/glossary/${e.slug}`}
              style={{
                display: 'block', padding: '20px 22px', borderRadius: 14,
                background: 'white', border: '1px solid rgba(0,0,0,0.05)',
                textDecoration: 'none', color: 'inherit',
                boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Term</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: P.text, marginBottom: 6 }}>{e.name}</div>
              <div style={{ fontSize: 14, color: '#636E72', lineHeight: 1.55 }}>{e.tagline}.</div>
              <div style={{ marginTop: 12, fontSize: 13, fontWeight: 700, color: P.accent }}>Read &rarr;</div>
            </Link>
          ))}
        </div>

        <section style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 16, color: '#636E72', lineHeight: 1.7 }}>
            More terms coming soon. If a definition is unclear or a citation is broken, we want to know about it. The goal here is real explanation, not vague hand-waving. See also the free{' '}
            <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
            {' '}for a hands-on take, or the audience guides for{' '}
            <Link href="/memory-training-for-students" style={inlineLink}>students</Link>,{' '}
            <Link href="/memory-training-for-adhd" style={inlineLink}>ADHD adults</Link>, and{' '}
            <Link href="/memory-games-for-seniors" style={inlineLink}>older adults</Link>.
          </p>
        </section>

        <p style={{ fontSize: 12, color: P.textD, marginTop: 28, textAlign: 'center' }}>
          <Link href="/" style={{ color: P.accent, textDecoration: 'underline' }}>Back to Blanked home</Link>
        </p>
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>
    </div>
  );
}

const inlineLink: React.CSSProperties = {
  color: COLORS.accent, textDecoration: 'underline',
};
