import Logo from '@/components/Logo';
import PhoneMockup from '@/components/PhoneMockup';
import FloatingShapes from '@/components/FloatingShapes';
import WorldCard from '@/components/WorldCard';
import AppStoreButton from '@/components/AppStoreButton';
import Footer from '@/components/Footer';
import { COLORS, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;

export default function Home() {
  return (
    <div style={{
      width: "100%",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      background: P.bg, minHeight: "100vh"
    }}>
      {/* NAV */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={36} />
          <span style={{ fontSize: 18, fontWeight: 800, color: P.text }}>
            Look<span style={{ color: P.accent }}>Away</span>
          </span>
        </div>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "9px 20px", borderRadius: 10, background: P.text, color: "white",
            fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            textDecoration: "none"
          }}
        >
          <svg width="14" height="16" viewBox="0 0 384 512" fill="white">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          Download
        </a>
      </div>

      {/* HERO */}
      <div style={{
        padding: "50px 24px 70px", position: "relative", overflow: "hidden"
      }}>
        <FloatingShapes />
        <div style={{
          maxWidth: 960, margin: "0 auto", position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 56, flexWrap: "wrap"
        }}>

        <div style={{ maxWidth: 420, position: "relative", zIndex: 1 }}>
          <div className="fu" style={{ fontSize: 46, fontWeight: 800, color: P.text, lineHeight: 1.12, letterSpacing: -1.5 }}>
            How much can<br />you <span style={{ color: P.accent }}>remember</span>?
          </div>
          <div className="fu fu1" style={{ fontSize: 17, color: P.textM, lineHeight: 1.65, marginTop: 18, maxWidth: 370 }}>
            Study the scene. Look away. Answer from memory. A visual memory game that starts simple and gets impossibly hard.
          </div>

          <div className="fu fu2" style={{ display: "flex", gap: 12, marginTop: 28, alignItems: "center", flexWrap: "wrap" }}>
            <AppStoreButton />
            <div style={{ fontSize: 13, color: P.textD }}>Free to play</div>
          </div>

          <div className="fu fu3" style={{ display: "flex", gap: 28, marginTop: 32 }}>
            {[{ num: "200+", label: "Levels" }, { num: "6", label: "Worlds" }, { num: "30s", label: "Per round" }].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 24, fontWeight: 800, color: P.text }}>{s.num}</div>
                <div style={{ fontSize: 12, color: P.textD, fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="fu fu2" style={{ position: "relative", zIndex: 1, animation: "phoneBob 5s infinite ease-in-out" }}>
          <PhoneMockup />
        </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "70px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>How it works</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: P.text, marginBottom: 44 }}>Three steps. Pure memory.</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          {[
            {
              step: "1", title: "Memorise",
              desc: "A scene appears with coloured shapes, objects, and numbers. You have a few seconds to take it all in.",
              color: P.accent,
              icon: <svg width="34" height="24" viewBox="0 0 36 24"><path d="M2 12Q18 0 34 12Q18 24 2 12Z" fill={`${P.accent}12`} stroke={P.accent} strokeWidth="1.5" /><circle cx="18" cy="12" r="5" fill={P.accent} /><circle cx="18" cy="12" r="2.5" fill="white" /></svg>
            },
            {
              step: "2", title: "Look Away",
              desc: "The scene vanishes completely. Everything disappears. Now it's just you and your memory.",
              color: P.coral,
              icon: <svg width="34" height="24" viewBox="0 0 36 24"><path d="M2 14 Q18 14 34 14" stroke={P.coral} strokeWidth="2.5" strokeLinecap="round" fill="none" /><line x1="11" y1="16" x2="8" y2="22" stroke={P.coral} strokeWidth="1.8" strokeLinecap="round" /><line x1="18" y1="16" x2="18" y2="23" stroke={P.coral} strokeWidth="1.8" strokeLinecap="round" /><line x1="25" y1="16" x2="28" y2="22" stroke={P.coral} strokeWidth="1.8" strokeLinecap="round" /></svg>
            },
            {
              step: "3", title: "Answer",
              desc: "Five questions test what you saw. Colours, positions, counts. How much did you really remember?",
              color: P.green,
              icon: <svg width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill={`${P.green}12`} stroke={P.green} strokeWidth="1.5" /><text x="12" y="16" textAnchor="middle" fill={P.green} fontSize="13" fontWeight="700">?</text></svg>
            },
          ].map((item, i) => (
            <div key={i} style={{
              flex: "1 1 240px", maxWidth: 280, padding: "30px 26px", borderRadius: 22,
              background: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.04)", textAlign: "center"
            }}>
              <div style={{
                width: 60, height: 60, borderRadius: 18, background: `${item.color}06`,
                border: `1.5px solid ${item.color}12`, display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 18px"
              }}>
                {item.icon}
              </div>
              <div style={{ display: "inline-flex", padding: "2px 10px", borderRadius: 6, background: `${item.color}08`, marginBottom: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, letterSpacing: 0.5 }}>STEP {item.step}</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: P.text, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: P.textM, lineHeight: 1.55 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WORLDS */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 70px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Six worlds</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: P.text, marginBottom: 8 }}>From simple to impossible</div>
          <div style={{ fontSize: 15, color: P.textM, maxWidth: 480, margin: "0 auto" }}>200 levels across 6 worlds. Each introduces new mechanics that layer on top of the last.</div>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "4px 0 16px" }}>
          <WorldCard number={1} name="Shape Basics" desc="Learn fundamentals with simple shapes and colours." objects="20 levels" color={P.green} hint="●▲■" />
          <WorldCard number={2} name="Colour & Position" desc="Confusable colours and spatial memory." objects="30 levels" color={P.blue} hint="🎨" />
          <WorldCard number={3} name="Numbers & Letters" desc="Shapes with hidden content to remember." objects="35 levels" color={P.accent} hint="A7" />
          <WorldCard number={4} name="Moving Objects" desc="Objects glide across the scene while you watch." objects="35 levels" color={P.gold} hint="→" />
          <WorldCard number={5} name="Photographic" desc="Real-world objects. Categorise and recall." objects="40 levels" color={P.coral} hint="🐱🚗" />
          <WorldCard number={6} name="Mastermind" desc="Everything combined. The ultimate memory test." objects="40 levels" color={P.text} hint="🧠" />
        </div>
      </div>

      {/* CHALLENGE FRIENDS */}
      <div style={{
        padding: "70px 24px", textAlign: "center",
        background: "linear-gradient(180deg, transparent 0%, rgba(108,92,231,0.03) 50%, transparent 100%)",
        maxWidth: 960, margin: "0 auto"
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Challenge friends</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: P.text, marginBottom: 8 }}>Who remembers more?</div>
        <div style={{ fontSize: 15, color: P.textM, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.6 }}>Same scenes. Same questions. Head-to-head. Pure skill, zero luck.</div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 28, background: "white",
          borderRadius: 28, padding: "32px 44px", boxShadow: "0 4px 32px rgba(0,0,0,0.06)"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 60, height: 60, borderRadius: 20, background: P.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: 26, fontWeight: 800, margin: "0 auto 8px",
              border: `2.5px solid ${P.gold}`, boxShadow: `0 4px 14px ${P.accent}25`
            }}>Y</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: P.text }}>You</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: P.green, marginTop: 4 }}>88%</div>
          </div>
          <div>
            <div style={{
              width: 48, height: 48, borderRadius: 24, background: `${P.green}10`,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: P.green }}>WIN</span>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 60, height: 60, borderRadius: 20, background: P.coral,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: 26, fontWeight: 800, margin: "0 auto 8px",
              boxShadow: `0 4px 14px ${P.coral}20`
            }}>S</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: P.text }}>@sarah.k</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: P.text, marginTop: 4 }}>72%</div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "50px 24px 70px" }}>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            {
              title: "Visual memory", desc: "Train your brain to hold more visual information", color: P.accent,
              icon: <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke={P.accent} strokeWidth="1.8" /><path d="M12 6v6l4 2" fill="none" stroke={P.accent} strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="12" r="2" fill={P.accent} /></svg>
            },
            {
              title: "Quick sessions", desc: "Each level takes 30-60 seconds. Play anywhere.", color: P.gold,
              icon: <svg width="24" height="24" viewBox="0 0 24 24"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="none" stroke={P.gold} strokeWidth="1.8" strokeLinejoin="round" /></svg>
            },
            {
              title: "Track progress", desc: "Watch your memory score improve over time", color: P.green,
              icon: <svg width="24" height="24" viewBox="0 0 24 24"><polyline points="4,18 9,12 13,15 20,6" fill="none" stroke={P.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="16,6 20,6 20,10" fill="none" stroke={P.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            },
            {
              title: "Earn achievements", desc: "Unlock badges and climb the ranks", color: P.coral,
              icon: <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="9" r="6" fill="none" stroke={P.coral} strokeWidth="1.8" /><path d="M8,14 L6,22 L12,19 L18,22 L16,14" fill="none" stroke={P.coral} strokeWidth="1.8" strokeLinejoin="round" /></svg>
            },
          ].map((f, i) => (
            <div key={i} style={{
              flex: "1 1 180px", maxWidth: 220, padding: "22px 20px", borderRadius: 18,
              background: "white", boxShadow: "0 2px 14px rgba(0,0,0,0.03)", textAlign: "center"
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: `${f.color}08`,
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px"
              }}>
                {f.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: P.text, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{
        maxWidth: 960, margin: "0 auto", padding: "70px 24px 50px", textAlign: "center",
        background: "linear-gradient(180deg, transparent, rgba(108,92,231,0.04))"
      }}>
        <div style={{ fontSize: 38, fontWeight: 800, color: P.text, marginBottom: 10, letterSpacing: -0.5 }}>Ready to test your memory?</div>
        <div style={{ fontSize: 16, color: P.textM, marginBottom: 28 }}>Free to play. No account required to start.</div>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", padding: "15px 36px", borderRadius: 14,
            background: `linear-gradient(135deg, ${P.accent}, ${P.accentL})`,
            color: "white", fontSize: 17, fontWeight: 700, cursor: "pointer",
            boxShadow: `0 4px 24px ${P.accent}25`, textDecoration: "none"
          }}
        >
          Download LookAway
        </a>
        <div style={{ fontSize: 12, color: P.textD, marginTop: 14 }}>Available on iOS. Android coming soon.</div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <Footer />
      </div>
    </div>
  );
}
