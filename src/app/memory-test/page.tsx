import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import MemoryTest from '@/components/MemoryTest';
import { COLORS, SITE_URL, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Free Visual Memory Test: How Sharp Is Your Visual Recall?',
  description:
    'A free, no-signup visual memory test. Tiles flash on a grid, you remember which ones. See how high you score and what your level means. Two minutes, runs in your browser.',
  alternates: { canonical: `${SITE_URL}/memory-test` },
  openGraph: {
    type: 'website',
    title: 'Free Visual Memory Test: How Sharp Is Your Visual Recall?',
    description:
      'A free, no-signup visual memory test that runs in your browser. See how high you score.',
    url: `${SITE_URL}/memory-test`,
    images: ['/opengraph-image'],
    siteName: 'Blanked',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Visual Memory Test',
    description: 'How sharp is your visual recall? Test it free in your browser.',
    images: ['/opengraph-image'],
  },
};

const faqs = [
  {
    q: 'What does this test measure?',
    a: 'Visual short-term memory, also called visuospatial working memory. Specifically, the test measures how many highlighted positions on a grid you can hold in mind for a couple of seconds and then reproduce. It is a simplified version of the kind of task used in cognitive psychology research, similar to a Corsi block-tapping task.',
  },
  {
    q: 'Is the test scientifically valid?',
    a: 'It uses the same task structure as established lab paradigms (visuospatial span / Corsi tapping), but it is not a clinical assessment and the percentile labels are approximate. Treat the score as a fun ballpark, not a diagnosis. If you are worried about your memory for clinical reasons, talk to a doctor.',
  },
  {
    q: 'What is a good score?',
    a: 'Most adults max out around level 6 or 7 on this kind of task. Levels 8 to 10 put you in the top quartile. Levels 11+ are unusual; you are either an outlier or you have practised this kind of task before. Children typically score lower; older adults a bit lower still on average.',
  },
  {
    q: 'Can I improve my score with practice?',
    a: 'Some, yes. Visuospatial span is one of the more trainable working-memory tasks (Klingberg, 2010). What the research is less clear on is whether that improvement transfers to broader memory or general intelligence. The honest answer: practice the task, get noticeably better at this kind of task, and understand that the gains are narrow (Simons et al., 2016).',
  },
  {
    q: 'Why does the test get harder?',
    a: 'Each successful round adds one more tile to remember. The grid stays the same size; the load increases. Most people hit their working-memory capacity (the famous "magical number seven, plus or minus two") between levels 5 and 9.',
  },
  {
    q: 'Do you store my score?',
    a: 'No. The test runs entirely in your browser. We do not record scores, names, or anything personally identifying from the test itself. Standard site analytics may record that you visited the page, but they do not see what you scored.',
  },
];

export default function MemoryTestPage() {
  const pageUrl = `${SITE_URL}/memory-test`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Visual Memory Test',
    description:
      'A free, no-signup visual memory test that runs in your browser. Modeled on the visuospatial span task used in cognitive psychology research.',
    url: pageUrl,
    mainEntity: {
      '@type': 'Quiz',
      name: 'Visual Memory Test',
      about: { '@type': 'Thing', name: 'Visuospatial working memory' },
      educationalLevel: 'general',
    },
    publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Visual memory test' },
      ]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999,
              background: `${P.accent}10`, border: `1px solid ${P.accent}30`,
              fontSize: 12, fontWeight: 600, color: P.accent,
              letterSpacing: 0.3, marginBottom: 16,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: P.accent }} />
            Free · No signup · Runs in your browser
          </span>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            How sharp is your <span style={{ color: P.accent }}>visual memory</span>?
          </h1>
          <p style={{ fontSize: 17, color: '#636E72', lineHeight: 1.65, maxWidth: 600, margin: '14px auto 0' }}>
            Tiles flash on a grid for just over a second. You click the same tiles when they go blank. Each round adds one more. See how high you can climb.
          </p>
        </div>

        {/* The test itself */}
        <MemoryTest />

        {/* App CTA */}
        <section style={{ marginTop: 40, padding: '28px 24px', borderRadius: 16, background: `${P.accent}08`, border: `1px solid ${P.accent}20`, textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: P.text, margin: '0 0 8px' }}>
            Want to actually <span style={{ color: P.accent }}>improve</span> your visual memory?
          </h2>
          <p style={{ fontSize: 15, color: '#636E72', lineHeight: 1.6, margin: '0 0 18px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            One score is just a snapshot. Visual recall is built like a muscle: short, focused, daily practice. Blanked is two minutes a day, free, six game modes that target different visual-memory dimensions.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>
            Train daily with Blanked, free
          </a>
        </section>

        {/* What it measures */}
        <section style={section}>
          <h2 style={h2}>What this test actually measures</h2>
          <p style={paraStyle}>
            This is a simplified visuospatial working-memory task. It is closely related to the Corsi block-tapping test, which has been used in cognitive psychology research since 1972 to study short-term spatial memory. The task here: you see a set of positions briefly, then have to reproduce which positions you saw. The number of correct positions before you make a mistake gives you a "span" (your level), which is a rough proxy for how many spatial items your working memory can juggle at once.
          </p>
          <p style={paraStyle}>
            Working-memory capacity is a real cognitive construct. It is one of the strongest individual predictors of academic performance (Alloway and Alloway, 2010), correlates with measures of fluid intelligence, and is moderately trainable, especially in childhood and older age (Klingberg, 2010). Most adults score around 5 to 7 on Corsi-like tasks. Higher scores are not unusual; they tend to track with practice and innate variation.
          </p>
        </section>

        {/* What the score means */}
        <section style={section}>
          <h2 style={h2}>What your score actually means</h2>
          <p style={paraStyle}>
            The percentile labels on the result screen are calibrated against typical adult performance on Corsi-like tasks. They are approximate; the real distribution depends on age, prior practice, and how alert you are at the moment of testing. The number is more useful as a baseline you can compare against yourself in a few weeks than as a comparison against other people.
          </p>
          <p style={paraStyle}>
            One important caveat: this test uses a static layout (you see all the cells lit up at once, then they go blank), not a sequential one (where positions light up one after another in order). Sequential Corsi-style testing measures something subtly different. If you want the sequential version, that is what the Sequence mode in Blanked is built for.
          </p>
        </section>

        {/* Tips */}
        <section style={section}>
          <h2 style={h2}>Tips for a better score</h2>
          <ul style={ulStyle}>
            <li><strong>Group, do not list.</strong> Try to see clusters of tiles as shapes (triangles, lines, L-shapes) rather than individual positions. The brain holds shapes more efficiently than lists.</li>
            <li><strong>Use the corners.</strong> Anchor what you see relative to corners and edges of the grid, not in absolute coordinates.</li>
            <li><strong>Do not over-think it.</strong> The longer you stare after the flash ends, the more your memory degrades. First instinct usually wins.</li>
            <li><strong>Be alert.</strong> Working memory is sensitive to fatigue, stress, and caffeine timing. You will score better when rested.</li>
          </ul>
        </section>

        {/* FAQ */}
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

        {/* Related */}
        <section style={{ marginTop: 36 }}>
          <p style={paraStyle}>
            Want more context? Read the parallel guides for{' '}
            <Link href="/memory-training-for-students" style={inlineLink}>students</Link>
            {' '}and{' '}
            <Link href="/memory-games-for-seniors" style={inlineLink}>older adults</Link>, or see how Blanked compares to{' '}
            <Link href="/compare/lumosity" style={inlineLink}>Lumosity</Link>,{' '}
            <Link href="/compare/peak" style={inlineLink}>Peak</Link>, and the rest on the{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>.
          </p>
        </section>

        {/* Sources */}
        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li>Corsi, P. M. (1972), &ldquo;Human memory and the medial temporal region of the brain&rdquo;, McGill University doctoral dissertation</li>
            <li>Alloway & Alloway (2010), &ldquo;Investigating the predictive roles of working memory and IQ in academic attainment&rdquo;, Journal of Experimental Child Psychology</li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={inlineLink}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, Trends in Cognitive Sciences</a></li>
            <li><a href="https://journals.sagepub.com/doi/10.1177/1529100616661983" target="_blank" rel="noopener noreferrer" style={inlineLink}>Simons et al. (2016), &ldquo;Do Brain-Training Programs Work?&rdquo;, Psychological Science in the Public Interest</a></li>
          </ul>
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

const section: React.CSSProperties = { marginTop: 36 };
const h2: React.CSSProperties = {
  fontSize: 24, fontWeight: 800, color: COLORS.text, marginBottom: 14, letterSpacing: -0.3,
};
const paraStyle: React.CSSProperties = {
  fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14,
};
const ulStyle: React.CSSProperties = {
  fontSize: 16, color: '#636E72', lineHeight: 1.75, paddingLeft: 22, marginBottom: 14,
};
const ctaPrimary: React.CSSProperties = {
  display: 'inline-block', padding: '14px 28px', borderRadius: 12,
  background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700,
  textDecoration: 'none',
};
const inlineLink: React.CSSProperties = {
  color: COLORS.accent, textDecoration: 'underline',
};
