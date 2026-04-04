import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { COLORS, CONTACT_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Blanked privacy policy. Learn how we handle your data.',
  alternates: { canonical: 'https://playlookaway.app/privacy' },
  openGraph: {
    title: 'Privacy Policy | Blanked',
    description: 'Blanked privacy policy. Learn how we handle your data.',
    url: 'https://playlookaway.app/privacy',
  },
};

const sectionStyle: React.CSSProperties = { marginBottom: 36 };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: COLORS.text, marginBottom: 12 };
const pStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12 };
const ulStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12, paddingLeft: 24 };

export default function PrivacyPage() {
  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto", background: COLORS.bg, minHeight: "100vh" }}>
      {/* NAV */}
      <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={36} id="privacy-nav" />
          <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.text }}>
            <span style={{ color: COLORS.accent }}>Blanked</span>
          </span>
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, marginBottom: 8, letterSpacing: -0.5 }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: COLORS.textD, marginBottom: 40 }}>Last updated: 2 April 2026</p>

        <div style={sectionStyle}>
          <p style={pStyle}>
            Blanked (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use the Blanked mobile application.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>What We Collect</h2>
          <p style={pStyle}>When you use Blanked, we may collect the following information:</p>
          <ul style={ulStyle}>
            <li>Display name and username you choose when creating an account</li>
            <li>Game progress, including levels completed, star counts, and scores</li>
            <li>Friend connections and challenge results</li>
            <li>If you make a purchase: transaction records (processed entirely by Apple &mdash; we never see your payment details)</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>What We Don&apos;t Collect</h2>
          <p style={pStyle}>We value your privacy. We do <strong>not</strong> collect:</p>
          <ul style={ulStyle}>
            <li>Your real name (unless you choose it as your display name)</li>
            <li>Your email address (unless you sign up with email)</li>
            <li>Location data</li>
            <li>Contacts or address book information</li>
            <li>Photos or media</li>
            <li>Browsing history</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>How We Use Your Data</h2>
          <p style={pStyle}>The information we collect is used solely to:</p>
          <ul style={ulStyle}>
            <li>Save your game progress so you can pick up where you left off</li>
            <li>Display leaderboards and friend rankings</li>
            <li>Enable head-to-head friend challenges</li>
            <li>Improve game difficulty balance through aggregated, anonymised analytics</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Third-Party Services</h2>
          <p style={pStyle}>We use the following third-party services to operate Blanked:</p>
          <ul style={ulStyle}>
            <li><strong>Supabase</strong> &mdash; Database hosting and authentication</li>
            <li><strong>RevenueCat</strong> &mdash; In-app purchase management</li>
            <li><strong>Expo</strong> &mdash; Push notifications</li>
          </ul>
          <p style={pStyle}>
            We do not sell your data to advertisers or any third parties. Your data is only shared with the services listed above as necessary to operate the game.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Data Retention</h2>
          <p style={pStyle}>
            Your account data is kept for as long as your account remains active. If you wish to delete your account and all associated data, you can request deletion by contacting us at the email address below. We will process your request within 30 days.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Children&apos;s Privacy</h2>
          <p style={pStyle}>
            Blanked is suitable for players of all ages. We do not knowingly collect personal information from children under the age of 13 without verifiable parental consent. If you believe we have inadvertently collected information from a child under 13, please contact us and we will promptly delete it.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Data Security</h2>
          <p style={pStyle}>
            We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Changes to This Policy</h2>
          <p style={pStyle}>
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy within the app. Your continued use of Blanked after changes are posted constitutes your acceptance of the revised policy.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Contact Us</h2>
          <p style={pStyle}>
            If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: COLORS.accent, textDecoration: "underline" }}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
