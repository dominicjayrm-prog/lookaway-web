import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/BlinkAppIcon';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { COLORS, CONTACT_EMAIL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Delete Your Blanked Account',
  description:
    'Delete your Blanked account in two ways: in-app from Settings, or by email to hello@playblanked.com. Account and data removed within 30 days.',
  alternates: { canonical: `${SITE_URL}/delete-account` },
  openGraph: {
    title: 'Delete Your Blanked Account | Blanked',
    description: 'Delete your Blanked account in-app or by email. Removed within 30 days.',
    url: `${SITE_URL}/delete-account`,
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary',
    title: 'Delete Your Blanked Account | Blanked',
    description: 'Delete your Blanked account in-app or by email.',
  },
};

const sectionStyle: React.CSSProperties = { marginBottom: 28 };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: COLORS.text, marginBottom: 12 };
const pStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12 };
const linkStyle: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };

export default function DeleteAccountPage() {
  return (
    <div style={{ width: '100%', maxWidth: 960, margin: '0 auto', background: COLORS.bg, minHeight: '100vh' }}>
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'Delete account' }]} />

      {/* NAV */}
      <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Logo size={36} />
          <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.text }}>
            <span style={{ color: COLORS.accent }}>Blanked</span>
          </span>
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, marginBottom: 24, letterSpacing: -0.5 }}>
          Delete your Blanked account
        </h1>

        <div style={sectionStyle}>
          <p style={pStyle}>You can delete your Blanked account in two ways:</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>In-app</h2>
          <p style={pStyle}>
            Open Blanked &rarr; Settings &rarr; Danger zone &rarr; Delete Account.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>By email</h2>
          <p style={pStyle}>
            Send a request to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>
            {' '}from the email address associated with your Blanked account. We&apos;ll process the deletion within 30 days. All your data, including game progress, friends, purchase history, and profile picture, will be permanently removed.
          </p>
        </div>

        <div style={sectionStyle}>
          <p style={pStyle}>
            If you have any questions, contact{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>.
          </p>
        </div>

        <div style={{ ...sectionStyle, marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <p style={{ ...pStyle, fontSize: 14, color: COLORS.textD }}>
            See also our{' '}
            <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>
            {' '}for details on data retention and your other data rights.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
