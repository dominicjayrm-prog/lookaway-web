import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Matching Games for Kids: The Best Free Options by Age',
  description:
    'Matching games for kids that help with memory and focus. Free options by age, and what to do when your child outgrows the format.',
  alternates: { canonical: `${SITE_URL}/matching-games-for-kids` },
  openGraph: {
    type: 'article',
    locale: 'en_GB',
    siteName: 'Blanked',
    title: 'Matching Games for Kids: The Best Free Options by Age',
    description: 'Free matching games for kids by age, plus what to play when your child outgrows the format.',
    url: `${SITE_URL}/matching-games-for-kids`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matching Games for Kids',
    description: 'Free matching games for kids by age. Plus what comes next.',
    images: [OG_IMAGE],
  },
};

const faqs = [
  {
    q: 'At what age can kids play matching games?',
    a: 'A simple 6-card matching grid (3 pairs) works from around age 3. A standard 12-card grid (6 pairs) usually clicks at 4 to 5. A full 20-card grid suits ages 6 and up. The key is to start with very few pairs and add more as the child gets comfortable. Too many pairs at once is frustrating; too few becomes boring quickly.',
  },
  {
    q: 'Are matching games educational for kids?',
    a: 'They build a real cognitive skill (visual recognition memory) and they reinforce simple turn-taking and patience. They are not academic in the curriculum sense, but the underlying working-memory practice is correlated with academic achievement (Alloway and Alloway, 2010 showed working memory at age 5 predicts academic performance at 11 better than IQ does). So while they do not teach reading or math directly, they strengthen a foundation that supports both.',
  },
  {
    q: 'What is the best free online matching game for kids?',
    a: 'For ages 3 to 7, animal or picture-themed card-flip games on educational sites (BBC Bitesize, Coolmath Kids, ABCya) are reliable and ad-light. For ages 7 and up, the format starts to feel basic; a scene-based picture memory game becomes more engaging. Blanked has a Snap Match mode that does the matching format with scenes rather than card pairs and works for kids 7 and up on iOS.',
  },
  {
    q: 'How long should kids play matching games each day?',
    a: 'Short. Five to ten minutes is plenty for younger children. Daily play matters more than long sessions. The improvement comes from consistent practice, not from extended single sittings.',
  },
  {
    q: 'When does my child outgrow matching games?',
    a: 'Usually somewhere between ages 7 and 9, the standard matching grid stops being challenging. They remember pair positions on the first or second turn and the game finishes too quickly. That is the natural cue to move them onto picture memory games, sequence games, or broader brain-training apps. See our companion guide on memory games for kids for the longer take.',
  },
  {
    q: 'Are physical matching cards better than apps for kids?',
    a: 'For under-7s, often yes. Physical cards mean no screen time, the parent can play alongside, and the tactile element holds attention better at that age. For older kids who are already comfortable with screens, apps have the advantage of automatic difficulty scaling and progress tracking. Both formats train the same underlying skill.',
  },
  {
    q: 'Is Blanked appropriate for younger kids?',
    a: 'Blanked is rated 4+ on the App Store and is appropriate from a content perspective for any age. In practice the gameplay (scene memory with multi-step questions) is more engaging from about age 7 onwards. Younger children will be better served by simpler matching formats. Blanked is iOS-only currently.',
  },
];

export const revalidate = 3600;

