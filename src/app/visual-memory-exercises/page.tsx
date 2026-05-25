import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Visual Memory Exercises for Adults: 8 You Can Do Today',
  description:
    'Eight sourced visual memory exercises for adults you can do today. No clinical PDFs, no fluff. Plus the science behind why they work and what to expect.',
  alternates: { canonical: `${SITE_URL}/visual-memory-exercises` },
  openGraph: { type: 'article', locale: 'en_GB', siteName: 'Blanked', title: 'Visual Memory Exercises for Adults: 8 You Can Do Today', description: 'Sourced visual memory exercises for adults. No clinical PDFs, no fluff.', url: `${SITE_URL}/visual-memory-exercises`, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'Visual Memory Exercises for Adults', description: '8 sourced exercises you can do today.', images: [OG_IMAGE] },
};

const faqs = [
  { q: 'Do visual memory exercises actually work?', a: 'On the specific exercises themselves, yes. Focused practice on a visual-memory task reliably improves performance on that task and on closely related tasks (Engle and Kane, 2004; Klingberg, 2010). The broader claim that they will make you generally smarter or fix everyday forgetfulness has weak evidence (Simons et al., 2016). Train the specific skill you actually want sharper rather than expecting transfer to everything.' },
  { q: 'How often should I do them?', a: 'Daily, briefly. Five to ten minutes a day produces stronger gains than thirty minutes once a week. Habit consistency matters far more than session length. If you can only manage two minutes, two minutes is genuinely enough as long as you do it most days.' },
  { q: 'Will these help me remember faces or where I put things?', a: 'Indirectly. The same visual-memory machinery is involved in face recognition and spatial recall. Focused practice on these exercises sharpens the underlying system. The bigger gains come from changing how you encode things in the moment (deliberate attention, conscious naming, anchoring to landmarks) rather than from exercises alone.' },
  { q: 'Are these the same as exercises for kids?', a: 'The cognitive systems are the same, but the difficulty level and framing are different. These are written for adults. For children, see our /memory-games-for-kids guide.' },
  { q: 'How long until I see improvement?', a: 'On the trained tasks, two to four weeks of daily practice produces measurable improvement. On real-world recall (faces, layouts, where you left things), the change is more subtle and depends on whether you also start using better encoding habits in daily life.' },
];

export const revalidate = 3600;

