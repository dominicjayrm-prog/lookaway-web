import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import Logo from '@/components/Logo';
import AppStoreButton from '@/components/AppStoreButton';
import { COLORS, APP_STORE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'You\'ve been challenged!',
  description: 'Someone challenged you to a visual memory battle in Blanked. Open this link on your phone to play.',
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
      <Link href="/" style={{ marginBottom: 32 }}>
        <Logo size={64} id="challenge" />
      </Link>

      {isMobile ? (
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <meta httpEquiv="refresh" content={`0;url=blanked://challenge/${date}/${userId}`} />
          <h1 style={{ fontSize: 32, fontWeight: 800, color: COLORS.text, marginBottom: 12 }}>Opening Blanked...</h1>
          <p style={{ fontSize: 16, color: COLORS.textM, lineHeight: 1.6, marginBottom: 24 }}>
            If the app doesn&apos;t open automatically, download it below.
          </p>
          <AppStoreButton />
        </div>
      ) : (
        <div style={{ textAlign: "center", maxWidth: 440 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: COLORS.text, marginBottom: 12 }}>
            You&apos;ve been <span style={{ color: COLORS.accent }}>challenged</span>!
          </h1>
          <p style={{ fontSize: 16, color: COLORS.textM, lineHeight: 1.6, marginBottom: 8 }}>
            Someone wants to battle your visual memory in Blanked.
          </p>
          <p style={{ fontSize: 16, color: COLORS.textM, lineHeight: 1.6, marginBottom: 32 }}>
            Open this link on your phone to accept the challenge.
          </p>
          <div style={{
            padding: "24px 32px", borderRadius: 18, background: "white",
            boxShadow: "0 2px 20px rgba(0,0,0,0.06)", display: "inline-block", marginBottom: 24
          }}>
            <div style={{ fontSize: 14, color: COLORS.textD, marginBottom: 8 }}>Scan with your phone camera</div>
            <div style={{
              width: 160, height: 160, background: `${COLORS.accent}08`, borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto"
            }}>
              <span style={{ fontSize: 12, color: COLORS.textD }}>QR Code</span>
            </div>
          </div>
          <div style={{ display: "block" }}>
            <AppStoreButton />
          </div>
        </div>
      )}
    </div>
  );
}
