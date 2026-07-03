import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Free Memory Game for iPhone, No Paywall',
  description:
    'A genuinely free memory game for iPhone. Six modes, 400+ levels, no paywall on the core game. Optional Blanked+ removes ads for the cost of a coffee.',
  alternates: { canonical: `${SITE_URL}/free-memory-game-iphone` },
  openGraph: { type: 'article', locale: 'en_GB', siteName: 'Blanked', title: 'Free Memory Game for iPhone', description: 'Genuinely free. No paywall on the core game.', url: `${SITE_URL}/free-memory-game-iphone`, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'Free Memory Game for iPhone', description: 'Genuinely free. No paywall on the core game.', images: [OG_IMAGE] },
};

const faqs = [
  { q: 'Is Blanked really free?', a: 'Yes. The full game, all six modes, all 400+ levels, daily streaks, friend challenges — free. Ads run in the free version (occasional and skippable). The optional Blanked+ subscription removes ads and adds cosmetic items. It does not gate any actual gameplay.' },
  { q: 'What is the catch?', a: 'There is no catch. The business model is: most people play free with ads. Some people prefer no ads or want to support the developer and subscribe to Blanked+. The math works because Blanked is built and run by one developer in Gibraltar with very low overhead. No marketing team, no UX consultants, no investor pressure to monetise aggressively.' },
  { q: 'What about other "free" memory games?', a: 'Most apps marketed as "free memory games for iPhone" are either ad-supported with aggressive interruptions, or free-to-download with the actual game locked behind a subscription (the Lumosity/Peak/Elevate model). Blanked is closer to the genuinely-free end: ads exist in the free tier but they are not aggressive, and gameplay is never paywalled.' },
  { q: 'Does Blanked use my data?', a: 'Standard analytics (Vercel Analytics, Microsoft tracking for the SEO-side audit) and basic gameplay data to balance difficulty. No personal data is sold. We have a clear /privacy page that lists every data category collected; it is short because we do not collect much.' },
  { q: 'Does it work offline?', a: 'Most of the game does. You need a connection for friend challenges, leaderboards, and cosmetic shop browsing. The core single-player modes work offline once the app has loaded the level pack.' },
  { q: 'Is there an Android version?', a: 'Not yet. Blanked is iOS-only with Android on the roadmap. There is no firm date.' },
];

export const revalidate = 3600;

export default async function FreeMemoryGameIphonePage() {
  const pageUrl = `${SITE_URL}/free-memory-game-iphone`;

  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Free Memory Game for iPhone: Blanked', description: 'A genuinely free memory game for iPhone with no paywall on the core game.', author: { '@type': 'Person', '@id': `${SITE_URL}/authors/dominic-roworth`, name: 'Dominic Roworth', url: `${SITE_URL}/authors/dominic-roworth` }, publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL }, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'Free memory game for iPhone' }]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Blink size={72} expression="normal" /></div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Genuinely free · iOS</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            A free memory game for iPhone:<br />
            <span style={{ color: P.accent }}>no paywall</span>, no aggressive monetisation, no catch
          </h1>
        </div>

        <p style={paraLead}>
          The App Store is full of "free memory games" that turn out to be free trials, ad-bombs, or free downloads with the actual game behind a subscription. Blanked is the genuinely free version: full game, six modes, 400+ levels, daily streaks, friend challenges, no paywall on gameplay. Ads run in the free tier; the optional Blanked+ subscription removes them and adds cosmetic items. That is the entire monetisation.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
        </div>

        <section style={section}>
          <h2 style={h2}>What "free" actually means in the App Store</h2>
          <p style={paraStyle}>
            The "Free" label on an App Store listing means "free to download". It does not mean "free to play". The common patterns:
          </p>
          <ul style={ulStyle}>
            <li><strong>Free trial then subscription.</strong> Most brain-training apps. You download free, get seven days, then auto-bill £4 to £12 a month if you do not cancel. Cancel-friction is part of the model.</li>
            <li><strong>Free download, paywalled content.</strong> A handful of games or levels free, the rest locked. Lumosity, Peak, Elevate, NeuroNation use this model.</li>
            <li><strong>Ad-bomb free.</strong> Free to download, free to play, but aggressive video ads every other interaction. The user "pays" with attention and time.</li>
            <li><strong>Genuinely free with optional support.</strong> The full product is free, with a tip-jar-style subscription or one-time purchase available for users who want to remove ads or support the developer. Less common; Blanked is in this category.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>What you get with Blanked, specifically</h2>
          <ul style={ulStyle}>
            <li><strong>Six game modes.</strong> Classic (scene recall), Speed Recall, Snap Match, Sequence, Counting Blitz, Colour Chain. All free.</li>
            <li><strong>400+ levels.</strong> Difficulty ramps gradually across multiple worlds. Free.</li>
            <li><strong>Daily streaks.</strong> Shields if you miss a day. Free.</li>
            <li><strong>Head-to-head friend challenges.</strong> Send a friend the same scene, compare scores. Free.</li>
            <li><strong>Memory analytics.</strong> Track your scores over time. Free.</li>
            <li><strong>Occasional ads.</strong> Short, skippable, not interrupting active gameplay.</li>
          </ul>
          <p style={paraStyle}>
            What Blanked+ adds (optional, currently around £2.99/month or £19.99/year if priced; check the App Store for live pricing): ad removal, exclusive cosmetic items for Blink, supporter badge. No content unlock because there is nothing content-wise to unlock.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>Why one developer building free works</h2>
          <p style={paraStyle}>
            The math on a free iOS app only works if overhead is genuinely low. Blanked is built by one developer in Gibraltar, with no marketing team, no UX consultancy, no investor pressure to maximise monetisation. The ad revenue from the free tier plus the trickle of Blanked+ subscribers keeps the lights on. There is no growth-at-all-costs target to hit. The pricing model can stay relaxed because the cost structure is relaxed.
          </p>
          <p style={paraStyle}>
            This is unusual in brain training, which is dominated by venture-backed companies that need to justify their valuations with subscription revenue. The same forces that make Lumosity, Peak, and Elevate gate their content also make them push subscription notifications aggressively. Blanked exists outside that pressure.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>How it compares</h2>
          <p style={paraStyle}>
            For the side-by-side against the bigger names, see{' '}
            <Link href="/compare/lumosity" style={inlineLink}>/compare/lumosity</Link>,{' '}
            <Link href="/compare/peak" style={inlineLink}>/compare/peak</Link>,{' '}
            <Link href="/compare/elevate" style={inlineLink}>/compare/elevate</Link>, or the full{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>. For the alternative-intent angle specifically, the dedicated{' '}
            <Link href="/lumosity-alternative" style={inlineLink}>Lumosity alternative</Link>
            {' '}and{' '}
            <Link href="/peak-alternative" style={inlineLink}>Peak alternative</Link>
            {' '}pages cover that.
          </p>
        </section>

        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Two-minute habit, no paywall.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Set a baseline first if you want: the free{' '}
            <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
            {' '}runs in your browser.
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
const inlineLink: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };
