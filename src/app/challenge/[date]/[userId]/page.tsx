import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import Logo from '@/components/BlinkAppIcon';
import AppStoreButton from '@/components/AppStoreButton';
import { COLORS, APP_SCHEME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'You\'ve been challenged!',
  description: 'Someone challenged you to a head-to-head visual memory battle in Blanked. Open this link on your phone to accept the challenge and see who remembers more.',
  openGraph: {
    title: "You've been challenged! | Blanked",
    description: 'Someone challenged you to a head-to-head visual memory battle in Blanked. Can you beat their score?',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "You've been challenged! | Blanked",
    description: 'Someone challenged you to a head-to-head visual memory battle in Blanked. Can you beat their score?',
    images: ['/og-image.png'],
  },
  robots: { index: false, follow: false },
};

export default async function ChallengePage({ params }: { params: Promise<{ date: string; userId: string }> }) {
  const { date, userId } = await params;
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

  return (
    <div style={{
      width: "100%", maxWidth: 960, margin: "0 auto", background: COLORS.bg,
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", padding: 24
    }}>
      <Link href="/" aria-label="Blanked home" style={{ marginBottom: 32 }}>
        <Logo size={64} />
      </Link>

      <h1 style={{ fontSize: isMobile ? 32 : 36, fontWeight: 800, color: COLORS.text, marginBottom: 12, textAlign: "center" }}>
        {isMobile ? "Opening Blanked..." : <>You&apos;ve been <span style={{ color: COLORS.accent }}>challenged</span>!</>}
      </h1>

      {isMobile ? (
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <meta httpEquiv="refresh" content={`0;url=${APP_SCHEME}challenge/${date}/${userId}`} />
          <p style={{ fontSize: 16, color: COLORS.textM, lineHeight: 1.6, marginBottom: 24 }}>
            If the app doesn&apos;t open automatically, download it below.
          </p>
          <AppStoreButton />
        </div>
      ) : (
        <div style={{ textAlign: "center", maxWidth: 440 }}>
          <p style={{ fontSize: 16, color: COLORS.textM, lineHeight: 1.6, marginBottom: 8 }}>
            Someone wants to battle your visual memory in Blanked.
          </p>
          <p style={{ fontSize: 16, color: COLORS.textM, lineHeight: 1.6, marginBottom: 32 }}>
            Open this link on your phone to accept the challenge.
          </p>
          <AppStoreButton />
        </div>
      )}
    </div>
  );
}
