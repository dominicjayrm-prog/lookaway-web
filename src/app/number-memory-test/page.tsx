import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import NumberMemoryTest from '@/components/NumberMemoryTest';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Number Memory Test: What Is Your Digit Span?',
  description:
    'Free online number memory test. A number appears, then disappears, then you type it back. Two minutes, no signup, modeled on the classical digit-span task.',
  alternates: { canonical: `${SITE_URL}/number-memory-test` },
  openGraph: { type: 'website', locale: 'en_GB', siteName: 'Blanked', title: 'Number Memory Test (Free, Online)', description: 'How many digits can you hold in mind? Free, in-browser, two minutes.', url: `${SITE_URL}/number-memory-test`, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'Number Memory Test', description: 'Free, in-browser, two minutes.', images: [OG_IMAGE] },
};

const faqs = [
  { q: 'What does this test measure?', a: 'Digit span: how many digits you can hold in short-term memory and reproduce in order. It is one of the oldest and most-used tests in cognitive psychology, dating back to Jacobs (1887) and refined by Miller\'s 1956 paper on the "magical number seven, plus or minus two".' },
  { q: 'What is a normal digit span?', a: 'Most adults score between 5 and 9, with the typical figure being 7. The figure is so robust across populations and decades that "the magical number 7 plus or minus 2" became one of the most famous numbers in psychology.' },
  { q: 'Can I improve my digit span?', a: 'Some, mostly by using chunking strategies (group digits into pairs or triples and remember the groups). The classical example is Ericsson\'s 1980 study of SF, a college student who reached a digit span of 79 by training with chunking. The underlying capacity barely changes; the technique does.' },
  { q: 'Is this the same as Human Benchmark number memory?', a: 'Same task family. The display timing and the result interpretation differ; Human Benchmark uses a fixed display time and visitor-percentile bars, here the display time scales with sequence length and the result cites Miller\'s digit-span norms.' },
  { q: 'How do I get better quickly?', a: 'Chunk. As soon as the number appears, group it into pairs (or threes for longer sequences) and remember the groups. "8473902916" becomes "84-73-90-29-16" which is much easier to hold. Try it on the next round.' },
];

export const revalidate = 3600;

export default function NumberMemoryTestPage() {
  const pageUrl = `${SITE_URL}/number-memory-test`;

  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Number Memory Test', description: 'A free in-browser number memory test based on the digit-span paradigm.', url: pageUrl, mainEntity: { '@type': 'Quiz', name: 'Number Memory Test', about: { '@type': 'Thing', name: 'Digit span' } }, publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'Number memory test' }]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: `${P.accent}10`, border: `1px solid ${P.accent}30`, fontSize: 12, fontWeight: 600, color: P.accent, letterSpacing: 0.3, marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: P.accent }} />
            Free · No signup · Runs in your browser
          </span>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Number memory test:<br />
            what is your <span style={{ color: P.accent }}>digit span</span>?
          </h1>
          <p style={{ fontSize: 17, color: '#636E72', lineHeight: 1.65, maxWidth: 600, margin: '14px auto 0' }}>
            A number appears for a few seconds, then disappears. Type it back. Each correct round adds one digit.
          </p>
        </div>

        <NumberMemoryTest />

        <section style={{ marginTop: 40, padding: '28px 24px', borderRadius: 16, background: `${P.accent}08`, border: `1px solid ${P.accent}20`, textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: P.text, margin: '0 0 8px' }}>
            Train the underlying <span style={{ color: P.accent }}>working memory</span>
          </h2>
          <p style={{ fontSize: 15, color: '#636E72', lineHeight: 1.6, margin: '0 0 18px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Digit span is the verbal side of working memory. Blanked trains the visuospatial side, which is the parallel system. Two minutes a day, free on iOS.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
        </section>

        <section style={section}>
          <h2 style={h2}>What this test measures</h2>
          <p style={paraStyle}>
            Digit span is one of the oldest and most-used tests in cognitive psychology. Jacobs introduced it in 1887; Miller\'s famous 1956 paper on "the magical number seven, plus or minus two" established the typical adult span at 7 (±2). The same task appears in the Wechsler intelligence scales, in clinical neuropsychology batteries, and in countless lab studies of working memory.
          </p>
          <p style={paraStyle}>
            The forward digit-span (what this test measures) is the simplest version: just remember the digits in order. The backward digit-span (reproduce in reverse order) is the more demanding working-memory version. Typical adults are one to two digits shorter on backward than forward.
          </p>
          <p style={paraStyle}>
            See our glossary entry on{' '}
            <Link href="/glossary/short-term-memory" style={inlineLink}>short-term memory</Link>
            {' '}for the longer technical version.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>How to actually improve your score</h2>
          <p style={paraStyle}>
            Chunking. As soon as the number appears, group it into pairs or triples and remember the groups, not the individual digits. "8473902916" becomes "84-73-90-29-16". You are now holding five chunks instead of ten digits, which is much closer to the natural capacity of short-term memory.
          </p>
          <p style={paraStyle}>
            The trick scales. Ericsson and Chase\'s 1980 study trained a college student named SF with chunking strategies until his digit span reached 79. He was holding three- and four-digit chunks tied to running-race times (he was a runner, so "3492" became "3 minutes 49.2 seconds, a near-world-record time"). The underlying capacity of his working memory did not change; the chunking did all the work.
          </p>
          <p style={paraStyle}>
            Beyond chunking, the same daily-practice principle applies as for other working-memory tasks. Two minutes a day on the same task type produces measurable gains within weeks (Klingberg, 2010). For broader working-memory practice, see our{' '}
            <Link href="/working-memory-exercises-for-adults" style={inlineLink}>working memory exercises page</Link>.
          </p>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={h2}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 10, padding: '14px 18px' }}>
                <summary style={{ cursor: 'pointer', fontSize: 15, fontWeight: 700, color: P.text }}>{f.q}</summary>
                <p style={{ fontSize: 15, color: '#636E72', lineHeight: 1.65, marginTop: 10, marginBottom: 0 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 36 }}>
          <p style={paraStyle}>
            Related: the parallel{' '}
            <Link href="/memory-test" style={inlineLink}>visual memory test</Link>, the{' '}
            <Link href="/sequence-memory-test" style={inlineLink}>sequence memory test</Link>, and the{' '}
            <Link href="/human-benchmark-alternative" style={inlineLink}>Human Benchmark alternative</Link>
            {' '}page.
          </p>
        </section>

        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li>Miller (1956), &ldquo;The Magical Number Seven, Plus or Minus Two&rdquo;</li>
            <li>Jacobs (1887), &ldquo;Experiments on prehension&rdquo; (the original digit-span study)</li>
            <li>Ericsson, Chase & Faloon (1980), &ldquo;Acquisition of a memory skill&rdquo;, Science (the SF study)</li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={inlineLink}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, TICS</a></li>
          </ul>
        </section>

        <p style={{ fontSize: 12, color: P.textD, marginTop: 28, textAlign: 'center' }}>
          <Link href="/" style={{ color: P.accent, textDecoration: 'underline' }}>Back to Blanked home</Link>
        </p>
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}><Footer /></div>
    </div>
  );
}

const section: React.CSSProperties = { marginTop: 36 };
const h2: React.CSSProperties = { fontSize: 26, fontWeight: 800, color: COLORS.text, marginBottom: 14, letterSpacing: -0.3 };
const paraStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14 };
const ctaPrimary: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', borderRadius: 12, background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none' };
const inlineLink: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };
