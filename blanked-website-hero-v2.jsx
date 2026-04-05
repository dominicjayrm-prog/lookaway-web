import { useState, useEffect } from "react";

const P = {
  bg: "#FAFAF7", accent: "#6C5CE7", accentL: "#A29BFE",
  green: "#00B894", coral: "#FF6B6B", gold: "#D4A012", blue: "#0984E3",
  orange: "#E17055", pink: "#FD79A8", teal: "#00CEC9",
  text: "#1A1A18", textM: "#636E72", textD: "#B2BEC3",
};

const modeLabels = [
  { name: "Classic Mode", tagline: "Memorise the scene. Answer from memory.", color: P.accent },
  { name: "6 Game Modes", tagline: "380+ levels across 6 unique campaigns.", color: P.green },
  { name: "Achievements", tagline: "Unlock badges. Earn gems. Track your progress.", color: P.gold },
  { name: "Speed Recall", tagline: "Tap where each shape was on the canvas.", color: P.coral },
  { name: "Colour Chain", tagline: "Memorise the grid. Recall each colour.", color: P.pink },
];

// ═══ PHONE FRAME ═══
const PhoneFrame = ({ children }) => (
  <div style={{
    width: 260, height: 530, borderRadius: 36, background: "#1A1A18",
    padding: 7, position: "relative",
    boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1)",
  }}>
    <div style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", width: 80, height: 22, borderRadius: 11, background: "#1A1A18", zIndex: 10 }} />
    <div style={{ width: "100%", height: "100%", borderRadius: 30, background: P.bg, overflow: "hidden", position: "relative" }}>
      {children}
    </div>
    <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", width: 90, height: 4, borderRadius: 2, background: "#555" }} />
  </div>
);

// ═══ SCREEN 1: CLASSIC GAMEPLAY ═══
const ClassicScreen = () => {
  const [timerWidth, setTimerWidth] = useState(45);
  useEffect(() => {
    const t = setInterval(() => setTimerWidth(w => w <= 5 ? 45 : w - 1.2), 60);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: "32px 14px 12px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: P.textD }}>✕</span>
        <div style={{ padding: "2px 10px", borderRadius: 8, background: `${P.green}10`, border: `1px solid ${P.green}20` }}>
          <span style={{ fontSize: 8, fontWeight: 700, color: P.green, letterSpacing: 0.5 }}>LEVEL 4</span>
        </div>
        <div style={{ width: 11 }} />
      </div>
      {/* Timer bar */}
      <div style={{ height: 4, borderRadius: 2, background: "#E8E6E1", margin: "8px 0 6px" }}>
        <div style={{ width: `${timerWidth}%`, height: "100%", borderRadius: 2, background: timerWidth > 25 ? P.gold : P.coral, transition: "width 0.08s linear, background 0.3s" }} />
      </div>
      <div style={{ fontSize: 11, textAlign: "center", color: P.textM, marginBottom: 6 }}>Memorise this scene!</div>
      {/* Canvas — square, matching real app */}
      <div style={{
        width: "100%", aspectRatio: "1", background: "white", borderRadius: 14, position: "relative",
        boxShadow: "0 1px 6px rgba(0,0,0,0.03)", marginBottom: 8,
      }}>
        {/* Coral circle — top left */}
        <div style={{ position: "absolute", left: "14%", top: "14%", width: 36, height: 36, borderRadius: "50%", background: P.coral }} />
        {/* Blue square — top right */}
        <div style={{ position: "absolute", right: "14%", top: "14%", width: 36, height: 36, borderRadius: 8, background: P.blue }} />
        {/* Purple square — centre */}
        <div style={{ position: "absolute", left: "50%", top: "42%", transform: "translateX(-50%)", width: 34, height: 34, borderRadius: 8, background: P.accent }} />
        {/* Teal triangle — bottom left */}
        <svg style={{ position: "absolute", left: "12%", bottom: "14%" }} width="38" height="38" viewBox="0 0 100 100">
          <polygon points="50,8 95,88 5,88" fill={P.teal} />
        </svg>
        {/* Gold circle — bottom right */}
        <div style={{ position: "absolute", right: "14%", bottom: "16%", width: 34, height: 34, borderRadius: "50%", background: P.gold }} />
      </div>
      {/* Power-up */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "5px 14px", borderRadius: 10, background: `${P.blue}06`, border: `1px solid ${P.blue}10`, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 9, color: P.textD }}>⏱</span>
          <span style={{ fontSize: 9, color: P.textD }}>+3s</span>
          <span style={{ fontSize: 9, color: P.blue }}>💎30</span>
        </div>
      </div>
    </div>
  );
};

