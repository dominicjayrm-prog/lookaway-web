import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { COLORS, CONTACT_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'LookAway terms of service.',
};

const sectionStyle: React.CSSProperties = { marginBottom: 36 };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: COLORS.text, marginBottom: 12 };
const pStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12 };
const ulStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12, paddingLeft: 24 };

export default function TermsPage() {
  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto", background: COLORS.bg, minHeight: "100vh" }}>
      {/* NAV */}
      <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={36} />
          <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.text }}>
            Look<span style={{ color: COLORS.accent }}>Away</span>
          </span>
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, marginBottom: 8, letterSpacing: -0.5 }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: COLORS.textD, marginBottom: 40 }}>Last updated: 2 April 2026</p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Acceptance of Terms</h2>
          <p style={pStyle}>
            By downloading, installing, or using LookAway (&ldquo;the App&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do not use the App.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Description of Service</h2>
          <p style={pStyle}>
            LookAway is a free-to-play visual memory game available on iOS. The App includes 200 levels across 6 worlds, friend challenges, and optional in-app purchases. The core game experience is free and does not require an account to start playing.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. User Accounts</h2>
          <p style={pStyle}>To access certain features such as friend challenges and leaderboards, you may create an account. You agree to:</p>
          <ul style={ulStyle}>
            <li>Choose a unique username that is not offensive, misleading, or impersonating another person</li>
            <li>Keep your account credentials secure</li>
            <li>Be responsible for all activity that occurs under your account</li>
          </ul>
          <p style={pStyle}>
            We reserve the right to suspend or terminate accounts that violate these Terms, at our sole discretion.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. In-App Purchases</h2>
          <p style={pStyle}>
            LookAway may offer optional in-app purchases. All purchases are processed through the Apple App Store and are subject to Apple&apos;s terms and conditions. Refund requests should be directed to Apple in accordance with their refund policy.
          </p>
          <p style={pStyle}>
            We do not process payments directly and do not have access to your payment information.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. User Conduct</h2>
          <p style={pStyle}>When using LookAway, you agree not to:</p>
          <ul style={ulStyle}>
            <li>Use cheats, exploits, automation software, or any unauthorised third-party tools</li>
            <li>Harass, abuse, or send offensive content to other users through friend challenges or any other feature</li>
            <li>Impersonate another person or misrepresent your identity</li>
            <li>Attempt to gain unauthorised access to the App, its servers, or other users&apos; accounts</li>
            <li>Interfere with or disrupt the normal operation of the App</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Intellectual Property</h2>
          <p style={pStyle}>
            All content in LookAway &mdash; including but not limited to game design, graphics, animations, sounds, text, and code &mdash; is the intellectual property of LookAway and is protected by applicable copyright and trademark laws. You may not copy, modify, distribute, or create derivative works from any part of the App without our express written permission.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Limitation of Liability</h2>
          <p style={pStyle}>
            LookAway is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. To the fullest extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the App.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Changes to Terms</h2>
          <p style={pStyle}>
            We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting the updated terms within the App or on our website. Your continued use of the App following any changes constitutes your acceptance of the new Terms.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Governing Law</h2>
          <p style={pStyle}>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which LookAway operates, without regard to its conflict of law provisions.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Contact</h2>
          <p style={pStyle}>
            If you have any questions about these Terms, please contact us at:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: COLORS.accent, textDecoration: "underline" }}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
