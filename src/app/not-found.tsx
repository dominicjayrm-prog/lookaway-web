import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import { COLORS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Page not found',
  description: "Looks like this page doesn't exist. Head back to Blanked.",
  robots: { index: false, follow: false },
};

const P = COLORS;

export default function NotFound() {
  return (
    <div
      style={{
        width: '100%', background: P.bg, minHeight: '100vh',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: 'flex', flexDirection: 'column',
      }}
    >
      <header style={{ maxWidth: 1100, margin: '0 auto', width: '100%', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <Blink size={128} expression="sad" />
          </div>
          <div
            style={{
              fontSize: 12, fontWeight: 700, color: P.accent,
              letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10,
            }}
          >
            404
          </div>
          <h1
            style={{
              fontSize: 40, fontWeight: 800, color: P.text, margin: 0,
              letterSpacing: -0.5, lineHeight: 1.15,
            }}
          >
            You&rsquo;ve blanked on this page
          </h1>
          <p style={{ fontSize: 17, color: '#636E72', lineHeight: 1.65, marginTop: 14, marginBottom: 32 }}>
            We couldn&rsquo;t find what you were looking for. The page may have moved, or the link might be broken.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/"
              style={{
                padding: '12px 24px', borderRadius: 12,
                background: `linear-gradient(135deg, ${P.accent}, ${P.accentL})`,
                color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none',
                boxShadow: `0 4px 20px ${P.accent}25`,
              }}
            >
              Back to home
            </Link>
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
        </div>
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
}
