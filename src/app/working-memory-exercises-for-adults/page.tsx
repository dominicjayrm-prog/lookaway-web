import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Working Memory Exercises for Adults: 7 That Actually Work',
  description:
    'Seven working memory exercises for adults, sourced from real cognitive-psychology paradigms. Not a clinical PDF. Plus honest expectations and how to fit them in.',
  alternates: { canonical: `${SITE_URL}/working-memory-exercises-for-adults` },
  openGraph: { type: 'article', locale: 'en_GB', siteName: 'Blanked', title: 'Working Memory Exercises for Adults: 7 That Actually Work', description: 'Sourced working memory exercises for adults. Consumer-friendly, no clinical PDF.', url: `${SITE_URL}/working-memory-exercises-for-adults`, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'Working Memory Exercises for Adults', description: 'Seven sourced exercises that actually work.', images: [OG_IMAGE] },
};

const faqs = [
  { q: 'Can working memory be trained?', a: 'On the specific tasks you train, yes, reliably (Klingberg, 2010). The broader claim that working-memory training transfers to general intelligence or unrelated cognitive abilities is much more contested (Simons et al., 2016). Train it for what it specifically does and you will see narrow but real gains.' },
  { q: 'How long does it take to see improvement?', a: 'Most adults notice improvement on the specific trained tasks within two to four weeks of daily practice. The gains continue to grow for several months before plateauing. Real-world recall improvements are more subtle and depend on whether you also start using better encoding habits in daily life.' },
  { q: 'What is the difference between working memory and short-term memory?', a: 'Short-term memory is the passive storage component (holding a phone number for a few seconds). Working memory adds the manipulation layer: holding the number AND doing arithmetic with it. Most modern cognitive scientists treat working memory as the broader active system that includes short-term storage.' },
  { q: 'Do these exercises help with ADHD?', a: 'There is specific evidence that working-memory training improves trained-task performance in children and adults with ADHD (Klingberg et al., 2005). The transfer to broader academic and behavioural outcomes is weaker and the consensus is more cautious (Cortese et al., 2015). These exercises are reasonable supplements to evidence-based ADHD care; they are not a treatment. See /memory-training-for-adhd for the full version.' },
  { q: 'Will an app give me the same results?', a: 'A well-designed app does the exercises for you with automatic difficulty scaling and progress tracking, which produces stronger gains than ad-hoc practice for most people. The exercises in this page can be done without an app; an app is the more reliable way to actually do them daily.' },
];

export const revalidate = 3600;

