import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import Logo from '@/components/Logo';
import AppStoreButton from '@/components/AppStoreButton';
import { COLORS, APP_SCHEME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Join me on Blanked!',
  description: 'A friend invited you to play Blanked - the visual memory game backed by science. 6 game modes, 380+ levels. Download it free on iOS and start training your memory.',
  openGraph: {
    title: 'Join me on Blanked!',
    description: 'A friend wants you to play Blanked - the visual memory game. 6 game modes, 380+ levels. Download free.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join me on Blanked!',
    description: 'A friend wants you to play Blanked - the visual memory game. 6 game modes, 380+ levels. Download free.',
    images: ['/og-image.png'],
  },
  robots: { index: false, follow: false },
};

export default async function InvitePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
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
        <Logo size={64} id="invite" />
      </Link>

      <h1 style={{ fontSize: isMobile ? 32 : 36, fontWeight: 800, color: COLORS.text, marginBottom: 12, textAlign: "center" }}>
        {isMobile ? "Opening Blanked..." : <>You&apos;re <span style={{ color: COLORS.accent }}>invited</span>!</>}
      </h1>

      {isMobile ? (
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <meta httpEquiv="refresh" content={`0;url=${APP_SCHEME}invite/${userId}`} />
          <p style={{ fontSize: 16, color: COLORS.textM, lineHeight: 1.6, marginBottom: 24 }}>
            If the app doesn&apos;t open automatically, download it below.
          </p>
          <AppStoreButton />
        </div>
      ) : (
        <div style={{ textAlign: "center", maxWidth: 440 }}>
          <p style={{ fontSize: 16, color: COLORS.textM, lineHeight: 1.6, marginBottom: 8 }}>
            A friend wants you to join them on Blanked - the visual memory game.
          </p>
          <p style={{ fontSize: 16, color: COLORS.textM, lineHeight: 1.6, marginBottom: 32 }}>
            Open this link on your phone to get started.
          </p>
          <AppStoreButton />
        </div>
      )}
    </div>
  );
}
