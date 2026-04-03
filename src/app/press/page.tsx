import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { COLORS, CONTACT_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Press Kit',
  description: 'LookAway press kit. Download logos, screenshots, and app information for media coverage.',
  alternates: { canonical: 'https://playlookaway.app/press' },
  openGraph: {
    title: 'Press Kit | LookAway',
    description: 'Download LookAway logos, screenshots, and app information for press coverage.',
    url: 'https://playlookaway.app/press',
  },
};

const P = COLORS;

export default function PressPage() {
  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto", background: P.bg, minHeight: "100vh" }}>
      {/* NAV */}
      <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={36} id="press-nav" />
          <span style={{ fontSize: 18, fontWeight: 800, color: P.text }}>
            Look<span style={{ color: P.accent }}>Away</span>
          </span>
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: P.text, marginBottom: 8, letterSpacing: -0.5 }}>Press Kit</h1>
        <p style={{ fontSize: 16, color: P.textM, marginBottom: 40, lineHeight: 1.7 }}>
          Everything you need to write about LookAway. For press enquiries, contact{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: P.accent, textDecoration: "underline" }}>{CONTACT_EMAIL}</a>.
        </p>

        {/* App Info */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: P.text, marginBottom: 16 }}>About LookAway</h2>
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "8px 20px", fontSize: 16, color: P.textM, lineHeight: 1.7 }}>
            <span style={{ fontWeight: 600, color: P.text }}>App name</span><span>LookAway</span>
            <span style={{ fontWeight: 600, color: P.text }}>Tagline</span><span>How much can you remember?</span>
            <span style={{ fontWeight: 600, color: P.text }}>Platform</span><span>iOS (Android coming soon)</span>
            <span style={{ fontWeight: 600, color: P.text }}>Price</span><span>Free to play</span>
            <span style={{ fontWeight: 600, color: P.text }}>Content</span><span>200 levels across 6 worlds</span>
            <span style={{ fontWeight: 600, color: P.text }}>Multiplayer</span><span>Head-to-head friend challenges</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: P.text, marginBottom: 16 }}>Description</h2>
          <p style={{ fontSize: 16, color: P.textM, lineHeight: 1.7, marginBottom: 12 }}>
            LookAway is a visual memory game that tests how much you can remember after a scene disappears. Each level presents a scene filled with coloured shapes, objects, numbers, and patterns. Players have a few seconds to memorise everything, then the scene vanishes and five questions test their recall.
          </p>
          <p style={{ fontSize: 16, color: P.textM, lineHeight: 1.7, marginBottom: 12 }}>
            The game spans 200 levels across 6 worlds, each introducing new mechanics: from basic shape recognition to moving objects, photographic scenes, and the ultimate &ldquo;Mastermind&rdquo; world that combines everything. Difficulty ramps gradually, making the game accessible to casual players while providing a genuine challenge for memory enthusiasts.
          </p>
          <p style={{ fontSize: 16, color: P.textM, lineHeight: 1.7 }}>
            Players can challenge friends head-to-head: both players see the same scenes, answer the same questions, and compare scores. It&apos;s pure skill with zero luck &mdash; the perfect game for competitive friends.
          </p>
        </div>

        {/* Key Features */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: P.text, marginBottom: 16 }}>Key Features</h2>
          <ul style={{ fontSize: 16, color: P.textM, lineHeight: 1.7, paddingLeft: 24 }}>
            <li>200 hand-crafted levels across 6 themed worlds</li>
            <li>30-60 second gameplay sessions — perfect for short breaks</li>
            <li>Head-to-head friend challenges with shared scenes</li>
            <li>Progressive difficulty from simple shapes to complex photographic scenes</li>
            <li>Star-based scoring system with achievements and rankings</li>
            <li>No ads in core gameplay. Free to play with optional upgrades</li>
          </ul>
        </div>

        {/* Downloadable Assets */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: P.text, marginBottom: 16 }}>Assets</h2>
          <p style={{ fontSize: 16, color: P.textM, lineHeight: 1.7, marginBottom: 20 }}>
            Download logos, icons, and screenshots for use in articles and reviews.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {/* App Icon */}
            <div style={{
              padding: 24, borderRadius: 18, background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.03)", textAlign: "center"
            }}>
              <div style={{ marginBottom: 12 }}>
                <Logo size={80} id="press-icon" />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: P.text, marginBottom: 4 }}>App Icon</div>
              <div style={{ fontSize: 12, color: P.textD }}>PNG, 1024×1024</div>
            </div>

            {/* Logo on Light */}
            <div style={{
              padding: 24, borderRadius: 18, background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.03)", textAlign: "center"
            }}>
              <div style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 80 }}>
                <Logo size={40} id="press-light" />
                <span style={{ fontSize: 22, fontWeight: 800, color: P.text }}>Look<span style={{ color: P.accent }}>Away</span></span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: P.text, marginBottom: 4 }}>Logo (Light)</div>
              <div style={{ fontSize: 12, color: P.textD }}>For light backgrounds</div>
            </div>

            {/* Logo on Dark */}
            <div style={{
              padding: 24, borderRadius: 18, background: P.text, boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.03)", textAlign: "center"
            }}>
              <div style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 80 }}>
                <Logo size={40} id="press-dark" />
                <span style={{ fontSize: 22, fontWeight: 800, color: "white" }}>Look<span style={{ color: P.accentL }}>Away</span></span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 4 }}>Logo (Dark)</div>
              <div style={{ fontSize: 12, color: "#999" }}>For dark backgrounds</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: P.text, marginBottom: 16 }}>Press Contact</h2>
          <p style={{ fontSize: 16, color: P.textM, lineHeight: 1.7 }}>
            For press enquiries, review copies, or interview requests, please email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: P.accent, textDecoration: "underline" }}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
