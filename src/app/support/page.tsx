import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import { COLORS, CONTACT_EMAIL, SITE_URL, APP_STORE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Need help with Blanked? Get in touch, report a bug, ask about your account, or tell us what you think. We reply within 48 hours.',
  alternates: { canonical: `${SITE_URL}/support` },
  openGraph: {
    title: 'Support | Blanked',
    description: 'Get help with Blanked. Contact us, report a bug, or ask about your account.',
    url: `${SITE_URL}/support`,
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary',
    title: 'Support | Blanked',
    description: 'Get help with Blanked. Contact us, report a bug, or ask about your account.',
  },
};

const P = COLORS;

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    q: 'I found a bug — how do I report it?',
    a: (
      <>
        Email us at <Em />. Include your iOS version, device model (e.g. iPhone 15 Pro), and what you were doing when the bug happened.
        A screenshot or short screen recording helps us fix it faster.
      </>
    ),
  },
  {
    q: 'My purchase / gems / subscription didn\u2019t show up',
    a: (
      <>
        First, try <strong>Settings → Restore Purchases</strong> inside the app — this re-syncs with Apple and usually fixes it instantly.
        If that doesn&rsquo;t work, email us with your Apple Sign In email (or username) and we&rsquo;ll sort it out.
      </>
    ),
  },
  {
    q: 'How do I cancel Blanked+?',
    a: (
      <>
        Blanked+ is an auto-renewing subscription billed by Apple, so cancellation happens in iOS:{' '}
        <strong>Settings → [your name] → Subscriptions → Blanked → Cancel Subscription</strong>.
        You&rsquo;ll keep access until the end of your current billing period.
      </>
    ),
  },
  {
    q: 'How do I delete my account?',
    a: (
      <>
        Inside the app: <strong>Settings → Profile → Delete Account</strong>. This deletes your progress, gems, friends, and personal data within 30 days.
        You can also email us if you can&rsquo;t access the app.
      </>
    ),
  },
  {
    q: 'I forgot what email I used to sign up',
    a: (
      <>
        If you used Apple Sign In, Apple may have created a private relay email address for you — check{' '}
        <strong>iPhone Settings → [your name] → Sign-In &amp; Security → Sign in with Apple</strong> to see the apps linked to your Apple ID.
        Still stuck? Email us and we&rsquo;ll help you recover the account.
      </>
    ),
  },
  {
    q: 'My streak got reset and I didn\u2019t miss a day',
    a: (
      <>
        This one&rsquo;s on us — streak bugs are the worst. Email us with your username and roughly when the streak broke, and we&rsquo;ll restore it if it was a system error.
      </>
    ),
  },
  {
    q: 'I want to request a feature',
    a: (
      <>
        Honestly, we love these emails. Tell us what you&rsquo;d want to see and why — we read every one and a lot of our best ideas have come from players.
      </>
    ),
  },
  {
    q: 'Something else?',
    a: (
      <>
        Just email us. We read everything and reply to most messages within 48 hours (usually faster).
      </>
    ),
  },
];

function Em() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: P.accent, textDecoration: 'underline', fontWeight: 600 }}>
      {CONTACT_EMAIL}
    </a>
  );
}

export default function SupportPage() {
  return (
    <div style={{ width: '100%', background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* NAV */}
      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Blink size={96} expression="thinking" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Support</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Need a <span style={{ color: P.accent }}>hand</span>?
          </h1>
          <p style={{ fontSize: 17, color: '#636E72', lineHeight: 1.65, marginTop: 16, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            Bug to report, question about your account, or just want to tell us what you think? We read every email and usually reply within 48 hours.
          </p>
        </div>

        {/* Primary contact card */}
        <section
          aria-label="Contact us"
          style={{
            background: 'white', borderRadius: 20, padding: '32px 28px',
            boxShadow: '0 4px 32px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)',
            textAlign: 'center', marginBottom: 40,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: P.textM, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Email us</div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="Email Blanked support"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 26px', borderRadius: 14,
              background: `linear-gradient(135deg, ${P.accent}, ${P.accentL})`,
              color: 'white', fontSize: 16, fontWeight: 700, textDecoration: 'none',
              boxShadow: `0 4px 20px ${P.accent}25`, marginBottom: 16,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            {CONTACT_EMAIL}
          </a>
          <p style={{ fontSize: 13, color: P.textD, margin: 0 }}>
            Average response time: <strong style={{ color: P.green }}>within 48 hours</strong>
          </p>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently asked questions" style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: P.text, marginBottom: 20, letterSpacing: -0.3 }}>
            Quick answers
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((item, i) => (
              <details
                key={i}
                style={{
                  background: 'white', borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.03)', overflow: 'hidden',
                }}
              >
                <summary
                  style={{
                    padding: '16px 20px', cursor: 'pointer', fontSize: 15, fontWeight: 600,
                    color: P.text, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                >
                  {item.q}
                  <span style={{ fontSize: 18, color: P.textD, marginLeft: 12 }} aria-hidden="true">+</span>
                </summary>
                <div style={{ padding: '0 20px 20px', fontSize: 15, color: '#636E72', lineHeight: 1.65 }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* What to include */}
        <section
          aria-label="Tips for faster help"
          style={{
            background: `${P.accent}08`, borderRadius: 16, padding: '24px 24px',
            border: `1px solid ${P.accent}15`, marginBottom: 48,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <Blink size={40} expression="memorise" />
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: P.text, margin: '0 0 8px' }}>
                Help us help you faster
              </h3>
              <p style={{ fontSize: 14, color: '#636E72', lineHeight: 1.6, margin: 0 }}>
                When emailing about a bug or account issue, include your username (or Apple Sign In email), iOS version, device model,
                and — if possible — a screenshot or screen recording. It speeds things up hugely.
              </p>
            </div>
          </div>
        </section>

        {/* More links */}
        <section aria-label="More information" style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: P.text, marginBottom: 12 }}>More information</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            <li>
              <Link href="/privacy" style={linkCard}>
                <div style={linkCardTitle}>Privacy Policy</div>
                <div style={linkCardDesc}>What we collect and why</div>
              </Link>
            </li>
            <li>
              <Link href="/terms" style={linkCard}>
                <div style={linkCardTitle}>Terms of Service</div>
                <div style={linkCardDesc}>The rules for using Blanked</div>
              </Link>
            </li>
            <li>
              <Link href="/blog" style={linkCard}>
                <div style={linkCardTitle}>Blog</div>
                <div style={linkCardDesc}>Tips on training your memory</div>
              </Link>
            </li>
            <li>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={linkCard}>
                <div style={linkCardTitle}>App Store</div>
                <div style={linkCardDesc}>Download / rate Blanked</div>
              </a>
            </li>
          </ul>
        </section>
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>
    </div>
  );
}

const linkCard: React.CSSProperties = {
  display: 'block', padding: '14px 16px', borderRadius: 12,
  background: 'white', border: '1px solid rgba(0,0,0,0.04)',
  textDecoration: 'none', color: 'inherit',
  boxShadow: '0 1px 6px rgba(0,0,0,0.02)',
};
const linkCardTitle: React.CSSProperties = {
  fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 2,
};
const linkCardDesc: React.CSSProperties = {
  fontSize: 12, color: COLORS.textD,
};
