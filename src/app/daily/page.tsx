import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import DailyChallenge from '@/components/DailyChallenge';
import { COLORS, SITE_URL, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Daily Memory Challenge: One Puzzle a Day, Free',
  description:
    'A free daily memory challenge in your browser. Same puzzle for everyone, five rounds, share your result, keep your streak. New challenge at midnight.',
  alternates: { canonical: `${SITE_URL}/daily` },
  openGraph: {
    type: 'website',
    title: 'Daily Memory Challenge: One Puzzle a Day, Free',
    description:
      'Five rounds, same puzzle for everyone today. Play free in your browser and keep your streak.',
    url: `${SITE_URL}/daily`,
    siteName: 'Blanked',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Memory Challenge',
    description: 'One memory puzzle a day, same for everyone. Free, in your browser.',
  },
};

const faqs = [
  {
    q: 'How does the daily challenge work?',
    a: 'Every day there is one puzzle, and it is the same for every player in the world. Five rounds on a 5x5 grid: tiles flash for just over a second, then you click the ones you saw. Each round adds one more tile. You have three lives across the whole run and one attempt per day. A new challenge unlocks at midnight, your local time.',
  },
  {
    q: 'Is it really the same puzzle for everyone?',
    a: 'Yes. The tile patterns are generated from the date, so everyone playing on the same calendar day gets identical rounds. That is what makes shared results comparable, like Wordle.',
  },
  {
    q: 'What does the share grid mean?',
    a: 'Each row is one round. A purple square is a tile you found, a red square is a wrong click, and a white square is a tile you missed. Five clean purple rows is a perfect day.',
  },
  {
    q: 'How do streaks work?',
    a: 'Play the challenge on consecutive days and your streak counts up. Miss a day and it resets. The web streak is stored in your browser, so it will not follow you across devices; the Blanked app tracks your streak properly on your account.',
  },
  {
    q: 'What memory skill does this train?',
    a: 'Visuospatial working memory: holding positions in mind for a few seconds and reproducing them. It is the same task family as the Corsi block-tapping paradigm used in cognitive psychology research. One puzzle a day is a nudge, not a training programme; consistent daily practice is where measurable improvement comes from.',
  },
  {
    q: 'Do you store my results?',
    a: 'Only in your own browser (for the streak counter). Nothing about your play is sent to our servers. Standard site analytics may record the page visit, but not your score.',
  },
];