export default async function WorkingMemoryExercisesPage() {
  const pageUrl = `${SITE_URL}/working-memory-exercises-for-adults`;
  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts.filter((p) => /working|memory|exercise|focus|adhd|cognitive/.test(`${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase())).slice(0, 3);

  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Working Memory Exercises for Adults: 7 That Actually Work', description: 'Sourced working memory exercises for adults, consumer-friendly framing.', author: { '@type': 'Person', '@id': `${SITE_URL}/authors/dominic-roworth`, name: 'Dominic Roworth', url: `${SITE_URL}/authors/dominic-roworth` }, publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL }, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'Working memory exercises for adults' }]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Blink size={72} expression="thinking" /></div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>For adults</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Working memory exercises for adults:<br />
            <span style={{ color: P.accent }}>seven that actually work</span>
          </h1>
        </div>

        <p style={paraLead}>
          Most search results for working-memory exercises land you on clinical worksheets aimed at therapists or paediatric occupational-therapy PDFs designed for kids. Useful if you are a clinician, frustrating if you are an adult who wants to sharpen your own working memory. This page is the consumer version: seven exercises grounded in real cognitive-psychology paradigms, with honest expectations attached.
        </p>

        <section style={section}>
          <h2 style={h2}>What you are actually training</h2>
          <p style={paraStyle}>
            Working memory is the cognitive system that holds and manipulates a small amount of information for a few seconds (typical capacity is four to seven items). It is what you use to keep a phone number in mind while you walk to a different room, to hold the start of a sentence while writing the end, to do mental arithmetic, and to follow multi-step instructions. The classical model is Baddeley and Hitch (1974), which divides working memory into a phonological loop (verbal), a visuospatial sketchpad (visual), and a central executive.
          </p>
          <p style={paraStyle}>
            Working memory is moderately trainable on the specific tasks you train. Klingberg (2010) summarised the body of evidence supporting this. The contested question, addressed thoroughly in Simons et al. (2016), is whether those narrow gains transfer to broader cognition. The honest answer is: not as much as the marketing implies. Train working memory for the specific skills it directly supports, not because you expect to become generally smarter.
          </p>
          <p style={paraStyle}>
            See our glossary entry on{' '}
            <Link href="/glossary/working-memory" style={inlineLink}>working memory</Link>
            {' '}for the longer technical version.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>The seven exercises</h2>

          <h3 style={h3}>1. Digit span (forward)</h3>
          <p style={paraStyle}>
            Someone reads you a sequence of digits at one per second; you repeat them back in the same order. Start at three digits, work up. Most adults max out around seven. This is the canonical short-term-memory span task (Miller, 1956). For a daily app version, try our{' '}
            <Link href="/number-memory-test" style={inlineLink}>number memory test</Link>.
          </p>

          <h3 style={h3}>2. Digit span (backward)</h3>
          <p style={paraStyle}>
            Same as above but reproduce the digits in reverse order. This is the working-memory version specifically, because reversing forces you to manipulate the stored items rather than just store them. Typical adult span backward is one to two digits shorter than forward.
          </p>

          <h3 style={h3}>3. Corsi block-tapping</h3>
          <p style={paraStyle}>
            The visuospatial equivalent of digit span. You watch a sequence of squares light up on a grid, then reproduce the sequence. Most adults max out around five or six. Corsi (1972) is the original. Our{' '}
            <Link href="/sequence-memory-test" style={inlineLink}>sequence memory test</Link>
            {' '}and{' '}
            <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
            {' '}both train variants of this.
          </p>

          <h3 style={h3}>4. The n-back task</h3>
          <p style={paraStyle}>
            A sequence of letters is read out one at a time. You say "yes" whenever the current letter matches the one from N positions back. Start at 2-back. This is the task most heavily studied in working-memory training research; Jaeggi et al. (2008) reported transfer to fluid intelligence with this paradigm, though later replication has been mixed.
          </p>

          <h3 style={h3}>5. Mental arithmetic with chains</h3>
          <p style={paraStyle}>
            Start with a number, then apply a chain of operations in your head before saying the answer. "Eight, times three, minus five, plus eleven, halved." Practising this builds the manipulation-while-holding component of working memory directly. The trick is to keep going for several operations before you say the result; that is when the working-memory load is actually challenging.
          </p>

          <h3 style={h3}>6. Reading comprehension drill</h3>
          <p style={paraStyle}>
            Read a paragraph aloud. Without re-reading, paraphrase what you just read in one sentence. The exercise forces you to hold the structure of the paragraph in working memory while compressing it. Daniel Willingham\'s reading-comprehension work is the academic version of this.
          </p>

          <h3 style={h3}>7. Daily focused practice</h3>
          <p style={paraStyle}>
            The lazy and effective option: open a focused working-memory app for two minutes a day. Blanked covers the visuospatial side specifically (six modes, 400+ levels). The phonological-loop side is less commonly served by apps; for that, exercises 1, 2, and 6 above are still the best route.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>What to expect</h2>
          <p style={paraStyle}>
            Two to four weeks of daily practice produces measurable improvement on the specific exercises. Sustained for several months, span scores typically improve by one to two items. In real-world terms this looks like: you can hold one more thing in mind during multi-step tasks, you lose your place mid-sentence less often, mental arithmetic gets faster. The changes are subtle but real.
          </p>
          <p style={paraStyle}>
            What you should not expect: a different brain. Working memory has a strong genetic component and a fairly stable range for any individual. You can move yourself toward the top of your range with practice. You cannot move into a different range entirely. For more on what brain training does and does not do, see{' '}
            <Link href="/does-brain-training-work" style={inlineLink}>/does-brain-training-work</Link>.
          </p>
        </section>

        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>The visuospatial side, packaged.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Blanked is exercises 3 and 7 above as a two-minute daily habit. Free, iOS.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
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
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li>Miller (1956), &ldquo;The Magical Number Seven, Plus or Minus Two&rdquo;</li>
            <li>Baddeley & Hitch (1974), &ldquo;Working Memory&rdquo;</li>
            <li>Corsi (1972), &ldquo;Human memory and the medial temporal region of the brain&rdquo;</li>
            <li>Jaeggi et al. (2008), &ldquo;Improving fluid intelligence with training on working memory&rdquo;, PNAS</li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={inlineLink}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, TICS</a></li>
            <li><a href="https://journals.sagepub.com/doi/10.1177/1529100616661983" target="_blank" rel="noopener noreferrer" style={inlineLink}>Simons et al. (2016), &ldquo;Do Brain-Training Programs Work?&rdquo;, PSPI</a></li>
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
const h3: React.CSSProperties = { fontSize: 18, fontWeight: 800, color: COLORS.text, marginTop: 22, marginBottom: 8 };
const paraLead: React.CSSProperties = { fontSize: 18, color: '#636E72', lineHeight: 1.65, marginBottom: 14, fontWeight: 500 };
const paraStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14 };
const ctaPrimary: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', borderRadius: 12, background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none' };
const inlineLink: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };
