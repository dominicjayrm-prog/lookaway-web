import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Memory Games for Kids: What Works at Each Age',
  description:
    'Memory games for kids that actually help, broken down by age. What the research says about working memory in childhood, plus free options.',
  alternates: { canonical: `${SITE_URL}/memory-games-for-kids` },
  openGraph: {
    type: 'article',
    locale: 'en_GB',
    siteName: 'Blanked',
    title: 'Memory Games for Kids: What Works at Each Age',
    description: 'Honest guide to memory games for kids: what the research says, free options, and how to fit it in.',
    url: `${SITE_URL}/memory-games-for-kids`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory Games for Kids',
    description: 'Memory games for kids that actually help, by age.',
    images: [OG_IMAGE],
  },
};

const faqs = [
  {
    q: 'What age are memory games for kids appropriate?',
    a: 'It depends on the format. Simple matching games (turn over cards, find pairs) work from about age 3. Scene-based memory games with multi-step questions are realistic from about age 7, when working memory and reading comprehension are usually developed enough. Anything that requires sustained attention for longer than five minutes is generally too much before age 6.',
  },
  {
    q: 'Do memory games actually help children learn?',
    a: 'Within limits, yes. Working memory is one of the strongest individual predictors of academic achievement; Alloway and Alloway (2010) followed children for years and found working memory at age 5 predicted academic performance at 11 better than IQ. Klingberg (2010) summarised the evidence that focused working-memory practice does improve working-memory performance. The catch is that the broader claim ("memory games make kids smarter at everything") is not well supported. Practising memory games makes kids better at memory games and at closely related tasks. It does not replace good teaching, sleep, or unstructured play.',
  },
  {
    q: 'What is the best free memory game for kids?',
    a: 'For very young children (3 to 6), classic physical matching cards or simple browser-based card-flip games are perfectly good and cost nothing. For older children (7+), the picture-based and scene-based games are more substantive. Blanked is a free option on iOS that works for kids from about age 7; it is rated 4+ on the App Store and the full game (six modes, 400+ levels) is free with no paywall on gameplay.',
  },
  {
    q: 'How long should a kid play a memory game each day?',
    a: 'Short. Five to ten minutes is plenty for younger children; older kids can comfortably do ten to twenty if they enjoy it. Daily research consistently shows that consistency matters more than length for skill building. A two-minute round before bed every night will do more than a thirty-minute session once a week.',
  },
  {
    q: 'Is screen-based better than physical card games?',
    a: 'For pure memory training, no, they are roughly equivalent. Physical card games have the advantage of being analogue (no screen time), social (parent and child play together), and tactile. Screen-based games have the advantage of scaling difficulty automatically and tracking progress. Both work. For younger kids and bedtime routines, physical is often the better fit.',
  },
  {
    q: 'Will memory games help my child remember what they learn at school?',
    a: 'Indirectly. They strengthen the working-memory system that holds new information in mind while it is being encoded. They are not a replacement for active retrieval practice (Karpicke and Roediger, 2008): the single highest-impact thing for retaining school material is to pull it out of memory under question (flashcards, self-quizzing, explaining it back) rather than just re-reading it. Memory games sharpen the muscle. The studying still has to happen.',
  },
  {
    q: 'Is Blanked safe and appropriate for kids?',
    a: 'Yes. Blanked is rated 4+ on the App Store, has no chat with strangers, no in-app purchases of consumables, no aggressive ads, and no inappropriate content. The optional Blanked+ subscription is for adult-managed accounts and is not surfaced aggressively. There is also no Android version yet, so it is iOS-only at the moment.',
  },
];

export const revalidate = 3600;

