import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Human Benchmark Alternative: Test AND Train Your Memory',
  description:
    'A Human Benchmark alternative that does not just test your memory but trains it. Free in-browser tests plus a proper iOS app for daily practice.',
  alternates: { canonical: `${SITE_URL}/human-benchmark-alternative` },
  openGraph: {
    type: 'article', locale: 'en_GB', siteName: 'Blanked',
    title: 'Human Benchmark Alternative: Test AND Train Your Memory',
    description: 'Human Benchmark tells you your score. Blanked trains it. Free tests + iOS app.',
    url: `${SITE_URL}/human-benchmark-alternative`, images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: 'Human Benchmark Alternative', description: 'Test AND train your memory, not just test it. Free.', images: [OG_IMAGE] },
};

const faqs = [
  { q: 'Is Human Benchmark accurate?', a: 'The individual tests are reasonable for casual benchmarking. They use task structures adapted from cognitive psychology research (visual span, reaction time, verbal recall). The percentile rankings are based on visitor data which is self-selected, so do not treat them as clinical norms; treat them as fun ballpark numbers compared to other internet visitors who happened to take the test.' },
  { q: 'What is the best alternative to Human Benchmark?', a: 'For more tests, sites like Cambridge Brain Sciences and CogniFit run more rigorous batteries (but require accounts or are clinical-leaning). For test plus training, Blanked is the closest answer: the free /memory-test on this site is a Human-Benchmark-style visual memory test, and the iOS app is built around training the same skill daily. The test tells you your score; the app changes it.' },
  { q: 'Can I improve my Human Benchmark scores?', a: 'Some, yes. Visual span and reaction time both respond to focused practice. The improvements are narrow (better at Corsi-style tasks does not turn into better at chess) but real. A few weeks of daily practice on a visual-memory app will measurably lift your visual-span scores; reaction-time training mostly trains familiarity with the specific timing rather than general reflexes.' },
  { q: 'Is the Blanked memory test free?', a: 'Yes, fully. No signup, no install. The test runs in your browser at /memory-test and takes about two minutes. Results show your level reached plus a percentile-style interpretation, calibrated against typical adult performance on Corsi-style visual span tasks.' },
  { q: 'Why is the visual memory test on Blanked smaller than Human Benchmark?', a: 'Because the goal here is different. Human Benchmark is a one-shot benchmarking site. Blanked is a training product with a benchmark test attached. The test on Blanked is built to be a baseline you re-take over time, not the destination itself; the focused-practice loop in the iOS app is where the actual improvement happens.' },
  { q: 'Is Blanked on Android?', a: 'Not yet. The test runs in any browser. The full app is iOS-only with Android on the roadmap.' },
];

export const revalidate = 3600;

