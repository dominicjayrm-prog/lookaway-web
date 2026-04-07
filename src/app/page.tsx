import Blink from '@/components/Blink';
import MeetBlink from '@/components/MeetBlink';
import PhoneMockup from '@/components/PhoneMockup';
import StickyNav from '@/components/StickyNav';
import AnimatedCounter from '@/components/AnimatedCounter';
import Footer from '@/components/Footer';
import { COLORS, APP_STORE_URL, SITE_URL } from '@/lib/constants';

const P = COLORS;
const PINK = "#FD79A8";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": "Blanked",
    "operatingSystem": "iOS",
    "applicationCategory": "GameApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
    "description": "A visual memory game backed by science. Study the scene, it disappears, answer from memory. 6 game modes, 380+ levels.",
    "url": SITE_URL,
    "author": { "@type": "Organization", "name": "Blanked" },
    "genre": "Brain Training",
    "gamePlatform": "iOS",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Blanked - Visual Memory Game",
    "operatingSystem": "iOS 15.0+",
    "applicationCategory": "Games",
    "applicationSubCategory": "Brain Games",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP", "availability": "https://schema.org/InStock" },
  },
];

const modes = [
  { letter: "C", name: "Classic", color: P.accent, levels: "200 levels · 6 worlds", desc: "Memorise shapes, answer questions",
    visual: <>{[P.coral, P.blue, P.gold].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: i===0?"50%":i===1?2:0, background: c, transform: i===2?"rotate(45deg)":"none" }} />)}</> },
  { letter: "S", name: "Speed Recall", color: P.coral, levels: "45 levels · 3 worlds", desc: "Remember positions, tap where shapes were",
    visual: <><div style={{ width: 8, height: 8, borderRadius: "50%", background: P.coral }} /><div style={{ width: 14, height: 14, borderRadius: "50%", border: `1.5px dashed ${P.coral}60` }} /></> },
  { letter: "S", name: "Snap Match", color: P.blue, levels: "45 levels · 3 worlds", desc: "Two scenes, one change — find it fast",
    visual: <><div style={{ width: 12, height: 12, borderRadius: 3, background: `${P.blue}20`, border: `1px solid ${P.blue}40` }} /><span style={{ fontSize: 10, color: P.textD, fontWeight: 700 }}>≠</span><div style={{ width: 12, height: 12, borderRadius: 3, background: `${P.blue}20`, border: `1px solid ${P.blue}40` }} /></> },
  { letter: "S", name: "Sequence", color: P.gold, levels: "36 levels · 3 worlds", desc: "Shapes flash in order — tap them back",
    visual: <>{[1,2,3].map(n => <div key={n} style={{ width: 14, height: 14, borderRadius: 3, background: n===3?`${P.gold}15`:`${P.gold}30`, fontSize: 8, fontWeight: 700, color: P.gold, display: "flex", alignItems: "center", justifyContent: "center", opacity: n===3?0.4:1 }}>{n}</div>)}</> },
  { letter: "C", name: "Counting Blitz", color: P.green, levels: "30 levels · 2 worlds", desc: "Shapes pop in and out — count the colours",
    visual: <><div style={{ display: "flex", gap: 3, alignItems: "center" }}>{[P.coral, P.blue, P.green].map((c,i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}<span style={{ fontSize: 9, color: P.textD, fontWeight: 700 }}>= ?</span></div></> },
  { letter: "C", name: "Colour Chain", color: PINK, levels: "24 levels · 2 worlds", desc: "Memorise the colour grid, recall positions",
    visual: <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>{[P.coral, P.blue, P.green, P.gold, P.accent, PINK].map((c,i) => <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: c }} />)}</div> },
];

const scienceCards = [
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#0984E3" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#0984E3" strokeWidth="2" strokeLinecap="round"/></svg>, color: P.blue, stat: 23, label: "faster recall", desc: "Memory training improves how quickly you retrieve information" },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#00B894" strokeWidth="2"/><path d="M8 12l3 3 5-6" stroke="#00B894" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, color: P.green, stat: 31, label: "better focus", desc: "Visual memory exercises strengthen your attention span" },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#6C5CE7" strokeWidth="2"/><polyline points="4,18 9,12 13,15 20,6" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, color: P.accent, stat: 40, label: "sharper with age", desc: "Consistent brain training maintains cognitive function long-term" },
];

