import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Matching Games for Adults: What Works (and What Does Not)',
  description:
    'Matching games for adults explained: how they actually train memory, which versions are worth your time, and what to play instead if you want real visual recall practice.',
  alternates: { canonical: `${SITE_URL}/matching-games-for-adults` },
  openGraph: {
    type: 'article',
    locale: 'en_GB',
    siteName: 'Blanked',
    title: 'Matching Games for Adults: What Works (and What Does Not)',
    description: 'How matching games actually train memory, and what to play if you want real visual recall practice.',
    url: `${SITE_URL}/matching-games-for-adults`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matching Games for Adults',
    description: 'How matching games actually train memory. Plus a sharper alternative.',
    images: [OG_IMAGE],
  },
};

const faqs = [
  {
    q: 'Are matching games good for the adult brain?',
    a: 'They are decent practice for recognition memory and they sustain attention for short bursts, which is fine. They are not the strongest format if you want to push your working-memory capacity. Classic card-matching trains a narrow recognition task. If you want broader visual-memory practice (scenes, layouts, sequences), a scene-based game like Blanked stretches more of the system.',
  },
  {
    q: 'What is the best memory match game for adults?',
    a: 'For casual entertainment, any of the free web-based card-flip games will do the job. For something more substantial that actually progresses in difficulty and tracks your improvement, mobile apps are better. Blanked has a Snap Match mode that is a closer-to-cognitive-research version of the matching format: two scenes, one difference, find it from memory.',
  },
  {
    q: 'Do matching games help prevent memory loss?',
    a: 'The honest answer is not really, in any specific or evidence-backed sense. The ACTIVE trial (Edwards et al., 2017) showed that speed-of-processing training was associated with lower dementia risk over 10 years in older adults. Classic matching games are not that kind of training. They are pleasant and harmless but not a clinical intervention. Pair daily mental engagement with physical activity, sleep, social contact, and blood-pressure management for the actual evidence-backed package.',
  },
  {
    q: 'How is Blanked different from a regular matching game?',
    a: 'Most matching games are turn-over-cards, find-pairs, repeat. Blanked is a wider category of visual-memory training, including scene recall (study a scene, the screen blanks, answer questions), sequence memory (remember the order of items), and a Snap Match mode that does the matching format but with scenes rather than card pairs. The mechanic stretches more aspects of visual memory than a single card-flip game.',
  },
  {
    q: 'Are there free matching games for adults?',
    a: 'Plenty. Web-based card-flip games are everywhere. For mobile, Blanked is free (full game, 400+ levels, no paywall on gameplay) and includes the Snap Match mode for the matching format specifically. Most of the bigger brain-training apps (Lumosity, Peak) have matching-style games but the catalog sits behind a paid subscription.',
  },
  {
    q: 'Is Blanked available on Android?',
    a: 'Not yet. Blanked is iOS-only with Android on the roadmap.',
  },
];

export const revalidate = 3600;

