import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/BlinkAppIcon';
import Footer from '@/components/Footer';
import { COLORS, CONTACT_EMAIL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Blanked terms of service - the rules for using our visual memory game, Blanked+ subscriptions, in-app purchases, virtual currency, and your account.',
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    title: 'Terms of Service | Blanked',
    description: 'The rules for using Blanked - accounts, subscriptions, in-app purchases, virtual currency.',
    url: `${SITE_URL}/terms`,
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Blanked',
    description: 'The rules for using Blanked - accounts, subscriptions, and purchases.',
  },
};

const sectionStyle: React.CSSProperties = { marginBottom: 36 };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: COLORS.text, marginBottom: 12 };
const h3Style: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 8, marginTop: 16 };
const pStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12 };
const ulStyle: React.CSSProperties = { fontSize: 16, color: COLORS.textM, lineHeight: 1.7, marginBottom: 12, paddingLeft: 24 };
const linkStyle: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };
const tldrStyle: React.CSSProperties = {
  fontSize: 14, color: COLORS.accent, fontWeight: 600, padding: '8px 14px',
  background: `${COLORS.accent}08`, borderRadius: 8, marginBottom: 14,
  borderLeft: `3px solid ${COLORS.accent}`,
};

export default function TermsPage() {
  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto", background: COLORS.bg, minHeight: "100vh" }}>
      {/* NAV */}
      <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/" aria-label="Blanked home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={36} />
          <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.text }}>
            <span style={{ color: COLORS.accent }}>Blanked</span>
          </span>
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, marginBottom: 8, letterSpacing: -0.5 }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: COLORS.textD, marginBottom: 40 }}>Last updated: 14 April 2026</p>

        <div style={sectionStyle}>
          <p style={pStyle}>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Blanked mobile app, our website, and any related services (together, the &ldquo;App&rdquo;). Blanked is operated from Gibraltar. By using the App, you agree to these Terms.
          </p>
          <p style={pStyle}>
            If you don&apos;t agree with any part of these Terms, please don&apos;t use the App.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Acceptance of Terms</h2>
          <p style={pStyle}>
            By downloading, installing, or using Blanked, you confirm that you have read, understood, and agree to be bound by these Terms and by our{' '}
            <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>. If you&apos;re using the App on behalf of a minor in your care, you agree to these Terms on their behalf.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Description of Service</h2>
          <p style={pStyle}>
            Blanked is a visual memory game available on iOS. The App includes:
          </p>
          <ul style={ulStyle}>
            <li>A free-to-play core game with 380+ levels across 6 game modes, head-to-head friend challenges, and optional in-app advertising</li>
            <li><strong>Blanked+</strong> - an auto-renewing subscription that unlocks unlimited lives, exclusive cosmetics, and removes ads (available monthly or yearly)</li>
            <li>Optional one-time in-app purchases, including gem packs and a &ldquo;Remove Ads&rdquo; upgrade</li>
          </ul>
          <p style={pStyle}>
            An account is required to play Blanked. You sign in via Apple Sign In or email when you first open the app. This lets us save your progress, streaks, gems, and friend connections, and keep them in sync across devices.
          </p>
          <p style={pStyle}>
            Ads displayed in the free version can be removed by purchasing &ldquo;Remove Ads&rdquo; or subscribing to Blanked+.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Age Requirement</h2>
          <p style={pStyle}>
            You must be at least 13 years old to use Blanked (or the minimum age of digital consent in your country - up to 16 in some EU member states). If you&apos;re under 18, you confirm that you have permission from a parent or legal guardian to use the App and to make any purchases.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. User Accounts</h2>
          <p style={pStyle}>
            To access social, cloud-sync, and purchase features, you can create an account via Apple Sign In or email sign-up. You agree to:
          </p>
          <ul style={ulStyle}>
            <li>Choose a username that isn&apos;t offensive, misleading, impersonating another person, or infringing anyone&apos;s trademarks or intellectual property rights</li>
            <li>Keep your account credentials secure - you&apos;re responsible for all activity under your account</li>
            <li>Not share your account with others, sell it, or transfer it</li>
          </ul>
          <p style={pStyle}>
            We reserve the right to suspend or terminate any account that violates these Terms, at our sole discretion.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Blanked+ Subscription Terms</h2>
          <div style={tldrStyle}>
            TL;DR: Blanked+ auto-renews at the end of each period. Cancel any time in your Apple ID account settings, at least 24 hours before the next renewal.
          </div>
          <p style={pStyle}>
            Blanked+ is an auto-renewing subscription with a monthly or yearly billing period. The following terms apply:
          </p>
          <ul style={ulStyle}>
            <li><strong>Pricing &amp; length</strong> - The subscription length and price are clearly disclosed at the point of purchase in the App</li>
            <li><strong>Payment</strong> - Payment is charged to your Apple ID account at confirmation of purchase</li>
            <li><strong>Auto-renewal</strong> - Your subscription automatically renews unless auto-renewal is switched off at least 24 hours before the end of the current period</li>
            <li><strong>Renewal charge</strong> - Your Apple ID will be charged for renewal within 24 hours prior to the end of the current period, at the price of the current subscription plan</li>
            <li><strong>Managing your subscription</strong> - You can manage your subscription and switch off auto-renewal by going to your Apple ID account settings after purchase: <strong>Settings → [your name] → Subscriptions</strong></li>
            <li><strong>No mid-period cancellation</strong> - Cancelling doesn&apos;t trigger a refund of the current billing period; you&apos;ll keep Blanked+ access until the end of the period you paid for</li>
            <li><strong>Free trials</strong> - Any unused portion of a free trial period will be forfeited when you purchase a subscription</li>
          </ul>
          <p style={pStyle}>
            Links to these Terms and our{' '}
            <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>
            {' '}are available from the purchase page inside the App.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. In-App Purchases</h2>
          <p style={pStyle}>
            Blanked offers two kinds of in-app purchases:
          </p>
          <ul style={ulStyle}>
            <li><strong>One-time purchases</strong> - such as gem packs and the &ldquo;Remove Ads&rdquo; upgrade. These do not recur.</li>
            <li><strong>Subscriptions</strong> - Blanked+, as described in Section 5 above</li>
          </ul>
          <p style={pStyle}>
            All purchases are processed by Apple through the App Store. We do not process payments directly and do not have access to your card or payment details.
          </p>
          <p style={pStyle}>
            <strong>All purchases are final.</strong> Refund requests must be submitted to Apple within their refund window and are subject to{' '}
            <a href="https://support.apple.com/en-gb/HT204084" target="_blank" rel="noopener noreferrer" style={linkStyle}>Apple&apos;s refund policy</a>. We do not issue refunds directly. If you&apos;re entitled to a statutory refund under applicable consumer-protection law (for example, for a faulty product), that statutory right is unaffected.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Virtual Currency (Gems)</h2>
          <div style={tldrStyle}>
            TL;DR: Gems are a game currency. They&apos;re not real money, can&apos;t be cashed out, and are non-refundable except as required by law.
          </div>
          <ul style={ulStyle}>
            <li>Gems are a virtual in-game currency with <strong>no real-world monetary value</strong></li>
            <li>Gems cannot be exchanged for cash, sold, gifted, or transferred between accounts</li>
            <li>Purchased gems are non-refundable except where required by law. Refund requests for gem purchases must go through Apple</li>
            <li>We may adjust gem prices, power-up costs, and reward amounts at any time as part of normal game balancing</li>
            <li>If your account is terminated for violating these Terms, any remaining gems, cosmetics, and progress are forfeited</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. User Conduct</h2>
          <p style={pStyle}>When using Blanked, you agree not to:</p>
          <ul style={ulStyle}>
            <li>Use cheats, exploits, automation software, modified clients, or any unauthorised third-party tools</li>
            <li>Harass, abuse, threaten, or send offensive content to other players through friend challenges or any other feature</li>
            <li>Impersonate another person, company, or brand, or misrepresent your identity</li>
            <li>Choose a username (or upload content) that violates the intellectual property rights of others</li>
            <li>Attempt to gain unauthorised access to the App, our servers, or other players&apos; accounts</li>
            <li>Attempt to circumvent the streak recovery window, the in-app purchase flow, ad display, or any other economy or game mechanism</li>
            <li>Interfere with or disrupt the normal operation of the App, including by submitting false or fraudulent data</li>
            <li>Use the App for any unlawful purpose</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. User-Generated Content</h2>
          <p style={pStyle}>
            When you choose a username, upload a profile photo, or otherwise contribute content to the App, you grant us a worldwide, non-exclusive, royalty-free, sublicensable licence to use, host, store, display, and reproduce that content for the purpose of operating and providing the App - for example, showing your username on leaderboards, or your avatar to your friends.
          </p>
          <p style={pStyle}>
            You represent and warrant that you own, or have all necessary rights to, any content you upload, and that it doesn&apos;t violate anyone else&apos;s rights or any applicable law.
          </p>
          <p style={pStyle}>
            We reserve the right to remove any content (usernames, profile photos, or other contributions) that violates these Terms, without prior notice.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Intellectual Property</h2>
          <p style={pStyle}>
            All content in Blanked - including but not limited to game design, graphics, animations, sounds, text, code, and our mascot Blink - is our intellectual property and is protected by applicable copyright, trademark, and other laws. You may not copy, modify, distribute, reverse-engineer, or create derivative works from any part of the App without our express written permission.
          </p>
          <p style={pStyle}>
            We grant you a limited, personal, non-exclusive, non-transferable licence to use the App on a device that you own or control, solely for your personal, non-commercial use, in accordance with these Terms.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Account Termination</h2>
          <p style={pStyle}>
            You can delete your account at any time from <strong>Settings → Profile → Delete Account</strong> inside the App. You can also email us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>
            {' '}to request deletion.
          </p>
          <p style={pStyle}>
            We may suspend or terminate your account if you violate these Terms. On termination:
          </p>
          <ul style={ulStyle}>
            <li>Your access to the App ends immediately</li>
            <li>Your data - including gems, cosmetics, progress, and friend connections - will be removed as described in our{' '}
              <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>
            </li>
            <li>Any active Blanked+ subscription will continue to renew through Apple until you cancel it in your Apple ID settings - we can&apos;t cancel Apple-managed subscriptions on your behalf</li>
            <li>Remaining gems and any non-consumed subscription benefits are forfeited</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Limitation of Liability</h2>
          <p style={pStyle}>
            Blanked is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. To the fullest extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, data, use, or goodwill arising out of or in connection with your use of the App.
          </p>
          <p style={pStyle}>
            <strong>Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot be excluded or limited by applicable law.</strong>
          </p>
          <p style={pStyle}>
            If you are a consumer, these Terms do not affect your statutory rights under the consumer-protection laws of Gibraltar, the UK, or your country of residence.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>13. Changes to These Terms</h2>
          <p style={pStyle}>
            We may update these Terms from time to time. When we make material changes, we&apos;ll notify you in-app or by email before they take effect. The &ldquo;Last updated&rdquo; date at the top of this page always reflects the current version. Your continued use of the App after changes take effect constitutes your acceptance of the updated Terms.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>14. Governing Law &amp; Jurisdiction</h2>
          <p style={pStyle}>
            These Terms are governed by and construed in accordance with the laws of Gibraltar, without regard to its conflict-of-law provisions. Any dispute arising out of or in connection with these Terms or your use of the App is subject to the exclusive jurisdiction of the courts of Gibraltar.
          </p>
          <p style={pStyle}>
            If you are a consumer resident in the EU, UK, or another jurisdiction that grants you mandatory local consumer-protection rights, nothing in this clause affects your right to bring proceedings in, or rely on the laws of, the country you live in.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>15. Severability</h2>
          <p style={pStyle}>
            If any provision of these Terms is found to be invalid, illegal, or unenforceable by a competent court, the remaining provisions will remain in full force and effect.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>16. Entire Agreement</h2>
          <p style={pStyle}>
            These Terms, together with our{' '}
            <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>, constitute the entire agreement between you and us regarding the App and supersede any prior agreements.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>17. No Waiver</h2>
          <p style={pStyle}>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of that right or provision. Any waiver must be in writing and signed by us.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>18. Contact</h2>
          <p style={pStyle}>
            Questions about these Terms? Get in touch:
          </p>
          <p style={pStyle}>
            <strong>Email</strong>:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
