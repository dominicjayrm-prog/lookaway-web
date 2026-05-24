import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Brain Training Games for Kids: What Actually Helps',
  description:
    'Brain training games for kids that actually do something. What the research says about working memory, attention, and concentration practice in childhood, plus free options.',
  alternates: { canonical: `${SITE_URL}/brain-training-games-for-kids` },
  openGraph: {
    type: 'article',
    locale: 'en_GB',
    siteName: 'Blanked',
    title: 'Brain Training Games for Kids: What Actually Helps',
    description: 'Honest guide to brain training and concentration games for kids. What the research supports, plus free options.',
    url: `${SITE_URL}/brain-training-games-for-kids`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brain Training Games for Kids',
    description: 'Brain training and concentration games for kids that actually help.',
    images: [OG_IMAGE],
  },
};

const faqs = [
  {
    q: 'Do brain training games actually help kids?',
    a: 'Within limits. Working memory is trainable in childhood, and Klingberg et al. (2005) showed specific benefits for children with ADHD. The catch is that the gains are narrow: practising a brain training game makes kids better at that game and at closely related tasks. The broader claim ("brain games will make my child smarter or do better at school") has weaker evidence (Simons et al., 2016). What brain training does well is sharpen a specific cognitive function. It does not replace good teaching, sleep, reading, or unstructured play.',
  },
  {
    q: 'What are the best concentration games for kids?',
    a: 'For under-7s: spot-the-difference puzzles, Where\'s Wally / Where\'s Waldo books, simple matching games, jigsaw puzzles. For 7 and up: sequence memory games (Simon Says-style), pattern recognition games, scene memory games where the child has to study an image and answer questions about it. Mobile apps like Blanked are realistic from about age 7 and include attention-stretching modes alongside memory ones.',
  },
  {
    q: 'How much screen time is OK for brain training?',
    a: 'Less than most apps suggest. Five to ten minutes a day is plenty for the cognitive benefit. The American Academy of Pediatrics guidelines on screen time are conservative for under-6s (less than 1 hour daily, parent-supervised) and more flexible for older kids. The shorter daily commitment also works better as a habit; long sessions burn out, short ones stick.',
  },
  {
    q: 'Will brain training games help my child focus in school?',
    a: 'The honest answer is maybe, indirectly, in some cases. Attention training shows mixed results in the broader transfer literature. Some studies find improvements in academic-relevant attention measures; others do not. What is more consistently supported is the link between general cognitive engagement (reading, puzzles, conversations, varied activities) and stronger attention and working memory. Brain training games can be part of that broader engagement; they are not a substitute for it.',
  },
  {
    q: 'Are brain training games good for kids with ADHD?',
    a: 'Working-memory training specifically has the most direct evidence here. Klingberg et al. (2005) found that children with ADHD who did focused working-memory training improved on trained tasks and showed some transfer to attention measures. Later meta-analyses (Cortese et al., 2015) have been more cautious about broader academic and behavioural transfer. The honest read: focused practice helps the specific function it trains, and it is a reasonable supplement to evidence-based ADHD care (which means a clinician, possibly medication, possibly behavioural therapy, environmental adjustments). It is not a treatment for ADHD by itself.',
  },
  {
    q: 'What is the best free brain training game for kids?',
    a: 'For ages 7 and up, Blanked is one of the genuinely free options on iOS. Full game, six modes, 400+ levels, no paywall on gameplay. Rated 4+. For under-7s, physical puzzles and BBC Bitesize / Coolmath Kids browser games are better fits than mobile apps. Most of the bigger kid-focused brain training apps (Lumosity Kids, NeuroNation for Kids) use a freemium model and lock real progression behind a subscription.',
  },
  {
    q: 'Is Blanked available on Android?',
    a: 'Not yet. Blanked is iOS-only with Android on the roadmap.',
  },
];

export const revalidate = 3600;