export default function DailyPage() {
  const pageUrl = `${SITE_URL}/daily`;

  const gameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Daily Memory Challenge',
    description:
      'A free daily visual memory challenge. Same puzzle for everyone, five rounds, playable in the browser, new challenge at midnight.',
    url: pageUrl,
    mainEntity: {
      '@type': 'Game',
      name: 'Blanked Daily Memory Challenge',
      description: 'One visual memory puzzle a day, identical for all players, playable free in the browser.',
      gamePlatform: 'Web browser',
      applicationCategory: 'Game',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Daily challenge' },
      ]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999,
              background: `${P.accent}10`, border: `1px solid ${P.accent}30`,
              fontSize: 12, fontWeight: 600, color: P.accent,
              letterSpacing: 0.3, marginBottom: 16,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: P.accent }} />
            Free · One attempt per day · Same puzzle for everyone
          </span>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            The <span style={{ color: P.accent }}>daily</span> memory challenge
          </h1>
          <p style={{ fontSize: 17, color: '#636E72', lineHeight: 1.65, maxWidth: 600, margin: '14px auto 0' }}>
            Five rounds. Tiles flash, you remember where they were. Everyone in the world gets the same puzzle today. Share your grid, keep your streak.
          </p>
        </div>

        {/* The challenge itself */}
        <DailyChallenge />

        {/* How it works */}
        <section style={section}>
          <h2 style={h2}>How it works</h2>
          <ul style={ulStyle}>
            <li><strong>One puzzle a day.</strong> The patterns are generated from today&rsquo;s date, so every player faces the same five rounds. Tomorrow at midnight (your local time), a new one unlocks.</li>
            <li><strong>Five rounds, rising difficulty.</strong> Round one flashes 3 tiles; round five flashes 7. Three lives cover the whole run.</li>
            <li><strong>Share your grid.</strong> Purple is a hit, red is a wrong click, white is a miss. Compare with friends playing the same puzzle.</li>
            <li><strong>Streaks are the point.</strong> Memory training compounds daily. The streak makes showing up visible. (Curious why streaks work on your brain? We wrote about <Link href="/blog/how-streaks-train-your-brain-the-neuroscience-2026" style={inlineLink}>the neuroscience of streaks</Link>.)</li>
          </ul>
        </section>

        {/* What it trains */}
        <section style={section}>
          <h2 style={h2}>What today&rsquo;s puzzle is actually training</h2>
          <p style={paraStyle}>
            Each round is a visuospatial working-memory task: encode a set of positions in about a second, hold them across the blank, and reproduce them. That is the same task family as the Corsi block-tapping paradigm that cognitive psychology has used since the 1970s, and the same skill measured by our{' '}
            <Link href="/memory-test" style={inlineLink}>full visual memory test</Link>. The capacity you are bumping against in rounds four and five (six or seven positions) is the well-documented limit of{' '}
            <Link href="/glossary/working-memory" style={inlineLink}>working memory</Link>: most adults hold 4 to 7 spatial items at once.
          </p>
          <p style={paraStyle}>
            One daily puzzle keeps the skill warm. If you want to actually push the ceiling, that takes repeated, varied practice at the edge of your ability, which is what the{' '}
            <Link href="/blog/how-to-play-blanked-beginners-guide-2026" style={inlineLink}>six game modes</Link> in the app are designed around: two minutes a day, at your level, with a properly tracked streak.
          </p>
        </section>

        {/* App CTA */}
        <section style={{ marginTop: 40, padding: '28px 24px', borderRadius: 16, background: `${P.accent}08`, border: `1px solid ${P.accent}20`, textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: P.text, margin: '0 0 8px' }}>
            To play the full game, download <span style={{ color: P.accent }}>Blanked</span>
          </h2>
          <p style={{ fontSize: 15, color: '#636E72', lineHeight: 1.6, margin: '0 0 18px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            The web challenge is one puzzle a day. The full game is six modes, 400+ levels, difficulty that adapts to you, and a streak that lives on your account instead of one browser.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>
            Get Blanked free on iOS
          </a>
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

        {/* More tests */}
        <section style={{ marginTop: 36 }}>
          <h2 style={h2}>Not done yet?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <Link href="/memory-test" style={variantCardStyle}>
              <div style={{ fontSize: 13, fontWeight: 800, color: P.text, marginBottom: 4 }}>Visual memory test</div>
              <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.4 }}>The unlimited version: climb as high as you can, no daily cap.</div>
            </Link>
            <Link href="/sequence-memory-test" style={variantCardStyle}>
              <div style={{ fontSize: 13, fontWeight: 800, color: P.text, marginBottom: 4 }}>Sequence memory test</div>
              <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.4 }}>Reproduce a growing sequence of lit tiles in order.</div>
            </Link>
            <Link href="/number-memory-test" style={variantCardStyle}>
              <div style={{ fontSize: 13, fontWeight: 800, color: P.text, marginBottom: 4 }}>Number memory test</div>
              <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.4 }}>Classical digit span: how many digits can you hold?</div>
            </Link>
          </div>
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
const variantCardStyle: React.CSSProperties = {
  display: 'block', padding: '14px 16px', borderRadius: 12,
  background: 'white', border: '1px solid rgba(0,0,0,0.04)',
  textDecoration: 'none', color: 'inherit',
  boxShadow: '0 1px 8px rgba(0,0,0,0.02)',
};
