import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Peak App Alternative: Free, No Subscription, iOS',
  description:
    'A free Peak app alternative for visual memory training. No subscription on the core game, two-minute sessions, honest about results. iOS only.',
  alternates: { canonical: `${SITE_URL}/peak-alternative` },
  openGraph: {
    type: 'article',
    locale: 'en_GB',
    siteName: 'Blanked',
    title: 'Peak App Alternative: Free, No Subscription, iOS',
    description: 'A free Peak app alternative for visual memory training. No paywall on the core game.',
    url: `${SITE_URL}/peak-alternative`,
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: 'Peak App Alternative', description: 'A free Peak alternative. iOS, no subscription on the core game.', images: [OG_IMAGE] },
};

const faqs = [
  {
    q: 'Is there a free version of Peak?',
    a: 'Peak has a limited free tier (a handful of games per day) with the bulk of the catalogue and Peak Pro features behind a subscription, currently around £4.99 a month or roughly £40 a year depending on region. If you want the full experience you pay; if you want a genuinely free alternative for visual memory specifically, Blanked is a strong fit.',
  },
  {
    q: 'What is the best free alternative to Peak?',
    a: 'On iOS, Blanked is the strongest free option for the visual-memory part of what Peak covers. Six modes, 400+ levels, no paywall on gameplay, and short sessions designed for actual daily use rather than long workouts. For broader cognitive training that matches Peak\'s catalogue breadth, BrainHQ has the strongest research backing but is also subscription-based.',
  },
  {
    q: 'Is Peak any good?',
    a: 'It is genuinely well-designed, Apple-design-recognised, and the academic association with Cambridge Brain Sciences gives it more credibility than the median app in the category. The main objections are the subscription model and the breadth-over-depth approach. If you want one focused skill (like visual memory) trained well rather than five touched lightly, Peak is not the most efficient choice.',
  },
  {
    q: 'How is Blanked different from Peak?',
    a: 'Blanked focuses entirely on visual memory rather than spreading across forty cognitive games. The full game is free with no paywall on gameplay. Sessions are two minutes rather than ten to fifteen. The mascot, Blink, gives the experience some personality where Peak is more clinical. The trade-off is breadth: if you want vocabulary or mental math practice, Peak covers more ground.',
  },
  {
    q: 'Will I lose progress if I switch from Peak?',
    a: 'Peak progress does not transfer between apps, so technically yes. In practice this is rarely an issue because the cognitive skill itself (visual memory, attention) stays with you; only the in-app levels reset. Run our free /memory-test before you switch to set a baseline, then again in a few weeks to track real cognitive progress rather than relying on app-specific level numbers.',
  },
  {
    q: 'Is Blanked on Android?',
    a: 'Not yet. Blanked is iOS-only with Android on the roadmap. Peak is available on both.',
  },
];

export const revalidate = 3600;