export default async function BrainTrainingGamesForKidsPage() {
  const pageUrl = `${SITE_URL}/brain-training-games-for-kids`;

  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = `${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase();
      return /brain|memory|focus|attention|adhd|concentration|kid|child|learn/.test(haystack);
    })
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Brain Training Games for Kids: What Actually Helps',
    description:
      'Honest guide to brain training and concentration games for kids. What the research supports, what is overhyped, and which free options work at each age.',
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
        { name: 'Brain training games for kids' },
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
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>For Kids</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Brain training games for kids:<br />
            what <span style={{ color: P.accent }}>actually helps</span>
          </h1>
        </div>

        <p style={paraLead}>
          Brain training is a category that promises a lot for kids. Sharper memory. Better focus. Higher test scores. Some of those claims have real evidence behind them; many do not. This page walks parents through what brain training and concentration games for kids can genuinely do, what they cannot, and which free options are worth the screen time at each age.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Try Blanked, free</a>
        </div>

        {/* The honest summary */}
        <section style={section}>
          <h2 style={h2}>The honest summary first</h2>
          <p style={paraStyle}>
            Brain training games for kids are not a category to either overhype or dismiss. The research literature is genuinely mixed, and the honest read of it tells you exactly when these games help and when they do not.
          </p>
          <p style={paraStyle}>
            Working memory is one of the most consequential cognitive abilities in childhood. Alloway and Alloway (2010) tracked children for several years and found that working memory at age 5 predicted academic achievement at age 11 better than IQ did. Working memory is also more trainable in childhood than in adulthood, because younger brains are more plastic. Klingberg (2010) summarised a substantial body of evidence that focused practice on working memory tasks reliably improves working memory performance.
          </p>
          <p style={paraStyle}>
            The catch, summarised by Simons et al. (2016) for Psychological Science in the Public Interest, is that the broader transfer is weaker. Practising a brain training game makes a child better at the game and at closely related tasks. The bigger claim that they become "smarter at school" or "better at thinking generally" has thin evidence at best. Brain training is one input into healthy cognitive development. It is not a magic intervention.
          </p>
        </section>

        {/* What categories train what */}
        <section style={section}>
          <h2 style={h2}>What different brain training games actually train</h2>
          <ul style={ulStyle}>
            <li><strong>Memory games.</strong> Train working memory and recognition memory. The most-studied category. Strongest evidence for narrow improvement, including some benefit for kids with ADHD (Klingberg et al., 2005). See the deeper guide at{' '}
              <Link href="/memory-games-for-kids" style={inlineLink}>memory games for kids</Link>.
            </li>
            <li><strong>Matching games.</strong> A subset of memory games. Train visual recognition memory specifically. Good entry-level practice, especially for younger children. See{' '}
              <Link href="/matching-games-for-kids" style={inlineLink}>matching games for kids</Link>.
            </li>
            <li><strong>Concentration and attention games.</strong> Spot-the-difference, Where&apos;s Wally, sustained-attention tasks, timed visual searches. Train the ability to hold focus on a single task. The transfer evidence here is more mixed; some studies find broader attention improvements, others do not.</li>
            <li><strong>Speed-of-processing games.</strong> Fast-paced tasks requiring quick responses. Train the speed at which the brain takes in and processes visual information. The ACTIVE trial showed this approach is impactful for older adults (Edwards et al., 2017), but the evidence base in children is thinner.</li>
            <li><strong>Logic and problem-solving games.</strong> Pattern recognition, puzzles, simple coding games. Build the slower deliberative thinking skills rather than pure memory or attention. Excellent supplements to school work.</li>
            <li><strong>Pure educational apps</strong> (Khan Academy Kids, etc.). Not strictly brain training, but the same underlying cognitive skills get worked. For most children, a high-quality educational app does more for academic outcomes than a generic brain trainer.</li>
          </ul>
        </section>

        {/* By age */}
        <section style={section}>
          <h2 style={h2}>What works at each age</h2>
          <ul style={ulStyle}>
            <li><strong>Ages 3 to 5.</strong> Physical puzzles, simple matching cards, sorting games, Where&apos;s Wally-style picture searches. Screen time should be limited and parent-supervised. Mobile apps add little value at this age and often distract from richer offline play.</li>
            <li><strong>Ages 5 to 7.</strong> Slightly more advanced matching games, simple sequence games (Simon Says-style), spot-the-difference puzzles. Screen-based games start being viable if used moderately. Look for ad-free educational sites rather than ad-heavy mobile apps.</li>
            <li><strong>Ages 7 to 10.</strong> The full range of brain training game formats becomes accessible. Picture memory games, sequence memory games, concentration challenges, simple logic puzzles. Mobile apps with progressing difficulty (like Blanked) start being genuinely useful as daily practice.</li>
            <li><strong>Ages 10 to 13.</strong> Full brain training apps work well. Timed challenges, head-to-head competitions with friends, harder logic puzzles. This is the age where the daily habit can really stick if the format engages them.</li>
            <li><strong>Teens (13+).</strong> Same options as adults; see the parallel guide on{' '}
              <Link href="/memory-training-for-students" style={inlineLink}>memory training for students</Link>
              {' '}for the homework-and-exams angle.
            </li>
          </ul>
        </section>

        {/* Free options */}
        <section style={section}>
          <h2 style={h2}>Free brain training and concentration games for kids</h2>
          <p style={paraStyle}>
            The free category is mixed but real. Some options worth knowing:
          </p>
          <ul style={ulStyle}>
            <li><strong>BBC Bitesize</strong> (UK) has substantial age-grouped brain games and learning activities. Public broadcaster funding means no ads.</li>
            <li><strong>Coolmath Games</strong> and <strong>ABCya</strong> have huge libraries of memory, logic, and concentration games organised by age. Some ads, mostly mild.</li>
            <li><strong>PBS Kids Games</strong> (US) is great for under-7s. Character-themed brain games, ad-free.</li>
            <li><strong>Khan Academy Kids</strong> is a curriculum-grade educational app with brain-game elements. Completely free, no ads, no in-app purchases. One of the highest-quality free educational apps available.</li>
            <li><strong>Blanked</strong> is free on iOS for kids 7 and up, six modes (memory, sequence, snap match, counting, colour grid, speed recall). No paywall on gameplay. Rated 4+.</li>
          </ul>
          <p style={paraStyle}>
            Apps to be cautious about: anything that requires personal information beyond an email, anything with aggressive in-app purchases that appear during normal play, anything labelled "brain training for kids" that bombards them with characters trying to upsell power-ups every two minutes. The good options are quieter than the loud ones.
          </p>
        </section>

        {/* Concentration specifically */}
        <section style={section}>
          <h2 style={h2}>Concentration games specifically</h2>
          <p style={paraStyle}>
            Parents often search for concentration games for kids because they have noticed their child struggles to sustain attention. The honest reality here: most children of school age have intermittent attention by design. Sustained focus develops slowly through childhood and into the teen years. A short concentration game will not change a child&apos;s baseline attention much, but it can provide useful practice and a calmer activity than open-ended screen time.
          </p>
          <p style={paraStyle}>
            Good concentration practice involves three things: a clear objective (find the difference, spot the change, count the items), an appropriate time pressure (enough to require focus, not so much it becomes frustrating), and feedback (did you get it right). Physical activities like Where&apos;s Wally puzzles, jigsaw puzzles, and spot-the-difference picture books do all three without any screen time. Digital versions (including Blanked&apos;s Snap Match and Counting Blitz modes) do the same plus automatic difficulty progression.
          </p>
          <p style={paraStyle}>
            If you suspect your child&apos;s attention difficulties are clinically significant (ongoing, across settings, affecting learning or relationships), the right move is a conversation with a paediatrician or educational psychologist, not a brain training app.
          </p>
        </section>

        {/* CTA */}
        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Free brain training, ages 7 and up.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Six modes covering memory, attention, sequences, and pattern recognition. iOS, rated 4+, no paywall on gameplay.
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
            See also the specific guides for{' '}
            <Link href="/memory-games-for-kids" style={inlineLink}>memory games for kids</Link>
            {' '}and{' '}
            <Link href="/matching-games-for-kids" style={inlineLink}>matching games for kids</Link>. For ADHD families specifically, the adult guide on{' '}
            <Link href="/memory-training-for-adhd" style={inlineLink}>memory training for ADHD</Link>
            {' '}has relevant background. For older teens approaching exams, see{' '}
            <Link href="/memory-training-for-students" style={inlineLink}>memory training for students</Link>.
          </p>
        </section>

        {/* Sources */}
        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li>Alloway & Alloway (2010), &ldquo;Investigating the predictive roles of working memory and IQ in academic attainment&rdquo;, Journal of Experimental Child Psychology</li>
            <li>Klingberg et al. (2005), &ldquo;Computerized Training of Working Memory in Children with ADHD&rdquo;, JAACAP</li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={inlineLink}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, Trends in Cognitive Sciences</a></li>
            <li>Cortese et al. (2015), &ldquo;Cognitive training for ADHD: meta-analysis of clinical and neuropsychological outcomes&rdquo;, JAACAP</li>
            <li><a href="https://doi.org/10.1016/j.trci.2017.09.002" target="_blank" rel="noopener noreferrer" style={inlineLink}>Edwards et al. (2017), &ldquo;Speed of processing training results in lower risk of dementia&rdquo;, ACTIVE Trial</a></li>
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