export default async function HumanBenchmarkAlternativePage() {
  const pageUrl = `${SITE_URL}/human-benchmark-alternative`;
  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts.filter((p) => /test|memory|visual|brain|benchmark/.test(`${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase())).slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'Human Benchmark Alternative: Test AND Train Your Memory',
    description: 'A Human Benchmark alternative that trains the skill, not just measures it.',
    author: { '@type': 'Person', '@id': `${SITE_URL}/authors/dominic-roworth`, name: 'Dominic Roworth', url: `${SITE_URL}/authors/dominic-roworth` },
    publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'Human Benchmark alternative' }]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Blink size={72} expression="thinking" /></div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Test and train</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Human Benchmark alternative:<br />
            <span style={{ color: P.accent }}>test your memory, then actually train it</span>
          </h1>
        </div>

        <p style={paraLead}>
          Human Benchmark is the cognitive-test default on the internet. You probably found it once, ran the visual-memory test, posted your number to a chat with friends, then closed the tab. The site is genuinely useful as a benchmarking tool. The thing it does not do is improve your score. That gap is what this page is about.
        </p>
        <p style={paraStyle}>
          Blanked is a Human Benchmark alternative in the sense that it gives you the same kind of free in-browser test (no signup, two minutes, percentile context) plus the part Human Benchmark deliberately stops at: focused daily practice that actually moves the number. The free{' '}
          <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
          {' '}is the front door; the iOS app is the gym.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <Link href="/memory-test" style={ctaPrimary}>Take the free test</Link>
        </div>

        <section style={section}>
          <h2 style={h2}>What Human Benchmark does well</h2>
          <p style={paraStyle}>
            Human Benchmark is a single-page site that hosts a small battery of cognitive tests (reaction time, sequence memory, number memory, visual memory, verbal memory, typing, chimp test, aim trainer). All free, no signup, percentile rankings against the other people who took the test. It is well-built, clean, and has been the default benchmarking spot online for over a decade.
          </p>
          <p style={paraStyle}>
            For a casual "how does my visual span compare to other internet humans" curiosity, it is hard to beat. The task structures are derived from real cognitive psychology paradigms (the visual memory test mirrors a Corsi block-tapping task; the number memory test is a digit-span task). The percentile bars are based on visitor data, which is self-selected, but as a vibe-check they work fine.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>What Human Benchmark deliberately does not do</h2>
          <p style={paraStyle}>
            Human Benchmark is built to test, not to train. There is no daily-practice loop, no progress tracking over time, no scaling difficulty designed to push you past your current ceiling. You take the test, you see a number, you close the tab. By design.
          </p>
          <p style={paraStyle}>
            For most people that is fine. But if the number is interesting enough to share with friends, it is interesting enough to want to improve. The honest research consensus is that focused practice on a visual span task reliably improves visual span performance (Klingberg, 2010; Simons et al., 2016). The improvement is narrow (it does not generalise to "smarter at everything") but for the specific test, it works. Doing the same test once a year does not get you there. Doing focused daily practice does.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>How Blanked fills the gap</h2>
          <ul style={ulStyle}>
            <li><strong>Free in-browser tests.</strong> The{' '}
              <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
              {' '}runs in any browser, no signup, two minutes, scaled difficulty across levels rather than a single fixed grid. We are also building{' '}
              <Link href="/sequence-memory-test" style={inlineLink}>sequence memory test</Link>
              {' '}and{' '}
              <Link href="/number-memory-test" style={inlineLink}>number memory test</Link>
              {' '}variants in the same format.</li>
            <li><strong>An actual training app.</strong> The iOS app is the practice loop. Six modes covering visual memory (scene recall, sequence, snap match, counting, colour grid), 400+ levels of scaling difficulty, two minutes a day. Free, no paywall on the core game.</li>
            <li><strong>Progress tracking over time.</strong> Your scores in the app save and chart. You see the real curve of improvement (or plateau) rather than guessing whether a one-off test was a good or bad day.</li>
            <li><strong>Honest about what the numbers mean.</strong> Our test result screens include caveats: the percentiles are calibrated to typical adult performance on Corsi-style tasks, individual results vary, and the narrow gains do not transfer broadly. See{' '}
              <Link href="/does-brain-training-work" style={inlineLink}>/does-brain-training-work</Link>
              {' '}for the full version of that argument.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>When Human Benchmark is still the right call</h2>
          <p style={paraStyle}>
            Use Human Benchmark when you want a one-off benchmark against a large internet-population sample, when you want multiple test types (typing, aim) in one place, or when you specifically do not want a product trying to sell you anything. Human Benchmark stays usefully neutral; that is part of its design.
          </p>
          <p style={paraStyle}>
            Use Blanked when you want to improve a score rather than just check it. The free test will give you the baseline; the iOS app is the training.
          </p>
        </section>

        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>The test takes two minutes.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Then download the app, do two minutes a day for three weeks, and re-test. That is the loop.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/memory-test" style={ctaPrimary}>Take the test</Link>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaSecondary}>Download the app</a>
          </div>
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

        {relatedPosts.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={h2}>Keep reading</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {relatedPosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} style={{ display: 'block', padding: '14px 16px', borderRadius: 12, background: 'white', border: '1px solid rgba(0,0,0,0.04)', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>From the blog</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: P.text, lineHeight: 1.4, marginBottom: 4 }}>{p.title}</div>
                  {p.subtitle && <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.4 }}>{p.subtitle}</div>}
                </Link>
              ))}
            </div>
          </section>
        )}

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
const paraLead: React.CSSProperties = { fontSize: 18, color: '#636E72', lineHeight: 1.65, marginBottom: 14, fontWeight: 500 };
const paraStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14 };
const ulStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.75, paddingLeft: 22, marginBottom: 14 };
const ctaPrimary: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', borderRadius: 12, background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none' };
const ctaSecondary: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', borderRadius: 12, background: 'white', color: COLORS.text, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: `1.5px solid ${COLORS.text}20` };
const inlineLink: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };
