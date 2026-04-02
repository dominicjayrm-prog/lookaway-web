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
      width: "100%", maxWidth: 960, margin: "0 auto",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      background: P.bg, minHeight: "100vh", overflow: "hidden"
    }}>
      {/* NAV */}
      <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
          <svg width="14" height="14" viewBox="0 0 170 200" fill="white">
            <path d="M150.4 172.2c-8.2 18.8-12.1 27.2-22.7 43.7-14.7 23-35.5 51.6-61.2 51.9-22.8.3-28.7-14.8-59.7-14.6-31 .2-37.5 15-60.3 14.7-25.5-.3-45.3-26.3-59-49.3C-49.3 158.2-53 86.8-30.7 48.9c15.9-27 41-42.8 64.6-42.8 27.3 0 44.5 14.9 67.1 14.9 21.9 0 35.2-14.9 66.8-14.9 21 0 43.6 11.4 59.5 31.1-52.3 25.3-65.6 74.6-42 135.0zM101.3-25.4c11.2-14.4 19.7-34.7 16.6-55.4-18.3 1.2-39.7 12.9-52.2 28.1-11.4 13.7-20.8 34.1-17.1 53.9 20 .6 40.7-11.3 52.7-26.6z" transform="translate(30,80) scale(0.7)" />
          </svg>
          Download
        </a>
      </div>

      {/* HERO */}
      <div style={{
        padding: "50px 24px 70px", position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 56, flexWrap: "wrap"
      }}>
        <FloatingShapes />

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

      {/* HOW IT WORKS */}
      <div style={{ padding: "70px 24px", textAlign: "center" }}>
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
      <div style={{ padding: "40px 24px 70px" }}>
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
        background: "linear-gradient(180deg, transparent 0%, rgba(108,92,231,0.03) 50%, transparent 100%)"
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
      <div style={{ padding: "50px 24px 70px" }}>
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
        padding: "70px 24px 50px", textAlign: "center",
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
      <Footer />
    </div>
  );
}
