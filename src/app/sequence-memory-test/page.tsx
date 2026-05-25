import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SequenceMemoryTest from '@/components/SequenceMemoryTest';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Sequence Memory Test (Online, Free): How High Can You Go?',
  description:
    'Free online sequence memory test. Tiles light up in order, you reproduce the sequence. Two minutes, no signup, runs in your browser. Modeled on the Corsi block-tapping task.',
  alternates: { canonical: `${SITE_URL}/sequence-memory-test` },
  openGraph: { type: 'website', locale: 'en_GB', siteName: 'Blanked', title: 'Sequence Memory Test (Free, Online)', description: 'How long a sequence can you reproduce from memory?', url: `${SITE_URL}/sequence-memory-test`, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'Sequence Memory Test', description: 'Free, in-browser, two minutes.', images: [OG_IMAGE] },
};

const faqs = [
  { q: 'What does this test measure?', a: 'Visuospatial span: how long a sequence of locations you can hold in mind and reproduce in order. It is a simplified version of the Corsi block-tapping task used in cognitive psychology research since 1972.' },
  { q: 'What is a good score?', a: 'Typical adult span on Corsi-like tasks tops out around 5 to 7. Levels 8 to 10 put you in the top quartile. Levels 11+ are unusual and usually mean either prior practice or unusual visuospatial ability.' },
  { q: 'Can I improve my score?', a: 'Yes, this is one of the more trainable cognitive tasks (Klingberg, 2010). Daily focused practice produces measurable improvement within a few weeks. The Sequence mode in Blanked is built around exactly this paradigm at scaling difficulty.' },
  { q: 'Is this the same as Human Benchmark sequence memory?', a: 'The task structure is the same family (visuospatial span). The grid is 3x3 here rather than 3x3 with the same icon, and the result interpretation cites Corsi-task norms rather than visitor percentile bars. Both tests measure essentially the same cognitive function.' },
  { q: 'How do I get better?', a: 'Daily practice on the same task. Blanked\'s Sequence mode is the most direct route; it scales difficulty automatically across 36 levels in three worlds. Other practice options: try to memorise phone numbers without writing them down, practice the classical Simon-Says toy, or use mental rotation exercises.' },
];

export const revalidate = 3600;

export default function SequenceMemoryTestPage() {
  const pageUrl = `${SITE_URL}/sequence-memory-test`;

  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Sequence Memory Test', description: 'A free in-browser sequence memory test modeled on the Corsi block-tapping task.', url: pageUrl, mainEntity: { '@type': 'Quiz', name: 'Sequence Memory Test', about: { '@type': 'Thing', name: 'Visuospatial sequence memory' } }, publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'Sequence memory test' }]} />

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
            Sequence memory test:<br />
            how <span style={{ color: P.accent }}>long a sequence</span> can you reproduce?
          </h1>
          <p style={{ fontSize: 17, color: '#636E72', lineHeight: 1.65, maxWidth: 600, margin: '14px auto 0' }}>
            Tiles light up in a sequence on a 3-by-3 grid. The sequence ends; you tap the tiles in the same order. Each cleared round adds one more tile.
          </p>
        </div>

        <SequenceMemoryTest />

        <section style={{ marginTop: 40, padding: '28px 24px', borderRadius: 16, background: `${P.accent}08`, border: `1px solid ${P.accent}20`, textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: P.text, margin: '0 0 8px' }}>
            Want to actually <span style={{ color: P.accent }}>improve</span> the score?
          </h2>
          <p style={{ fontSize: 15, color: '#636E72', lineHeight: 1.6, margin: '0 0 18px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Sequence memory responds well to daily practice. Blanked\'s Sequence mode runs this exact task across 36 levels at scaling difficulty.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Train it in the app, free</a>
        </section>

        <section style={section}>
          <h2 style={h2}>What this test measures</h2>
          <p style={paraStyle}>
            This is a simplified visuospatial sequence-memory task. It is closely related to the Corsi block-tapping test, which has been used in cognitive psychology research since Phillip Corsi\'s 1972 doctoral thesis. The task: you see a sequence of positions briefly lit, then have to reproduce the same sequence in the same order. The longest sequence you can reproduce before making a mistake gives you a "span" (your level), which is a rough proxy for visuospatial working-memory capacity.
          </p>
          <p style={paraStyle}>
            Typical adult span on Corsi-like tasks tops out around 5 to 7. The score depends on a combination of innate ability, attention at the moment of testing, and prior practice. The percentile labels on the result screen are calibrated to typical adult performance; they are approximate, not clinical.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>What your score means</h2>
          <p style={paraStyle}>
            The result is more useful as a baseline to compare against yourself in a few weeks than as a leaderboard score. If you intend to improve, take the test now, write down your level, do daily practice for three weeks, then re-take. Trust the change in your own score more than any percentile bar.
          </p>
          <p style={paraStyle}>
            For the full visual memory test (a parallel format that asks you to reproduce a set of positions all at once rather than in sequence), see the{' '}
            <Link href="/memory-test" style={inlineLink}>main visual memory test</Link>. For the number-recall version, the{' '}
            <Link href="/number-memory-test" style={inlineLink}>number memory test</Link>
            {' '}covers digit span.
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
            <Link href="/number-memory-test" style={inlineLink}>number memory test</Link>, and the{' '}
            <Link href="/human-benchmark-alternative" style={inlineLink}>Human Benchmark alternative</Link>
            {' '}page.
          </p>
        </section>

        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li>Corsi (1972), &ldquo;Human memory and the medial temporal region of the brain&rdquo;</li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={inlineLink}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, Trends in Cognitive Sciences</a></li>
            <li>Baddeley & Hitch (1974), &ldquo;Working Memory&rdquo;</li>
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