// ═══ SCREEN 2: JOURNEY / ALL MODES ═══
const JourneyScreen = () => {
  const [selectedMode, setSelectedMode] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSelectedMode(m => (m + 1) % 6), 1800);
    return () => clearInterval(t);
  }, []);

  const campaigns = [
    { letter: "C", name: "Classic", count: "200", color: P.accent },
    { letter: "S", name: "Speed Recall", count: "45", color: P.coral },
    { letter: "S", name: "Snap Match", count: "45", color: P.blue },
    { letter: "S", name: "Sequence", count: "36", color: P.gold },
    { letter: "C", name: "Counting", count: "30", color: P.green },
    { letter: "C", name: "Colour Chain", count: "24", color: P.pink },
  ];

  return (
    <div style={{ padding: "32px 12px 12px", height: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: P.text }}>Journey</span>
        <div style={{ padding: "3px 10px", borderRadius: 10, background: `${P.gold}10` }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: P.gold }}>⭐ 479/1140</span>
        </div>
      </div>
      <div style={{ fontSize: 8, fontWeight: 700, color: P.textD, letterSpacing: 1, marginBottom: 6 }}>CAMPAIGNS</div>
      {/* 2x3 grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5, marginBottom: 8 }}>
        {campaigns.map((c, i) => (
          <div key={i} style={{
            padding: "8px 4px", borderRadius: 10, textAlign: "center",
            background: i === selectedMode ? `${c.color}10` : "white",
            border: i === selectedMode ? `1.5px solid ${c.color}30` : "1.5px solid rgba(0,0,0,0.03)",
            transition: "all 0.3s",
            transform: i === selectedMode ? "scale(1.04)" : "scale(1)",
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 9, margin: "0 auto 4px",
              background: `${c.color}12`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 800, color: c.color,
            }}>{c.letter}</div>
            <div style={{ fontSize: 8, fontWeight: 700, color: i === selectedMode ? c.color : P.text }}>{c.name}</div>
            <div style={{ fontSize: 7, color: P.textD }}>{c.count} levels</div>
          </div>
        ))}
      </div>
      {/* World card */}
      <div style={{
        padding: "10px 12px", borderRadius: 12, background: "white",
        border: `1.5px solid ${P.green}25`, marginBottom: 6,
      }}>
        <div style={{ padding: "2px 8px", borderRadius: 6, background: `${P.green}10`, display: "inline-block", marginBottom: 4 }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: P.green, letterSpacing: 0.5 }}>WORLD 1</span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>Shape Basics</div>
        <div style={{ fontSize: 9, color: P.textD }}>20 levels</div>
        <div style={{ height: 3, borderRadius: 2, background: "#E8E6E1", margin: "6px 0 3px" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 2, background: P.green }} />
        </div>
        <div style={{ fontSize: 8, color: P.textD }}>20/20</div>
        <div style={{ marginTop: 6, padding: "8px 0", borderRadius: 8, background: P.green, textAlign: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>Continue</span>
        </div>
      </div>
      {/* Tab bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        display: "flex", justifyContent: "space-around", padding: "6px 0 18px",
        background: "white", borderTop: "1px solid rgba(0,0,0,0.04)",
      }}>
        {["▶", "📖", "👥", "💎"].map((icon, i) => (
          <div key={i} style={{
            padding: "3px 12px", borderRadius: 8,
            background: i === 1 ? `${P.accent}08` : "transparent",
            fontSize: 12, opacity: i === 1 ? 1 : 0.35,
          }}>{icon}</div>
        ))}
      </div>
    </div>
  );
};

// ═══ SCREEN 3: ACHIEVEMENTS ═══
const AchievementsScreen = () => {
  const tierColors = { bronze: "#CD7F32", silver: "#B2BEC3", gold: "#D4A012", none: "#E8E6E1" };

  const badges = [
    { name: "World Traveller", desc: "Complete all levels in a world", icon: "🌍", tier: "gold", progress: "6/6", dots: [true, true, true] },
    { name: "Perfectionist", desc: "Get 3 stars on every level", icon: "⭐", tier: "silver", progress: "3/3", dots: [true, true, false] },
    { name: "Level Grinder", desc: "Complete campaign levels", icon: "📦", tier: "bronze", progress: "25/25", dots: [true, false, false] },
    { name: "Memory Master", desc: "Score 100% on dailies", icon: "🧠", tier: "silver", progress: "25/25", dots: [true, true, false] },
    { name: "Daily Devotee", desc: "Complete daily challenges", icon: "📅", tier: "gold", progress: "200/200", dots: [true, true, true] },
    { name: "Social Butterfly", desc: "Challenge friends", icon: "🦋", tier: "bronze", progress: "5/5", dots: [true, false, false] },
    { name: "Champion", desc: "Win friend challenges", icon: "🏆", tier: "none", progress: "3/5", dots: [false, false, false] },
    { name: "Popular", desc: "Add friends", icon: "❤️", tier: "bronze", progress: "3/3", dots: [true, false, false] },
  ];

  return (
    <div style={{ padding: "32px 12px 12px", height: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: P.textD }}>‹</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: P.text }}>Achievements</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 600, color: P.textD }}>27/39</span>
      </div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {["All", "Campaign", "Daily", "Social", "Streak"].map((f, i) => (
          <div key={f} style={{
            padding: "3px 8px", borderRadius: 8, fontSize: 8, fontWeight: 600,
            background: i === 0 ? P.green : "white",
            color: i === 0 ? "white" : P.textM,
            border: i === 0 ? "none" : "1px solid rgba(0,0,0,0.04)",
          }}>{f}</div>
        ))}
      </div>
      {/* Badge grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
        {badges.map((b, i) => (
          <div key={i} style={{
            padding: "8px", borderRadius: 10, background: "white",
            border: b.tier !== "none" ? `1.5px solid ${tierColors[b.tier]}30` : "1.5px solid rgba(0,0,0,0.04)",
          }}>
            {/* Icon */}
            <div style={{
              width: 28, height: 28, borderRadius: 9, marginBottom: 4,
              background: b.tier !== "none" ? `${tierColors[b.tier]}12` : "#F5F4F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13,
            }}>{b.icon}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: P.text, marginBottom: 1 }}>{b.name}</div>
            <div style={{ fontSize: 7, color: P.textD, marginBottom: 4 }}>{b.desc}</div>
            {/* Tier dots */}
            <div style={{ display: "flex", gap: 3, marginBottom: 2 }}>
              {b.dots.map((filled, j) => (
                <div key={j} style={{
                  width: 6, height: 6, borderRadius: 3,
                  background: filled ? tierColors[["bronze", "silver", "gold"][j]] : "#E8E6E1",
                }} />
              ))}
            </div>
            <div style={{ fontSize: 7, color: P.textD }}>{b.progress}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══ SCREEN 4: SPEED RECALL ═══
const SpeedRecallScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase(p => (p + 1) % 3), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: "32px 14px 12px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: P.coral }}>Speed Recall</span>
        <span style={{ fontSize: 9, color: P.textD }}>Round 3/5</span>
      </div>

      {phase === 0 && (
        <>
          <div style={{ fontSize: 10, textAlign: "center", color: P.textM, marginBottom: 6 }}>Memorise the positions!</div>
          <div style={{ width: "100%", aspectRatio: "1", background: "white", borderRadius: 14, position: "relative", boxShadow: "0 1px 6px rgba(0,0,0,0.03)" }}>
            <div style={{ position: "absolute", left: "18%", top: "16%", width: 30, height: 30, borderRadius: "50%", background: P.coral }} />
            <div style={{ position: "absolute", right: "15%", top: "22%", width: 28, height: 28, borderRadius: 6, background: P.blue }} />
            <div style={{ position: "absolute", left: "40%", top: "40%", width: 26, height: 26, borderRadius: "50%", background: P.green }} />
            <div style={{ position: "absolute", left: "15%", bottom: "18%", width: 28, height: 28, borderRadius: 6, background: P.gold }} />
            <svg style={{ position: "absolute", right: "20%", bottom: "22%" }} width="28" height="28" viewBox="0 0 100 100"><polygon points="50,8 95,88 5,88" fill={P.accent}/></svg>
          </div>
        </>
      )}

      {phase === 1 && (
        <>
          <div style={{ fontSize: 10, textAlign: "center", color: P.textM, marginBottom: 6 }}>
            Where was the <span style={{ color: P.green, fontWeight: 700 }}>green circle</span>?
          </div>
          <div style={{ width: "100%", aspectRatio: "1", background: "white", borderRadius: 14, position: "relative", boxShadow: "0 1px 6px rgba(0,0,0,0.03)" }}>
            {/* Tap point */}
            <div style={{ position: "absolute", left: "38%", top: "44%", width: 9, height: 9, borderRadius: 5, background: P.green, zIndex: 2 }} />
            {/* Actual position */}
            <div style={{ position: "absolute", left: "36%", top: "36%", width: 26, height: 26, borderRadius: 13, border: `2px dashed ${P.green}50` }} />
            {/* Line */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <line x1="42%" y1="48%" x2="40%" y2="42%" stroke={P.green} strokeWidth="1" strokeDasharray="3,3" opacity="0.35" />
            </svg>
          </div>
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: P.green }}>6% off — 88 points!</span>
          </div>
        </>
      )}

      {phase === 2 && (
        <>
          <div style={{ fontSize: 10, textAlign: "center", color: P.textM, marginBottom: 6 }}>Round complete!</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: P.coral }}>438</div>
            <div style={{ fontSize: 12, color: P.textD, marginTop: 2 }}>out of 500 points</div>
            <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
              {[92, 88, 96, 84, 78].map((s, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: `${P.coral}10`, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: P.coral }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ═══ SCREEN 5: COLOUR CHAIN ═══
const ColourChainScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase(p => (p + 1) % 3), 2200);
    return () => clearInterval(t);
  }, []);

  const gridColors = [P.coral, P.blue, P.green, P.gold, P.accent, P.teal, P.orange, P.pink, "#636E72", P.coral, P.blue, P.green];

  return (
    <div style={{ padding: "32px 14px 12px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: P.pink }}>Colour Chain</span>
        <span style={{ fontSize: 9, color: P.textD }}>Round 4/6</span>
      </div>

      {phase === 0 && (
        <>
          <div style={{ fontSize: 10, textAlign: "center", color: P.textM, marginBottom: 6 }}>Memorise the colours!</div>
          <div style={{ height: 3, borderRadius: 2, background: "#E8E6E1", marginBottom: 8 }}>
            <div style={{ width: "60%", height: "100%", borderRadius: 2, background: P.pink }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5, padding: "0 4px" }}>
            {gridColors.map((c, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: 9, background: c }} />
            ))}
          </div>
        </>
      )}

      {phase === 1 && (
        <>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: P.textM, marginBottom: 6 }}>Where was this colour?</div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: P.gold, margin: "0 auto 4px", boxShadow: `0 2px 8px ${P.gold}30` }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: P.gold }}>Gold</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5, padding: "0 4px" }}>
            {gridColors.map((c, i) => {
              const revealed = i === 0 || i === 2 || i === 5;
              const correct = i === 0;
              const goldRevealed = i === 5;
              return (
                <div key={i} style={{
                  aspectRatio: "1", borderRadius: 9,
                  background: revealed ? c : "#E8E6E1",
                  borderWidth: correct ? 2 : goldRevealed ? 2 : 0,
                  borderStyle: "solid",
                  borderColor: correct ? P.green : goldRevealed ? P.gold : "transparent",
                }} />
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8 }}>
            {[P.green, P.green, P.coral, P.accent, "#E8E6E1", "#E8E6E1"].map((c, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: 3, background: c }} />
            ))}
          </div>
        </>
      )}

      {phase === 2 && (
        <>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 11, color: P.textD, marginBottom: 6 }}>Round complete!</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: P.pink }}>5/6</div>
            <div style={{ fontSize: 12, color: P.textD, marginTop: 2 }}>500 points</div>
            <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
              {["✓", "✓", "✗", "✓", "✓", "✓"].map((r, i) => (
                <div key={i} style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: r === "✓" ? `${P.green}15` : `${P.coral}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: r === "✓" ? P.green : P.coral,
                }}>{r}</div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const screens = [ClassicScreen, JourneyScreen, AchievementsScreen, SpeedRecallScreen, ColourChainScreen];

// ═══ MAIN HERO ═══
export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % 5), 5000);
    return () => clearInterval(t);
  }, []);

  const ActiveScreen = screens[activeIdx];

  return (
    <div style={{
      width: "100%", maxWidth: 1100, margin: "0 auto", padding: "60px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      gap: 60, minHeight: "90vh",
    }}>
      <style>{`
        @keyframes heroFadeIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes phoneFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes dotPulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.3); } }
      `}</style>

      {/* Left — text */}
      <div style={{ flex: 1, maxWidth: 480 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: `linear-gradient(135deg, ${P.accent}, ${P.accentL})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="22" height="14" viewBox="0 0 36 24">
              <path d="M2 12Q18 2 34 12Q18 22 2 12Z" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.2"/>
              <circle cx="18" cy="12" r="4" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: P.text }}>Blanked</span>
        </div>

        <h1 style={{ fontSize: 46, fontWeight: 800, color: P.text, lineHeight: 1.1, margin: "0 0 20px" }}>
          How much can<br/>you <span style={{ color: P.accent }}>remember</span>?
        </h1>

        <p style={{ fontSize: 17, color: P.textM, lineHeight: 1.6, margin: "0 0 32px" }}>
          Study the scene. It disappears. Answer from memory.
          6 game modes that start simple and get impossibly hard.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{
            padding: "14px 28px", borderRadius: 14, background: P.text, color: "white",
            display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
            fontSize: 15, fontWeight: 600,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83"/>
              <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/>
            </svg>
            Download
          </div>
          <span style={{ fontSize: 14, color: P.textD }}>Free to play</span>
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          {[
            { value: "380+", label: "Levels" },
            { value: "6", label: "Game modes" },
            { value: "30s", label: "Per round" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 28, fontWeight: 800, color: P.text }}>{s.value}</div>
              <div style={{ fontSize: 13, color: P.textD, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — phone */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ animation: "phoneFloat 6s infinite ease-in-out" }}>
          <PhoneFrame>
            <div key={activeIdx} style={{ height: "100%", animation: "heroFadeIn 0.6s ease-out" }}>
              <ActiveScreen />
            </div>
          </PhoneFrame>
        </div>

        {/* Mode label */}
        <div key={`lbl-${activeIdx}`} style={{ textAlign: "center", animation: "heroFadeIn 0.4s ease-out" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: modeLabels[activeIdx].color }}>
            {modeLabels[activeIdx].name}
          </div>
          <div style={{ fontSize: 12, color: P.textD, marginTop: 3 }}>
            {modeLabels[activeIdx].tagline}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {modeLabels.map((m, i) => (
            <div key={i} onClick={() => setActiveIdx(i)} style={{
              width: i === activeIdx ? 20 : 8, height: 8, borderRadius: 4,
              background: i === activeIdx ? m.color : "#E8E6E1",
              cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