export default async function VisualMemoryExercisesPage() {
  const pageUrl = `${SITE_URL}/visual-memory-exercises`;
  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts.filter((p) => /visual|memory|exercise|recall|forget|practice/.test(`${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase())).slice(0, 3);

  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Visual Memory Exercises for Adults: 8 You Can Do Today', description: 'Eight sourced visual memory exercises for adults.', author: { '@type': 'Person', '@id': `${SITE_URL}/authors/dominic-roworth`, name: 'Dominic Roworth', url: `${SITE_URL}/authors/dominic-roworth` }, publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL }, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'Visual memory exercises' }]} />

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
            Visual memory exercises for adults:<br />
            <span style={{ color: P.accent }}>eight</span> you can do today
          </h1>
        </div>

        <p style={paraLead}>
          Most "visual memory exercises" search results land you on paediatric occupational-therapy worksheets or clinical PDFs. Useful if you are a teacher or a clinician, frustrating if you are an adult who just wants to sharpen your own recall. This page is the adult version: eight specific exercises sourced from real cognitive-psychology paradigms, plus what to expect from them.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <Link href="/memory-test" style={ctaPrimary}>Take the free baseline test first</Link>
        </div>

        <section style={section}>
          <h2 style={h2}>Before you start: set a baseline</h2>
          <p style={paraStyle}>
            The single most useful thing you can do before starting any memory practice is take a baseline. Run our free{' '}
            <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
            {' '}once, write down the level you reached, then take it again every three weeks. Comparing your scores to your past scores is much more useful than comparing them to percentile bars. You will see whether the exercises are actually working for you specifically.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>Eight exercises (with the science behind each)</h2>

          <h3 style={h3}>1. Scene recall (the classic)</h3>
          <p style={paraStyle}>
            Look at a busy photograph or scene for 10 seconds. Close your eyes or cover it. Try to recall as many specific items as you can: how many people, what colours, what was in the background. Write it down. Then check against the original. This is essentially a Sternberg-style scene-recall task and it is what Blanked\'s Classic mode is built around (six modes, 400+ levels, two minutes per session).
          </p>

          <h3 style={h3}>2. The Corsi block sequence</h3>
          <p style={paraStyle}>
            The classical lab test of visuospatial span. Pick a small grid (3x3 will do), point to a sequence of squares in random order, then try to reproduce the sequence in the same order. Start with three squares. When you can manage three reliably, go to four. Most adults max out around five or six. This is the same task family our Sequence mode trains.
          </p>

          <h3 style={h3}>3. Mental rotation</h3>
          <p style={paraStyle}>
            Imagine a 3D object (a cube made of smaller cubes, a chair, a letter F). Mentally rotate it 90 degrees, then 180. Describe what you see at each step. Practising mental rotation builds the same visuospatial sketchpad capacity that supports navigation and spatial reasoning. Shepard and Metzler (1971) is the canonical experiment.
          </p>

          <h3 style={h3}>4. Spot the difference (from memory)</h3>
          <p style={paraStyle}>
            Look at one scene for 10 seconds. Look away. Look at a slightly different scene for 10 seconds. Identify what changed. This is the cognitive shape of our Snap Match mode and it trains the comparison-from-working-memory ability that helps you notice when something has moved on your desk.
          </p>

          <h3 style={h3}>5. Faces and names drill</h3>
          <p style={paraStyle}>
            For three faces (photos in a magazine, contacts in your phone, colleagues on LinkedIn), study the face for 10 seconds while saying the name aloud. Look away, then test yourself. The saying-aloud is the secret: most face-and-name failures are encoding failures, not memory failures. See our companion piece on{' '}
            <Link href="/how-to-remember-names" style={inlineLink}>how to remember names</Link>.
          </p>

          <h3 style={h3}>6. Where did I leave it</h3>
          <p style={paraStyle}>
            When you put something down (keys, phone, glasses), spend two seconds consciously looking at the placement and saying out loud where it is. "Keys, kitchen counter, next to the kettle." This is not really an exercise; it is an encoding habit. But it is the single most impactful change you can make if "I cannot find my things" is the problem. Full write-up at{' '}
            <Link href="/how-to-remember-where-you-put-things" style={inlineLink}>/how-to-remember-where-you-put-things</Link>.
          </p>

          <h3 style={h3}>7. Memory palace (method of loci)</h3>
          <p style={paraStyle}>
            Pick a familiar route through a place you know well (your morning walk, the layout of your home). Mentally place each item you want to remember at a specific spot along the route. The mental walk-through reconstructs the items in order. This is the technique competitive memory champions use; it works because it borrows the brain\'s strong spatial memory to anchor weaker non-spatial information.
          </p>

          <h3 style={h3}>8. Daily focused practice (the lazy option)</h3>
          <p style={paraStyle}>
            All seven exercises above work. They also require you to set them up, remember to do them, and find the energy. The lazy version: open a focused visual-memory app for two minutes a day and let the levels do the scaling for you. That is what Blanked is. It is not a substitute for deliberate practice in the rest of your life, but it is the closest thing to "free passive cognitive training" that actually compounds.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>What to expect</h2>
          <p style={paraStyle}>
            On the specific exercises, two to four weeks of daily practice typically produces measurable improvement: more items recalled, longer sequences held, faster spotting of differences. These narrow gains are well-established. Engle and Kane (2004) and Klingberg (2010) on the science; Simons et al. (2016) on the careful caveat that broader transfer is weaker.
          </p>
          <p style={paraStyle}>
            What you should not expect is a personality-level upgrade. You will not become someone who never forgets anything. You will, with consistent practice, be better than your current baseline at the specific kinds of visual recall the exercises train. That is a real and useful gain. It is not the same as the "unlock your perfect memory" pitch that some apps make. We have a full honest write-up at{' '}
            <Link href="/does-brain-training-work" style={inlineLink}>/does-brain-training-work</Link>.
          </p>
        </section>

        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Or skip the prep and just do the daily version.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Blanked is exercises 1 through 4 packaged as a two-minute daily habit. Free on iOS.
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
            <li>Engle & Kane (2004), &ldquo;Executive Attention, Working Memory Capacity, and a Two-Factor Theory of Cognitive Control&rdquo;</li>
            <li>Shepard & Metzler (1971), &ldquo;Mental Rotation of Three-Dimensional Objects&rdquo;, Science</li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={inlineLink}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, Trends in Cognitive Sciences</a></li>
            <li>Corsi (1972), &ldquo;Human memory and the medial temporal region of the brain&rdquo;</li>
            <li><a href="https://journals.sagepub.com/doi/10.1177/1529100616661983" target="_blank" rel="noopener noreferrer" style={inlineLink}>Simons et al. (2016), &ldquo;Do Brain-Training Programs Work?&rdquo;, Psychological Science in the Public Interest</a></li>
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