export default async function PeakAlternativePage() {
  const pageUrl = `${SITE_URL}/peak-alternative`;
  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts.filter((p) => /peak|alternative|brain.?training|memory|free/.test(`${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase())).slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'Peak App Alternative: Free, No Subscription, iOS',
    description: 'A free Peak app alternative for visual memory training. iOS, no paywall on gameplay.',
    author: { '@type': 'Person', '@id': `${SITE_URL}/authors/dominic-roworth`, name: 'Dominic Roworth', url: `${SITE_URL}/authors/dominic-roworth` },
    publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'Peak alternative' }]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Blink size={72} expression="thinking" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Free alternative</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            A free Peak app alternative:<br />
            <span style={{ color: P.accent }}>depth over breadth</span>, no subscription on the core game
          </h1>
        </div>

        <p style={paraLead}>
          Peak is genuinely a good brain-training app. The design is polished, it has won Apple Design Award attention, and the academic collaboration with Cambridge Brain Sciences gives it more credibility than the average app in the category. The objections to it are not about quality. They are about price and shape.
        </p>
        <p style={paraStyle}>
          Peak is subscription-only beyond a small free tier. The full Peak Pro experience runs around £4.99 a month or roughly £40 a year. And Peak is built around breadth: forty-plus mini-games across memory, attention, language, problem solving, and emotional control, all wrapped in a daily routine. That breadth is the appeal, and also the limit. If you want one specific cognitive skill trained well rather than five touched lightly, breadth costs you depth.
        </p>
        <p style={paraStyle}>
          This page is for people who want a free Peak alternative specifically for visual memory. Blanked is the iOS option built around that one focus. The full game (six modes, 400+ levels) is free with no paywall on gameplay, sessions are two minutes rather than ten-to-fifteen, and the marketing avoids the broad-transfer claims the wider category has been criticised for.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
        </div>

        <section style={section}>
          <h2 style={h2}>The Peak subscription, briefly</h2>
          <p style={paraStyle}>
            Peak gives you a daily workout of three or four mini-games on the free tier. Peak Pro unlocks the rest of the catalogue, the deeper progress tracking, and the personalised "Coach" feature. Currently around £4.99 a month or £39.99 to £49.99 a year depending on region. Pricing changes; check the App Store for the live number.
          </p>
          <p style={paraStyle}>
            That is a perfectly normal pricing model. It just is not what people mean by "free Peak alternative". Blanked is built around making the core game free indefinitely, with the optional Blanked+ subscription priced as a tip jar (ad removal plus cosmetics) rather than as a paywall.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>Where Blanked is the better fit</h2>
          <ul style={ulStyle}>
            <li><strong>You actually want to get sharper at one specific skill.</strong> Visual recall in Blanked\'s case. Daily focused practice on one task produces stronger narrow gains than spreading across many.</li>
            <li><strong>You do not have fifteen minutes a day.</strong> Peak\'s daily workout assumes you do. Blanked is two minutes by design, anchored to habit research rather than to engagement metrics.</li>
            <li><strong>You want the full game free.</strong> No daily-game limit, no paywall on later levels.</li>
            <li><strong>You like head-to-head friend challenges.</strong> Blanked sends the same scene to a friend so the scores are directly comparable. Peak has leaderboards but no identical-task mode.</li>
            <li><strong>You appreciate the honesty posture.</strong> Blanked is explicit about what brain training does and does not do (see{' '}
              <Link href="/does-brain-training-work" style={inlineLink}>/does-brain-training-work</Link>). Peak is more careful than most but still leans on the broader "make your brain sharper" framing.
            </li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>Where Peak is still the right pick</h2>
          <ul style={ulStyle}>
            <li>You want training across many cognitive domains, not just visual memory.</li>
            <li>You enjoy a longer, more involved daily session and the polished Peak design.</li>
            <li>You value the academic association with Cambridge Brain Sciences specifically.</li>
            <li>You need Android. Peak is available on both platforms; Blanked is iOS-only at the moment.</li>
            <li>You enjoy mental-math and language games as part of the routine; Blanked does not cover these.</li>
          </ul>
          <p style={paraStyle}>
            For the full side-by-side, see{' '}
            <Link href="/compare/peak" style={inlineLink}>/compare/peak</Link>. For the wider field, the{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>
            {' '}covers every major competitor.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>How to switch from Peak to Blanked</h2>
          <ol style={ulStyle}>
            <li>Cancel Peak Pro at least 24 hours before the next renewal: Settings &rarr; your name &rarr; Subscriptions &rarr; Peak Pro &rarr; Cancel.</li>
            <li>Download Blanked. The first session walks through the mechanic in about a minute.</li>
            <li>Set a tiny daily anchor: after morning coffee, on the commute, before bed. Two minutes is the whole commitment.</li>
            <li>Run the free{' '}
              <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
              {' '}now to set a baseline, then again in three weeks to track real progress rather than app-specific level numbers.</li>
          </ol>
        </section>

        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Visual memory, free, two minutes a day.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            One focused skill, trained well. No subscription on the core game.
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
                  {p.subtitle && <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.4 }}>{p.subtitle}</div>}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginTop: 36 }}>
          <p style={paraStyle}>
            Related: the in-depth{' '}
            <Link href="/compare/peak" style={inlineLink}>Blanked vs Peak comparison</Link>, the{' '}
            <Link href="/lumosity-alternative" style={inlineLink}>Lumosity alternative</Link>
            {' '}page, and the honest{' '}
            <Link href="/does-brain-training-work" style={inlineLink}>does brain training work?</Link>
            {' '}explainer.
          </p>
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
const h2: React.CSSProperties = { fontSize: 26, fontWeight: 800, color: COLORS.text, marginBottom: 14, letterSpacing: -0.3 };
const paraLead: React.CSSProperties = { fontSize: 18, color: '#636E72', lineHeight: 1.65, marginBottom: 14, fontWeight: 500 };
const paraStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14 };
const ulStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.75, paddingLeft: 22, marginBottom: 14 };
const ctaPrimary: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', borderRadius: 12, background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none' };
const inlineLink: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };
