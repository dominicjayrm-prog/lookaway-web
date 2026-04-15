import Link from 'next/link';
import BlinkAppIcon from './BlinkAppIcon';
import EmailCapture from './EmailCapture';
import { COLORS, CONTACT_EMAIL } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(0,0,0,0.05)",
      padding: "36px 24px 32px",
      display: "flex", flexDirection: "column", gap: 28,
    }}>
      {/* Email capture — primary footer hook */}
      <div style={{ maxWidth: 520 }}>
        <EmailCapture source="footer" />
      </div>

      {/* Brand row + nav */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BlinkAppIcon size={28} />
          <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent }}>Blanked</span>
          <span style={{ fontSize: 12, color: COLORS.textD }}>&copy; 2026</span>
        </div>
        <nav style={{ display: "flex", gap: 20, flexWrap: "wrap" }} aria-label="Footer navigation">
          <Link href="/about" style={{ fontSize: 12, color: COLORS.textD, cursor: "pointer" }}>About</Link>
          <Link href="/blog" style={{ fontSize: 12, color: COLORS.textD, cursor: "pointer" }}>Blog</Link>
          <Link href="/compare/peak" style={{ fontSize: 12, color: COLORS.textD, cursor: "pointer" }}>Compare</Link>
          <Link href="/support" style={{ fontSize: 12, color: COLORS.textD, cursor: "pointer" }}>Support</Link>
          <Link href="/privacy" style={{ fontSize: 12, color: COLORS.textD, cursor: "pointer" }}>Privacy</Link>
          <Link href="/terms" style={{ fontSize: 12, color: COLORS.textD, cursor: "pointer" }}>Terms</Link>
          <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Contact us by email" style={{ fontSize: 12, color: COLORS.textD, cursor: "pointer" }}>Contact</a>
          <Link href="/press" style={{ fontSize: 12, color: COLORS.textD, cursor: "pointer" }}>Press</Link>
        </nav>
      </div>
    </footer>
  );
}
