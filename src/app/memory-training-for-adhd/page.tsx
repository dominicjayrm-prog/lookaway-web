import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Memory Training for ADHD: A Realistic 2-Minute Daily Practice',
  description:
    'Memory training for ADHD adults: an honest look at what working-memory practice can and cannot do, and a two-minute daily routine that fits the way ADHD brains actually work.',
  alternates: { canonical: `${SITE_URL}/memory-training-for-adhd` },
  openGraph: {
    type: 'article',
    title: 'Memory Training for ADHD: A Realistic 2-Minute Daily Practice',
    description:
      'Memory training for ADHD adults: an honest look at what working-memory practice can and cannot do.',
    url: `${SITE_URL}/memory-training-for-adhd`,
    images: ['/opengraph-image'],
    siteName: 'Blanked',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory Training for ADHD',
    description: 'A realistic two-minute daily practice for ADHD adults. Free on iOS.',
    images: ['/opengraph-image'],
  },
};

const faqs = [
  {
    q: 'Will memory training cure or treat my ADHD?',
    a: 'No. Brain training apps are not treatments for ADHD. Evidence-based ADHD care typically involves a combination of medication (where appropriate, prescribed by a clinician), behavioral therapy, and environmental adjustments. Memory training is a useful adjunct for the working-memory dimension of ADHD specifically, but it does not replace any of the above. If you suspect ADHD, see a clinician.',
  },
  {
    q: 'Is there research on working-memory training for ADHD?',
    a: 'Yes, and it is genuinely mixed. Klingberg et al. (2005) showed working-memory training improvements on trained tasks in children with ADHD, with some transfer to attention measures. Later meta-analyses (e.g. Cortese et al., 2015) have been more cautious, noting that benefits often do not transfer broadly to academic or behavioral outcomes. The honest read: training the trained task works; broader transfer is uncertain. Pair it with the rest of evidence-based ADHD care.',
  },
  {
    q: 'Why is two minutes the right length for an ADHD brain?',
    a: 'Because most apps ask for fifteen, and that is exactly the kind of commitment that an ADHD brain skips after week three. Two minutes is short enough to start before your brain has had time to talk you out of it, which is most of the actual battle. Habit formation literature consistently shows that shorter, friction-free routines stick better.',
  },
  {
    q: 'What if I can never remember to open the app?',
    a: 'Anchor it to a routine you already do without thinking. Coffee, brushing teeth, the bus ride, lunch break. The trick is not "remember to play"; it is "play right when you do this other thing". This is called habit stacking and it is one of the few habit techniques with strong empirical support.',
  },
  {
    q: 'Should I try the visual memory test before committing?',
    a: 'Yes, that is a good plan. Run the free in-browser test on this site and see what your baseline level is. Then come back in three weeks of daily practice and check again. Trust the change in your own score over time more than any percentile label.',
  },
  {
    q: 'Is Blanked really free?',
    a: 'Yes. The full game, all six modes and 400+ levels, is free. Blanked+ is an optional subscription that removes ads and adds cosmetics. It does not gate gameplay.',
  },
  {
    q: 'Does it work on Android?',
    a: 'Not yet. Blanked is iOS-only at the moment. Android is on the roadmap.',
  },
];

export default async function ADHDPage() {
  const pageUrl = `${SITE_URL}/memory-training-for-adhd`;

  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = `${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase();
      return /adhd|attention|focus|forget|working.?memory|distraction/.test(haystack);
    })
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Memory Training for ADHD: A Realistic 2-Minute Daily Practice',
    description:
      'An honest look at what working-memory practice can and cannot do for ADHD adults, plus a two-minute daily routine that fits the way ADHD brains actually work.',
    author: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
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
        { name: 'Memory training for ADHD' },
      ]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Blink size={72} expression="thinking" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>For ADHD adults</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Memory training for ADHD:<br />
            a <span style={{ color: P.accent }}>realistic 2-minute daily practice</span>, not a magic fix
          </h1>
        </div>

        <p style={paraLead}>
          Most "brain training for ADHD" pages over-promise. They imply that a few minutes a day in their app will fix your focus, your memory, and basically rewire you into a different person. That is not honest, and the research does not support it.
        </p>
        <p style={paraStyle}>
          What is honest: working memory is one specific cognitive function, ADHD often affects it, and focused practice on visual working memory does measurably improve performance on visual working memory tasks. Two minutes a day. No life rebuild promised. Below is what the research actually says, why a tiny daily habit fits an ADHD brain better than a fifteen-minute routine, and how Blanked is built around that fit.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
        </div>

        {/* What the research actually says */}
        <section style={section}>
          <h2 style={h2}>What the research actually says about working memory and ADHD</h2>
          <p style={paraStyle}>
            Working memory, the system that holds information in mind for a few seconds while you do something with it, is one of the cognitive functions that ADHD most consistently affects (Kasper et al., 2012; Martinussen et al., 2005). When people with ADHD describe walking into a room and forgetting why, or losing track of a sentence mid-paragraph, working-memory load is a big part of what is happening underneath.
          </p>
          <p style={paraStyle}>
            The headline study on working-memory training for ADHD specifically is Klingberg and colleagues (2005), which found that children with ADHD who did focused working-memory training improved on trained tasks and showed some transfer to attention measures. That paper kicked off most of the consumer-app interest in this category.
          </p>
          <p style={paraStyle}>
            The later meta-analytic literature (Cortese et al., 2015; Sonuga-Barke et al., 2013) has been considerably more cautious. The pattern in those reviews: working-memory training reliably improves the specific tasks trained, but the evidence for broader transfer to academic outcomes, classroom behavior, or daily-life function is thin. Effect sizes shrink the further you get from the trained task.
          </p>
          <p style={paraStyle}>
            The right read of all this: focused working-memory practice produces real but narrow gains. It is a reasonable adjunct to evidence-based ADHD care (which means a clinician, possibly medication, possibly behavioral therapy, definitely environmental adjustments), not a substitute for it. Anyone selling you "brain training will fix your ADHD" is over-promising and the FTC has fined other apps for less.
          </p>
        </section>

        {/* Why two minutes fits */}
        <section style={section}>
          <h2 style={h2}>Why two minutes specifically fits an ADHD brain</h2>
          <p style={paraStyle}>
            One of the worst things you can do when designing a habit for an ADHD brain is ask for a long uninterrupted block of attention. The longer the demanded session, the larger the activation-energy hurdle, and the faster the habit collapses.
          </p>
          <p style={paraStyle}>
            Most brain training apps want fifteen minutes a day. Some want thirty. After the third week of real life, those minutes are gone, and so is the practice. Blanked is two minutes specifically because two minutes is short enough that an ADHD brain cannot really argue with it. By the time you have started reasoning about whether to do it, you are already done.
          </p>
          <p style={paraStyle}>
            On the other side: consistency matters more than duration for skill building. Twelve two-minute sessions a week beat one twenty-five-minute session, both because of total reps and because of habit reinforcement. The shorter you can make the unit, the more reliably you can string them together.
          </p>
        </section>

        {/* How to make it stick */}
        <section style={section}>
          <h2 style={h2}>How to make it actually stick</h2>
          <p style={paraStyle}>
            The single biggest predictor of whether a daily habit sticks for an ADHD brain is whether it is anchored to an existing routine, not whether you remember to do it. The technique is called habit stacking, and it is one of the few habit techniques with strong empirical support.
          </p>
          <ul style={ulStyle}>
            <li><strong>While the kettle boils.</strong> Most kettles take roughly 90 seconds. One round of Blanked. The water is your timer.</li>
            <li><strong>After taking your meds.</strong> If medication is part of your routine, stacking the practice immediately after means you literally never forget; one cue, two behaviors.</li>
            <li><strong>On the bus / Tube / train.</strong> Two minutes is shorter than the wait at most stops.</li>
            <li><strong>Before opening social media.</strong> If you tend to phone-doomscroll, intercept it with one round first. Two minutes is genuinely short enough that this works.</li>
          </ul>
          <p style={paraStyle}>
            Pick one. Pair it with the existing cue. After two weeks the habit will be on autopilot. If you forget, do not make it a moral failing; just resume the next day. ADHD-friendly habit design tolerates inconsistency.
          </p>
        </section>

        {/* Realistic expectations */}
        <section style={section}>
          <h2 style={h2}>What realistic improvement looks like</h2>
          <p style={paraStyle}>
            Be honest with yourself about what a memory game can do. It will not lift the executive-function load of running your life. It will not replace medication if medication is helpful for you. It will not fix the working-memory hit you take when you have not slept. It is one small piece of a much bigger picture.
          </p>
          <p style={paraStyle}>
            What you can reasonably expect after a few weeks of consistent practice: the specific visual-memory tasks Blanked trains get noticeably easier, and that improvement is real if narrow. You will catch yourself remembering more items in short-term recall. You may notice it is slightly easier to hold layouts and faces in mind. The Simons et al. (2016) review is the right balanced reference: real but bounded benefits, narrow rather than broad transfer.
          </p>
          <p style={paraStyle}>
            What you should not expect: a transformation. If anyone, including us, promises that, treat it as marketing rather than evidence.
          </p>
        </section>

        {/* CTA */}
        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Two minutes. Honest expectations. Free.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            No subscription, no fifteen-minute daily plan, no "fix your ADHD" promises. Just a tiny visual-memory habit that fits how an ADHD brain actually works. Try the free <Link href="/memory-test" style={inlineLink}>visual memory test</Link> first to set a baseline, then start the daily habit.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
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

        {/* Keep reading */}
        {relatedPosts.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={h2}>Keep reading</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {relatedPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  style={{
                    display: 'block', padding: '14px 16px', borderRadius: 12,
                    background: 'white', border: '1px solid rgba(0,0,0,0.04)',
                    textDecoration: 'none', color: 'inherit',
                    boxShadow: '0 1px 8px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>From the blog</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: P.text, lineHeight: 1.4, marginBottom: 4 }}>{p.title}</div>
                  {p.subtitle && <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.4 }}>{p.subtitle}</div>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related landing pages */}
        <section style={{ marginTop: 36 }}>
          <p style={paraStyle}>
            See also the parallel guides for{' '}
            <Link href="/memory-training-for-students" style={inlineLink}>students</Link>
            {' '}and{' '}
            <Link href="/memory-games-for-seniors" style={inlineLink}>older adults</Link>, the free{' '}
            <Link href="/memory-test" style={inlineLink}>visual memory test</Link>, and how Blanked compares to{' '}
            <Link href="/compare/cognifit" style={inlineLink}>CogniFit</Link>
            {' '}(which markets condition-specific packages including ADHD) on the{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>.
          </p>
        </section>

        {/* Sources */}
        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li>Klingberg et al. (2005), &ldquo;Computerized Training of Working Memory in Children with ADHD&rdquo;, JAACAP</li>
            <li>Martinussen et al. (2005), &ldquo;A meta-analysis of working memory impairments in children with attention-deficit/hyperactivity disorder&rdquo;, JAACAP</li>
            <li>Sonuga-Barke et al. (2013), &ldquo;Nonpharmacological interventions for ADHD: systematic review and meta-analyses of randomized controlled trials&rdquo;, American Journal of Psychiatry</li>
            <li>Cortese et al. (2015), &ldquo;Cognitive training for attention-deficit/hyperactivity disorder: meta-analysis of clinical and neuropsychological outcomes from randomized controlled trials&rdquo;, JAACAP</li>
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
const paraLead: React.CSSProperties = {
  fontSize: 18, color: '#636E72', lineHeight: 1.65, marginBottom: 14, fontWeight: 500,
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
