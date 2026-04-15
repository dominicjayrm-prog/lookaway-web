import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import { COLORS, APP_STORE_URL, SITE_URL, FOUNDER } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind Blanked - why we built a visual memory game, how Blink became our mascot, and what we believe about brain training.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About | Blanked',
    description: 'The story behind Blanked and the small team that made it.',
    url: `${SITE_URL}/about`,
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary',
    title: 'About | Blanked',
    description: 'The story behind Blanked and the small team that made it.',
  },
};

const P = COLORS;

const h2: React.CSSProperties = { fontSize: 24, fontWeight: 800, color: P.text, margin: '40px 0 14px', letterSpacing: -0.3 };
const p: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 16 };

export default function AboutPage() {
  return (
    <div style={{ width: '100%', background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Blink size={96} expression="love" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Our story</div>
          <h1 style={{ fontSize: 44, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            We built Blanked because we kept forgetting things
          </h1>
        </div>

        {/* Story */}
        <section>
          <p style={p}>
            Blanked started the way a lot of apps do: with a personal problem that would not go away. We were forgetting simple things. Where we parked. People we had just met. Which tab on the browser had the important bit. And yet when we sat down with a proper memory exercise, we could recall detail after detail we never realised we had noticed.
          </p>
          <p style={p}>
            That gap between what we thought we could remember and what we actually could remember is the thing we wanted to play with. Not brain training dressed up as a chore. Not a test. A game.
          </p>

          <h2 style={h2}>The idea behind the game</h2>
          <p style={p}>
            The core loop is simple. A scene appears. You study it for a few seconds. It disappears. You answer from memory. That is it.
          </p>
          <p style={p}>
            What makes it interesting is how fast you start noticing the things you never used to notice. Players tell us they start paying attention to rooms differently. To conversations. To their surroundings. The game nudges your brain to be a little bit more present, and that nudge adds up.
          </p>
          <p style={p}>
            We did not want another cognitive-training platform that tries to do everything. We wanted one thing done well: visual memory. Six game modes, each a different angle on the same skill. Short sessions. Real difficulty curves. No dark patterns to keep you scrolling.
          </p>

          <h2 style={h2}>Meet Blink</h2>
          <p style={p}>
            Blink is the purple face you see throughout the app and this site. Blink is us. Every time the scene disappears, Blink covers his eyes too. Every time you get a streak going, his head lights on fire. He is the friend who gets just as invested as you do.
          </p>
          <p style={p}>
            We spent a lot of time on Blink, probably more than was reasonable. But the difference between a mascot that feels alive and one that feels like a logo is worth the time. We hope you think so too.
          </p>

          <h2 style={h2}>What we believe</h2>
          <ul style={{ ...p, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <li style={valueCard}>
              <strong style={valueTitle}>Respect for players</strong>
              No fake scarcity, no manipulative push notifications, no nagging. If you play today, great. If you need a week off, we will be here when you come back.
            </li>
            <li style={valueCard}>
              <strong style={valueTitle}>Privacy first</strong>
              We collect what the game needs to work. Nothing more. We never sell your data. Ever.
            </li>
            <li style={valueCard}>
              <strong style={valueTitle}>Free to play, seriously</strong>
              The whole game is free. All 380+ levels. Blanked+ is optional, not a gate on the content you care about.
            </li>
            <li style={valueCard}>
              <strong style={valueTitle}>Small team, made with care</strong>
              Blanked is a small operation based in Gibraltar. Every level, illustration, line of code, and FAQ answer was made by humans who actually play the game.
            </li>
          </ul>

          <h2 style={h2}>Meet the founder</h2>
          <div style={{
            display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24,
            alignItems: 'start', marginBottom: 22,
          }} className="founder-grid">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder.jpg"
              alt="Dominic, founder of Blanked"
              width={160}
              height={160}
              style={{
                width: 160, height: 160, borderRadius: 20,
                objectFit: 'cover',
                boxShadow: '0 6px 28px rgba(108,92,231,0.18)',
                border: `2px solid ${P.accent}20`,
                background: '#EEEDE8',
              }}
            />
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: P.text, marginBottom: 2 }}>
                Dominic
              </div>
              <div style={{ fontSize: 13, color: P.textD, marginBottom: 14, letterSpacing: 0.2 }}>
                Founder · Gibraltar
              </div>
              <p style={{ ...p, marginBottom: 12 }}>
                I&apos;m Dominic, the one person behind Blanked. I live and build from Gibraltar, a tiny rock at the bottom of Spain where somehow I&apos;ve ended up spending too many late nights obsessing over how memory actually works.
              </p>
              <p style={{ ...p, marginBottom: 12 }}>
                The honest version: I&apos;ve always been the guy who forgets names at parties. Every time it happened I&apos;d think, &ldquo;there has to be a way to train this.&rdquo; I tried the big brain-training apps. They felt like homework dressed up as research papers, locked behind subscriptions I resented. None of them made me want to open them again the next day.
              </p>
              <p style={{ ...p, marginBottom: 14 }}>
                So I built what I actually wanted to play. I write every line of code, design every level, draw every Blink expression, and reply to every email that lands at{' '}
                <a href="mailto:hello@playblanked.com" style={{ color: P.accent, textDecoration: 'underline' }}>hello@playblanked.com</a>. I love building apps, and I love that a game I made from a desk in Gibraltar might nudge someone on the other side of the world to remember a name, a password, or what they walked into the kitchen to do.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dominic on LinkedIn"
                  style={socialChip}
                >
                  LinkedIn ↗
                </a>
                <a
                  href={FOUNDER.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dominic on Instagram"
                  style={socialChip}
                >
                  Instagram ↗
                </a>
                <a
                  href={`mailto:${FOUNDER.email}`}
                  aria-label="Email Dominic"
                  style={socialChip}
                >
                  Email ↗
                </a>
              </div>
            </div>
          </div>

          <h2 style={h2}>Where we are now</h2>
          <p style={p}>
            Blanked is launching on iOS. Android is on the roadmap but not promised on a date yet. I&apos;m focused on making the iOS experience as good as it can be first.
          </p>
          <p style={p}>
            If you want to reach out, email{' '}
            <a href="mailto:hello@playblanked.com" style={{ color: P.accent, textDecoration: 'underline' }}>hello@playblanked.com</a>. I read everything and reply to most messages within 48 hours.
          </p>
        </section>

        <style>{`
          @media (max-width: 600px) {
            .founder-grid { grid-template-columns: 1fr !important; justify-items: center; text-align: center; }
            .founder-grid > div { text-align: left; }
          }
        `}</style>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Blanked on the App Store"
            style={{
              padding: '12px 24px', borderRadius: 12,
              background: `linear-gradient(135deg, ${P.accent}, ${P.accentL})`,
              color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none',
              boxShadow: `0 4px 20px ${P.accent}25`,
            }}
          >
            Download Blanked
          </a>
          <Link
            href="/blog"
            style={{
              padding: '12px 24px', borderRadius: 12,
              background: 'white', border: `1.5px solid ${P.accent}30`,
              color: P.accent, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            }}
          >
            Read the blog
          </Link>
        </div>
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>
    </div>
  );
}

const valueCard: React.CSSProperties = {
  background: 'white',
  borderRadius: 14,
  padding: '16px 20px',
  border: '1px solid rgba(0,0,0,0.04)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
  fontSize: 15, color: '#636E72', lineHeight: 1.6,
};

const valueTitle: React.CSSProperties = {
  display: 'block', color: COLORS.text, fontWeight: 700, fontSize: 15, marginBottom: 4,
};

const socialChip: React.CSSProperties = {
  padding: '6px 12px', borderRadius: 8,
  border: `1.5px solid ${COLORS.accent}30`,
  background: 'white',
  color: COLORS.accent,
  fontSize: 13, fontWeight: 600,
  textDecoration: 'none',
};