export default async function MemoryGamesForKidsPage() {
  const pageUrl = `${SITE_URL}/memory-games-for-kids`;

  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = `${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase();
      return /memory|brain.?training|learn|focus|attention|kid|child|school|study/.test(haystack);
    })
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Memory Games for Kids: What Works at Each Age',
    description:
      'Honest guide to memory games for kids, broken down by age. What works, what the research supports, and how to fit a short daily habit into a real family schedule.',
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
        { name: 'Memory games for kids' },
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
            Memory games for kids:<br />
            what works <span style={{ color: P.accent }}>at each age</span>
          </h1>
        </div>

        <p style={paraLead}>
          Most pages about memory games for kids are written for parents, by people who want to sell you an app. This one is written for parents too, but the goal is honest information rather than a sales pitch. Some memory games are excellent for child development. Some are entertainment. Telling the difference is genuinely useful.
        </p>
        <p style={paraStyle}>
          This guide walks through what the research actually says about memory training in childhood, what kinds of games are right at each age, what to expect (and not expect) from a daily habit, and which free options are worth the screen time. There is a section near the end on free memory games for kids specifically, because that is what most parents are searching for.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Try Blanked, free</a>
        </div>

        {/* The science */}
        <section style={section}>
          <h2 style={h2}>What the research says about memory training in children</h2>
          <p style={paraStyle}>
            Working memory matters enormously in childhood. Alloway and Alloway (2010) tracked children for several years and found that working memory at age 5 predicted academic achievement at age 11 better than IQ did. The implication is striking: the underlying ability to hold information in mind and manipulate it shapes how well a child learns, more than the general intelligence score.
          </p>
          <p style={paraStyle}>
            Working memory is also trainable, especially in childhood. Klingberg (2010) summarised a body of work showing that focused practice on working-memory tasks reliably improves working-memory performance, with bigger effects in children than in adults (because younger brains are more plastic). Klingberg et al. (2005) showed specific benefits in children with ADHD.
          </p>
          <p style={paraStyle}>
            The caveat is the same one that applies to adult brain training. Practising a memory game makes kids better at memory games and at closely related tasks. The broader claim ("brain training makes kids smarter at school") has weaker evidence (Simons et al., 2016). What memory games can do is sharpen a specific cognitive function. What they cannot do is replace good teaching, regular sleep, active reading practice, or time spent outside.
          </p>
          <p style={paraStyle}>
            The honest summary for parents: a short daily memory game is a fine addition to a normal childhood routine. It is not a substitute for the things that actually matter most for learning (sleep, reading time, school engagement, talking with adults). Layer it in as a supplement, not as the main thing.
          </p>
        </section>

        {/* By age */}
        <section style={section}>
          <h2 style={h2}>What works at each age</h2>
          <p style={paraStyle}>
            Different formats suit different developmental stages. The wrong-difficulty game is either frustrating (too hard) or boring (too easy) and either way the practice stops happening.
          </p>
          <ul style={ulStyle}>
            <li><strong>Ages 3 to 5.</strong> Physical matching cards (turn over two, find pairs). Animal-themed or picture-themed sets are ideal. Five to ten minutes max. Best played with a parent. Apps at this age add value only if the child is already comfortable with screens and the controls are very simple.</li>
            <li><strong>Ages 5 to 7.</strong> Matching games still work, plus simple sequence games (Simon Says-style, repeat the pattern). Card games like Concentration or Memory remain the gold standard. Screen-based picture memory games start being viable for kids who can sit through 5 to 10 minutes.</li>
            <li><strong>Ages 7 to 10.</strong> Scene-based memory games become engaging (study a picture, answer questions from memory). Sequence memory games (remember the order things appeared in) start to feel like a real challenge. Mobile apps like Blanked are realistic from about age 7, though the upper-difficulty levels are still designed for older players.</li>
            <li><strong>Ages 10 to 13.</strong> All of the above plus harder formats: timed challenges, head-to-head friend competitions, longer game sessions. Blanked&apos;s full mode range works well here. Brain training in general becomes a credible daily habit.</li>
            <li><strong>Teens (13+).</strong> At this point the same memory games that work for adults apply. See our companion guide on{' '}
              <Link href="/memory-training-for-students" style={inlineLink}>memory training for students</Link>, which is written for the late-teen and early-twenties exam-pressure audience but applies broadly from age 14 onwards.
            </li>
          </ul>
        </section>

        {/* Categories */}
        <section style={section}>
          <h2 style={h2}>The main categories of memory game for kids</h2>
          <ul style={ulStyle}>
            <li><strong>Matching games.</strong> The classic format. Cards face down, turn over two, find pairs. Works for all ages from 3 up. See our deeper guide on{' '}
              <Link href="/matching-games-for-kids" style={inlineLink}>matching games for kids</Link>
              {' '}for the longer take.
            </li>
            <li><strong>Sequence and pattern games.</strong> Watch a sequence of lights, sounds, or shapes appear in order, then repeat the order from memory. The classic Simon toy is the original. Strong fit for working-memory training specifically.</li>
            <li><strong>Picture and scene memory games.</strong> A picture appears, you study it, the picture disappears, you answer questions about what was in it. More engaging than card-matching for older children. Blanked&apos;s Classic mode is this format.</li>
            <li><strong>Concentration and attention games.</strong> Games like Spot the Difference, Where&apos;s Wally / Where&apos;s Waldo, and timed visual searches. Train attention and visual scanning more than pure memory. Useful supplements; see our{' '}
              <Link href="/brain-training-games-for-kids" style={inlineLink}>brain training games for kids</Link>
              {' '}page for more on this category.
            </li>
            <li><strong>Word and language games.</strong> Word recall, vocabulary memorisation, language-learning apps. Closer to language training but with a memory component. Good for older kids learning a second language.</li>
          </ul>
        </section>

        {/* Free options */}
        <section style={section}>
          <h2 style={h2}>Free memory games for kids: what is genuinely free</h2>
          <p style={paraStyle}>
            Most apps marketed as free memory games for kids fall into one of three categories: ad-supported with frequent interruptions, free-to-download with paywalled content, or actually free. The third category is rare and worth knowing.
          </p>
          <p style={paraStyle}>
            For very young children (3 to 6), the gold standard is still physical matching cards. They cost a few pounds, never run out of battery, and the play happens between parent and child rather than child and screen. Browser-based memory games (Coolmath, BBC Bitesize, and various educational sites) are free, no install, decent fallback if you need a screen-based option.
          </p>
          <p style={paraStyle}>
            For older kids (7+), Blanked is one of the genuinely free options on iOS. The full game (six modes, 400+ levels) is free with no paywall on gameplay. Ads are present in the free version but are short and skippable rather than aggressive. The optional Blanked+ subscription is for ad removal and cosmetics; it does not gate content.
          </p>
          <p style={paraStyle}>
            If you want to benchmark your child&apos;s current visual memory before committing to a daily practice, our{' '}
            <Link href="/memory-test" style={inlineLink}>free visual memory test</Link>
            {' '}runs in any browser, no signup. Two minutes, no install. A reasonable rough baseline for kids 8+ (younger children might find it too fast).
          </p>
        </section>

        {/* Parent tips */}
        <section style={section}>
          <h2 style={h2}>How to actually make it part of the routine</h2>
          <ul style={ulStyle}>
            <li><strong>Anchor to an existing routine.</strong> Five minutes before bed. While dinner is being served. The car ride home. Pairing a new activity with an existing one is the strongest predictor of whether the habit sticks.</li>
            <li><strong>Play with them when possible.</strong> Kids are far more engaged when a parent is participating, especially under age 8. Even adult-only practice (you do your round, they do theirs) is more motivating than solo screen time.</li>
            <li><strong>Keep it short.</strong> Five to ten minutes is plenty. Longer sessions create resistance the next day. Two minutes of focused recall a day will, over weeks, do more than half an hour once a week.</li>
            <li><strong>Do not turn it into homework.</strong> The minute it becomes a chore, the habit collapses. Frame it as a game (because it is), not as brain training.</li>
            <li><strong>Compare them to themselves, not to others.</strong> Improvement against last month is the right metric. Comparing scores between siblings or to a "normal for age" benchmark creates pressure rather than motivation.</li>
          </ul>
        </section>

        {/* CTA */}
        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Free. iOS. Five minutes a day.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Blanked is rated 4+ and works well for kids from about age 7 upwards. No paywall on gameplay, no chat with strangers, no aggressive ads.
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
            <Link href="/matching-games-for-kids" style={inlineLink}>matching games for kids</Link>
            {' '}and{' '}
            <Link href="/brain-training-games-for-kids" style={inlineLink}>brain training games for kids</Link>. For older kids and teens, the parallel{' '}
            <Link href="/memory-training-for-students" style={inlineLink}>memory training for students</Link>
            {' '}guide is the next step up. Adults reading this for yourselves: see{' '}
            <Link href="/memory-games-for-adults" style={inlineLink}>memory games for adults</Link>.
          </p>
        </section>

        {/* Sources */}
        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li>Alloway & Alloway (2010), &ldquo;Investigating the predictive roles of working memory and IQ in academic attainment&rdquo;, Journal of Experimental Child Psychology</li>
            <li>Klingberg et al. (2005), &ldquo;Computerized Training of Working Memory in Children with ADHD&rdquo;, JAACAP</li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={inlineLink}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, Trends in Cognitive Sciences</a></li>
            <li><a href="https://www.science.org/doi/10.1126/science.1152408" target="_blank" rel="noopener noreferrer" style={inlineLink}>Karpicke & Roediger (2008), &ldquo;The Critical Importance of Retrieval for Learning&rdquo;, Science</a></li>
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