export default function Home() {
  return (
    <>
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      <StickyNav />

      <div style={{ width: "100%", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: P.bg, minHeight: "100vh" }}>
        <main>
          {/* ═══ HERO ═══ */}
          <section id="hero" style={{ minHeight: "90vh", padding: "60px 40px", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Hero">
            <div className="hero-layout" style={{ maxWidth: 1100, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 60 }}>
              <div className="hero-text" style={{ flex: 1, maxWidth: 480 }}>
                <div className="fu" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
                  <Blink size={38} expression="normal" />
                  <span style={{ fontSize: 18, fontWeight: 700, color: P.accent }}>Blanked</span>
                </div>

                <h1 className="fu fu1" style={{ fontSize: 48, fontWeight: 800, color: P.text, lineHeight: 1.1, margin: "0 0 20px", letterSpacing: -1 }}>
                  Your memory is more powerful than you <span style={{ color: P.accent }}>think</span>
                </h1>

                <p className="fu fu2" style={{ fontSize: 17, color: "#636E72", lineHeight: 1.6, margin: "0 0 32px" }}>
                  A visual memory game backed by science. Study the scene. It disappears. Answer from memory. Just 2 minutes a day.
                </p>

                <div className="fu fu3" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
                  <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Download Blanked on the App Store" style={{
                    padding: "14px 28px", borderRadius: 14, background: P.text, color: "white",
                    display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, textDecoration: "none",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 384 512" fill="white" aria-hidden="true">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    Download
                  </a>
                  <span style={{ fontSize: 14, color: "#B2BEC3" }}>Free to play</span>
                </div>

                <div className="fu fu4 stats-row" style={{ display: "flex", gap: 40 }}>
                  {[{ v: "380+", l: "Levels" }, { v: "6", l: "Game modes" }, { v: "2 min", l: "Per session" }].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: P.text }}>{s.v}</div>
                      <div style={{ fontSize: 13, color: "#B2BEC3", marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="phone-bob" style={{ flexShrink: 0 }} aria-hidden="true">
                <div className="phone-fade">
                  <PhoneMockup />
                </div>
              </div>
            </div>
          </section>

          {/* ═══ SCIENCE STATS ═══ */}
          <section id="science" style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }} aria-label="Science-backed benefits">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Backed by science</div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: P.text }}>Memory training actually <span style={{ color: P.accent }}>works</span></h2>
            </div>
            <div className="science-cards" style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              {scienceCards.map((card, i) => (
                <article key={i} style={{
                  flex: "1 1 280px", maxWidth: 340, padding: "32px 28px", borderRadius: 20,
                  background: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.04)", textAlign: "center",
                }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: `${card.color}10`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    {card.icon}
                  </div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: card.color, marginBottom: 4 }}>
                    <AnimatedCounter target={card.stat} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: P.text, marginBottom: 8 }}>{card.label}</div>
                  <p style={{ fontSize: 13, color: "#636E72", lineHeight: 1.5 }}>{card.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ═══ GAME MODES ═══ */}
          <section id="modes" style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }} aria-label="Game modes">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>6 Game modes</div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: P.text }}>Every mode trains your brain <span style={{ color: P.accent }}>differently</span></h2>
            </div>
            <div className="modes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {modes.map((mode, i) => (
                <article key={i} style={{
                  padding: "24px 22px", borderRadius: 18, background: "white",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.03)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: mode.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 16, fontWeight: 800 }}>{mode.letter}</div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: P.text }}>{mode.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, minHeight: 20 }}>
                    {mode.visual}
                  </div>
                  <p style={{ fontSize: 13, color: "#636E72", lineHeight: 1.45, marginBottom: 8 }}>{mode.desc}</p>
                  <div style={{ fontSize: 11, fontWeight: 600, color: mode.color }}>{mode.levels}</div>
                </article>
              ))}
            </div>
          </section>

          {/* ═══ MEET BLINK ═══ */}
          <MeetBlink />

          {/* ═══ FINAL CTA ═══ */}
          <section id="download" style={{ padding: "80px 40px 60px", textAlign: "center" }} aria-label="Download">
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
              <div style={{ margin: "0 auto 24px", display: "flex", justifyContent: "center" }}>
                <Blink size={80} expression="celebrate" />
              </div>
              <h2 style={{ fontSize: 38, fontWeight: 800, color: P.text, marginBottom: 12, letterSpacing: -0.5 }}>
                Ready to train your <span style={{ color: P.accent }}>memory</span>?
              </h2>
              <p style={{ fontSize: 16, color: "#636E72", marginBottom: 28 }}>
                Free to play. 2 minutes a day. Your brain will thank you.
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 28 }}>
                {[{ v: "2 min", l: "per session" }, { v: "380+", l: "levels" }, { v: "6", l: "game modes" }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: P.text }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "#B2BEC3" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Blanked for free"
                style={{
                  display: "inline-flex", padding: "16px 40px", borderRadius: 14,
                  background: `linear-gradient(135deg, ${P.accent}, ${P.accentL})`,
                  color: "white", fontSize: 17, fontWeight: 700, textDecoration: "none",
                  boxShadow: `0 4px 24px ${P.accent}30`,
                  position: "relative", overflow: "hidden",
                }}
              >
                <span style={{ position: "relative", zIndex: 1 }}>Play Now</span>
                <div style={{
                  position: "absolute", top: 0, width: 50, height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                  animation: "shimmer 2.5s infinite linear",
                }} />
              </a>
              <p style={{ fontSize: 12, color: "#B2BEC3", marginTop: 14 }}>Available on iOS</p>
            </div>
          </section>
        </main>

        {/* ═══ FOOTER ═══ */}
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Footer />
        </div>
      </div>
    </>
  );
}