export default async function MatchingGamesForKidsPage() {
  const pageUrl = `${SITE_URL}/matching-games-for-kids`;

  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = `${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase();
      return /match|memory|brain.?training|kid|child|learn|school|focus/.test(haystack);
    })
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Matching Games for Kids: The Best Free Options by Age',
    description:
      'A practical guide to matching games for kids: free options broken down by age, online vs physical, and what to play once they outgrow the format.',
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
        { name: 'Matching games for kids' },
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
            Matching games for kids:<br />
            the <span style={{ color: P.accent }}>best free options</span> by age
          </h1>
        </div>

        <p style={paraLead}>
          Matching games are probably the first memory game most children ever play, and there is a reason they have stayed popular for decades. The format is simple enough for a three-year-old to grasp, the difficulty scales naturally with age, and the underlying cognitive practice is genuinely useful. This guide covers what works at each age, what is genuinely free, and what to move on to when your child has outgrown the classic card grid.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Try Blanked, free</a>
        </div>

        {/* What it trains */}
        <section style={section}>
          <h2 style={h2}>What matching games actually train in a child&apos;s brain</h2>
          <p style={paraStyle}>
            Matching games train recognition memory and short-term visual recall. When a child turns over a card and tries to remember where the matching one was a few turns ago, they are practising holding spatial-visual information in mind for several seconds and retrieving it under prompt. That is working memory in action.
          </p>
          <p style={paraStyle}>
            Working memory is one of the most consequential cognitive abilities in childhood. Alloway and Alloway (2010) followed children for years and found that working memory at age 5 predicted academic achievement at age 11 better than IQ did. So the daily five minutes a young child spends on matching games is not just entertainment; it is exercise for the system that will, a few years from now, shape how well they sit through a lesson, follow a multi-step instruction, or hold a sentence in mind while writing the next one.
          </p>
          <p style={paraStyle}>
            The catch (and there always is one) is that the gains are narrow. Matching practice makes kids better at matching games and at closely related visual-recall tasks. The bigger claim ("brain games make kids smarter at school") is less well-supported (Simons et al., 2016). What matching games do is sharpen one specific cognitive function. They are a useful supplement to a normal childhood routine, not a replacement for sleep, reading, conversation, or play.
          </p>
        </section>

        {/* By age */}
        <section style={section}>
          <h2 style={h2}>The right format at each age</h2>
          <ul style={ulStyle}>
            <li><strong>Ages 3 to 4.</strong> Start with 6 cards (3 pairs). Use big, distinctive images: a clear dog, a clear apple, a clear sun. Play with a parent. Five minutes is enough.</li>
            <li><strong>Ages 4 to 5.</strong> Move up to 12 cards (6 pairs). The child should be able to manage this independently within a few weeks of regular play, though playing together is more engaging.</li>
            <li><strong>Ages 5 to 7.</strong> 16 to 20 cards (8 to 10 pairs). Themed sets (animals, vehicles, fruits) keep interest up. This is the sweet spot for the classic format.</li>
            <li><strong>Ages 7 to 9.</strong> 20 to 30 card grids. By the end of this range most kids find the standard matching format too easy. Time to introduce sequence games (Simon Says-style), spot-the-difference puzzles, and picture memory games where the entire scene appears at once and questions come after.</li>
            <li><strong>Ages 9+.</strong> The classic matching format is largely outgrown. The natural next step is broader visual-memory practice (scene games, sequence games) and brain-training apps with progressing difficulty.</li>
          </ul>
        </section>

        {/* Free online */}
        <section style={section}>
          <h2 style={h2}>Free online matching games for kids: what is actually good</h2>
          <p style={paraStyle}>
            The internet is awash with browser-based matching games for kids. Most are fine; a few are excellent; some are aggressive with ads. Some general guidance:
          </p>
          <ul style={ulStyle}>
            <li><strong>BBC Bitesize</strong> (UK) and similar public broadcaster sites have ad-free educational matching games designed for primary-school ages. Reliable and safe.</li>
            <li><strong>Coolmath Kids</strong> and <strong>ABCya</strong> have substantial libraries of memory and matching games organised by age. Some ads, mostly mild.</li>
            <li><strong>PBS Kids Games</strong> (US) and similar character-themed sites have well-designed simple matching games for under-7s. Familiar characters keep engagement high.</li>
            <li><strong>School-licensed sites</strong> like Education.com or Khan Academy Kids have memory and matching components inside their broader curriculum. Useful if your school recommends them.</li>
          </ul>
          <p style={paraStyle}>
            For mobile apps, the choices are more mixed. Most "free" matching apps for kids are either ad-supported (sometimes aggressively) or free-to-download with paywalled levels. Be cautious about apps with in-app purchases that appear during normal play; that is a red flag.
          </p>
        </section>

        {/* The Snap Match alternative */}
        <section style={section}>
          <h2 style={h2}>When the matching grid gets too easy</h2>
          <p style={paraStyle}>
            Around age 7 to 9, most children outgrow the standard matching format. They remember card positions on the first or second turn. The game finishes too quickly. The challenge has gone. This is the right moment to step up to a more substantial format, not to give up on memory practice altogether.
          </p>
          <p style={paraStyle}>
            Blanked has a Snap Match mode that takes the matching idea and updates it for kids who have outgrown card grids. You see two scenes of shapes and colours, almost identical, with one difference. You have to spot what is different, from memory, under a time pressure that scales with difficulty. It is harder than card-flip matching and trains the same underlying recognition system more thoroughly.
          </p>
          <p style={paraStyle}>
            For broader visual-memory practice once matching is mastered, the parallel guide is at{' '}
            <Link href="/memory-games-for-kids" style={inlineLink}>memory games for kids</Link>. For attention and concentration practice specifically, see{' '}
            <Link href="/brain-training-games-for-kids" style={inlineLink}>brain training games for kids</Link>.
          </p>
        </section>

        {/* Physical vs digital */}
        <section style={section}>
          <h2 style={h2}>Physical cards vs apps: when to use which</h2>
          <p style={paraStyle}>
            For children under about 7, physical matching cards are usually the better choice. The tactile experience holds attention, there is no blue light, parents can easily join in, and the practice happens completely off-screen. A simple set of themed memory cards costs a few pounds and lasts years.
          </p>
          <p style={paraStyle}>
            For children 7 and up who are already using screens regularly, apps add value in three ways: difficulty scales automatically, progress is tracked, and the variety of game formats keeps the practice from getting stale. The trade-off is screen time, which most parents are already managing carefully.
          </p>
          <p style={paraStyle}>
            The honest answer is that both formats train the same skill. The right choice depends on your family&apos;s context. For most households, the answer is some of both: physical cards as part of the bedtime or breakfast routine, an app for the car or quiet time.
          </p>
        </section>

        {/* CTA */}
        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>When card matching is too easy.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Blanked&apos;s Snap Match mode plus five other visual-memory modes. Free, rated 4+, suitable for kids from about age 7.
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
            See also the broader{' '}
            <Link href="/memory-games-for-kids" style={inlineLink}>memory games for kids</Link>
            {' '}guide, the focus-and-attention angle at{' '}
            <Link href="/brain-training-games-for-kids" style={inlineLink}>brain training games for kids</Link>, and the adult counterpart at{' '}
            <Link href="/matching-games-for-adults" style={inlineLink}>matching games for adults</Link>.
          </p>
        </section>

        {/* Sources */}
        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
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