export default async function MatchingGamesForAdultsPage() {
  const pageUrl = `${SITE_URL}/matching-games-for-adults`;

  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = `${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase();
      return /match|memory|brain.?training|recall|focus/.test(haystack);
    })
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Matching Games for Adults: What Works (and What Does Not)',
    description:
      'How matching games for adults actually train memory, which versions are worth your time, and what to play instead if you want serious visual recall practice.',
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
        { name: 'Matching games for adults' },
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
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>For Adults</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Matching games for adults:<br />
            what works, and <span style={{ color: P.accent }}>what to play instead</span>
          </h1>
        </div>

        <p style={paraLead}>
          Card-matching games (the kind where you turn over two cards at a time and try to find pairs) are probably the first memory game most of us ever played. They are still everywhere. Web-based versions, mobile apps, board game sets. Most people search for matching games for adults because they want a calming low-stakes way to practice memory. That is a perfectly fine goal. There are also better options for actually building the skill, and the difference is worth understanding.
        </p>
        <p style={paraStyle}>
          This page covers what a matching game actually trains, where it stops being the most efficient practice, and what to play instead if you want sharper visual recall in your daily life. It includes a section on memory match game for adults specifically (the format with progressive difficulty rather than the static card grid).
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Try Blanked, free</a>
        </div>

        {/* What matching games train */}
        <section style={section}>
          <h2 style={h2}>What a matching game actually trains</h2>
          <p style={paraStyle}>
            The classic format goes like this. A grid of face-down cards. You flip two. If they match, they stay face-up. If not, they flip back over and you try to remember where they were for next time. The game ends when every pair has been found.
          </p>
          <p style={paraStyle}>
            What is being trained here is recognition memory plus a small amount of spatial recall. You are not holding a sequence in mind. You are not reproducing a layout from scratch. You are remembering "I saw a butterfly in that spot a few turns ago" when its match shows up. The cognitive load is real but narrow.
          </p>
          <p style={paraStyle}>
            This is fine. Recognition memory is a real cognitive function, it is worth practicing, and matching games are pleasant. The limitation is that you stop progressing fairly quickly. Most adults max out the difficulty of a typical matching grid within a few sessions. The brain adapts to the specific format and stops being challenged.
          </p>
          <p style={paraStyle}>
            For more on the underlying cognitive systems involved, see our plain-English glossary entries on{' '}
            <Link href="/glossary/visual-memory" style={inlineLink}>visual memory</Link>
            {' '}and{' '}
            <Link href="/glossary/short-term-memory" style={inlineLink}>short-term memory</Link>.
          </p>
        </section>

        {/* Where they stop being enough */}
        <section style={section}>
          <h2 style={h2}>Where matching games stop being enough</h2>
          <p style={paraStyle}>
            A matching game is a good first practice. After two or three weeks of daily play, most adults find the format too familiar to keep stretching them. The pairs become predictable. The grid feels small. The improvement curve flattens.
          </p>
          <p style={paraStyle}>
            The honest read of the research literature here: focused practice on a specific cognitive task reliably improves that task. The improvement does not transfer broadly to general cognition or everyday memory in a major way (Simons et al., 2016 is the canonical reference). So if matching games stop challenging you, the gains stop too. You need a different format that introduces new demands.
          </p>
          <p style={paraStyle}>
            The natural next step is something that stretches the same visual-memory systems but with more variety. Scene recall, sequence memory, spatial layouts that change every round. That is what most modern visual-memory apps do, and it is what Blanked is built around.
          </p>
        </section>

        {/* The Snap Match alternative */}
        <section style={section}>
          <h2 style={h2}>The closer-to-cognitive-research version</h2>
          <p style={paraStyle}>
            One of the six modes in Blanked is called Snap Match. It is the matching format, but updated for the kind of practice that actually scales in difficulty.
          </p>
          <p style={paraStyle}>
            How it works: you see one scene of shapes, colours, and positions. Study it. A second scene appears, almost identical to the first but with one element changed (a colour, a shape, a position). You have to spot what is different, from memory, fast. Across 45 levels and three worlds, the scenes get denser and the change gets subtler.
          </p>
          <p style={paraStyle}>
            What this trains that classic card-matching does not: the comparison itself is held in working memory. You are not flipping over individual cards and remembering positions. You are holding a whole scene in mind and overlaying a second version against it. That is closer to the kind of recall most adults actually need in everyday life (recognising that something has moved on a desk, spotting that a face is unfamiliar, noticing that a price tag has changed).
          </p>
          <p style={paraStyle}>
            Other Blanked modes (Classic scene recall, Speed Recall, Sequence, Counting Blitz, Colour Chain) cover other corners of visual memory. The full game is free. There is more on how the whole thing fits together on the{' '}
            <Link href="/memory-games-for-adults" style={inlineLink}>memory games for adults</Link>
            {' '}page.
          </p>
        </section>

        {/* Free options */}
        <section style={section}>
          <h2 style={h2}>Free matching games for adults: what is genuinely free</h2>
          <p style={paraStyle}>
            Browser-based card-flip matching games are everywhere and almost all are free. For an idle five minutes on a desktop, they are fine.
          </p>
          <p style={paraStyle}>
            For mobile, the situation is muddier. Most apps marketed as free matching games for adults are ad-supported, sometimes aggressively. Some are free to download but lock the better levels behind a subscription. Blanked is free in the literal sense: full game, all 400+ levels, no paywall on gameplay. The optional Blanked+ subscription removes ads and adds cosmetic items but does not gate content.
          </p>
          <p style={paraStyle}>
            If you want to benchmark yourself before committing, our{' '}
            <Link href="/memory-test" style={inlineLink}>free visual memory test</Link>
            {' '}runs in your browser, no signup, two minutes.
          </p>
        </section>

        {/* CTA */}
        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Past the matching grid?</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Blanked&apos;s Snap Match mode, plus five other visual-memory game modes, in a free two-minute daily habit.
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
            <Link href="/memory-games-for-adults" style={inlineLink}>memory games for adults</Link>
            {' '}guide, the{' '}
            <Link href="/picture-memory-games-for-adults" style={inlineLink}>picture memory games for adults</Link>
            {' '}page, and the kids&apos; version at{' '}
            <Link href="/matching-games-for-kids" style={inlineLink}>matching games for kids</Link>. Comparing brain-training apps? The{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>
            {' '}covers Blanked against Lumosity, Peak, Elevate, and the rest.
          </p>
        </section>

        {/* Sources */}
        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li><a href="https://journals.sagepub.com/doi/10.1177/1529100616661983" target="_blank" rel="noopener noreferrer" style={inlineLink}>Simons et al. (2016), &ldquo;Do Brain-Training Programs Work?&rdquo;, Psychological Science in the Public Interest</a></li>
            <li><a href="https://doi.org/10.1016/j.trci.2017.09.002" target="_blank" rel="noopener noreferrer" style={inlineLink}>Edwards et al. (2017), &ldquo;Speed of processing training results in lower risk of dementia&rdquo;, ACTIVE Trial</a></li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={inlineLink}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, Trends in Cognitive Sciences</a></li>
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
