'use client';

import { useState, useEffect, useCallback } from 'react';
import { COLORS } from '@/lib/constants';

const P = COLORS;
const PINK = "#E84393";

/* ── Screen data ──────────────────────────────────────── */

const screens = [
  { label: "Classic Mode", tagline: "Memorise the scene. Answer from memory.", color: P.accent },
  { label: "6 Game Modes", tagline: "380+ levels across 6 unique campaigns.", color: P.green },
  { label: "Achievements", tagline: "Unlock badges. Earn gems. Track your progress.", color: P.gold },
  { label: "Speed Recall", tagline: "Tap where each shape was on the canvas.", color: P.coral },
  { label: "Colour Chain", tagline: "Memorise the grid. Recall each colour.", color: PINK },
];

/* ── Screen 1: Classic ────────────────────────────────── */

function ClassicScreen() {
  const [timer, setTimer] = useState(45);
  useEffect(() => {
    const iv = setInterval(() => {
      setTimer(prev => prev <= 5 ? 45 : prev - 1.2);
    }, 60);
    return () => clearInterval(iv);
  }, []);
  const pct = (timer / 45) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: P.textD, cursor: "pointer" }}>✕</span>
        <span style={{ fontSize: 8, fontWeight: 700, color: P.green, background: `${P.green}12`, padding: "2px 8px", borderRadius: 6, letterSpacing: 0.5 }}>LEVEL 4</span>
        <div style={{ width: 11 }} />
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "#EEEDE8", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 2, background: pct > 25 ? P.gold : P.coral, transition: "background 0.3s" }} />
      </div>
      <div style={{ fontSize: 11, color: P.textD, textAlign: "center", fontWeight: 500 }}>Memorise this scene!</div>
      <div style={{ flex: 1, aspectRatio: "1/1", background: "white", borderRadius: 14, position: "relative", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden", maxHeight: 200 }}>
        <div style={{ position: "absolute", left: "14%", top: "14%", width: 36, height: 36, borderRadius: "50%", background: P.coral }} />
        <div style={{ position: "absolute", right: "14%", top: "14%", width: 36, height: 36, borderRadius: 8, background: P.blue }} />
        <div style={{ position: "absolute", left: "50%", top: "42%", transform: "translateX(-50%)", width: 34, height: 34, borderRadius: 6, background: P.accent }} />
        <svg style={{ position: "absolute", left: "12%", bottom: "14%", width: 38, height: 38 }} viewBox="0 0 100 100"><polygon points="50,8 92,88 8,88" fill="#00B894" /></svg>
        <div style={{ position: "absolute", right: "14%", bottom: "16%", width: 34, height: 34, borderRadius: "50%", background: P.gold }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span style={{ fontSize: 9, color: P.blue, background: `${P.blue}10`, padding: "3px 10px", borderRadius: 8, fontWeight: 600 }}>⏱ +3s 💎30</span>
      </div>
    </div>
  );
}

/* ── Screen 2: Journey ────────────────────────────────── */

const campaigns = [
  { letter: "C", name: "Classic", levels: "200", color: P.accent },
  { letter: "S", name: "Speed Recall", levels: "45", color: P.coral },
  { letter: "S", name: "Snap Match", levels: "45", color: P.blue },
  { letter: "S", name: "Sequence", levels: "36", color: P.gold },
  { letter: "C", name: "Counting", levels: "30", color: P.green },
  { letter: "C", name: "Colour Chain", levels: "24", color: PINK },
];

function JourneyScreen() {
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setSelected(p => (p + 1) % 6), 1800);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 5 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: P.text }}>Journey</span>
        <span style={{ fontSize: 8, fontWeight: 700, color: P.gold, background: `${P.gold}12`, padding: "2px 8px", borderRadius: 8 }}>⭐ 479/1140</span>
      </div>
      <div style={{ fontSize: 8, fontWeight: 700, color: P.textD, letterSpacing: 1 }}>CAMPAIGNS</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
        {campaigns.map((c, i) => (
          <div key={i} style={{
            padding: "6px 4px", borderRadius: 8, textAlign: "center",
            background: i === selected ? `${c.color}08` : "white",
            border: i === selected ? `1.5px solid ${c.color}` : "1.5px solid #F0EFE9",
            transform: i === selected ? "scale(1.04)" : "scale(1)",
            transition: "all 0.3s"
          }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: c.color, color: "white", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 3px" }}>{c.letter}</div>
            <div style={{ fontSize: 7, fontWeight: 700, color: P.text, lineHeight: 1.2 }}>{c.name}</div>
            <div style={{ fontSize: 6, color: P.textD }}>{c.levels} levels</div>
          </div>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 10, padding: "7px 8px", border: "1px solid #F0EFE9" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 8, fontWeight: 700, color: P.text }}>World 1 — Shape Basics</span>
          <span style={{ fontSize: 7, color: P.green, fontWeight: 700 }}>20/20</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: "#EEEDE8", marginBottom: 5 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 2, background: P.green }} />
        </div>
        <div style={{ background: P.green, color: "white", fontSize: 8, fontWeight: 700, textAlign: "center", padding: "4px 0", borderRadius: 6 }}>Continue</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", borderTop: "1px solid #F0EFE9", paddingTop: 5 }}>
        {["🏠", "🗺️", "👤", "⚙️"].map((icon, i) => (
          <span key={i} style={{ fontSize: 12, opacity: i === 1 ? 1 : 0.35 }}>{icon}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Screen 3: Achievements ───────────────────────────── */

const BRONZE = "#CD7F32", SILVER = "#B2BEC3", GOLD = "#D4A012";
const achievements = [
  { icon: "🌍", name: "World Traveller", desc: "Complete all worlds", tier: 3, count: "6/6" },
  { icon: "⭐", name: "Perfectionist", desc: "Get 3 stars on levels", tier: 2, count: "3/3" },
  { icon: "🎮", name: "Level Grinder", desc: "Complete 25 levels", tier: 1, count: "25/25" },
  { icon: "🧠", name: "Memory Master", desc: "Score 100% accuracy", tier: 2, count: "25/25" },
  { icon: "📅", name: "Daily Devotee", desc: "Play 200 daily rounds", tier: 3, count: "200/200" },
  { icon: "👥", name: "Social Butterfly", desc: "Challenge 5 friends", tier: 1, count: "5/5" },
  { icon: "🏆", name: "Champion", desc: "Win 5 challenges", tier: 0, count: "3/5" },
  { icon: "💬", name: "Popular", desc: "Get 3 friend requests", tier: 1, count: "3/3" },
];
const tierColors = [null, BRONZE, SILVER, GOLD];

function AchievementsScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: P.textD }}>←</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: P.text }}>Achievements</span>
        <span style={{ fontSize: 9, color: P.textD, fontWeight: 600 }}>27/39</span>
      </div>
      <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
        {["All", "Campaign", "Daily", "Social", "Streak"].map((f, i) => (
          <span key={i} style={{
            fontSize: 7, fontWeight: 700, padding: "3px 7px", borderRadius: 8, whiteSpace: "nowrap",
            background: i === 0 ? P.green : "white", color: i === 0 ? "white" : P.textD,
            border: i === 0 ? "none" : "1px solid #EEEDE8"
          }}>{f}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, flex: 1, overflow: "hidden" }}>
        {achievements.map((a, i) => (
          <div key={i} style={{ background: "white", borderRadius: 8, padding: "5px 5px 4px", border: "1px solid #F0EFE9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
              <span style={{ fontSize: 12 }}>{a.icon}</span>
              <div>
                <div style={{ fontSize: 7, fontWeight: 700, color: P.text, lineHeight: 1.2 }}>{a.name}</div>
                <div style={{ fontSize: 6, color: P.textD, lineHeight: 1.2 }}>{a.desc}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3].map(t => (
                  <div key={t} style={{ width: 5, height: 5, borderRadius: "50%", background: a.tier >= t ? (tierColors[t] || "#E8E6E1") : "#E8E6E1" }} />
                ))}
              </div>
              <span style={{ fontSize: 6, color: P.textD, fontWeight: 600 }}>{a.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Screen 4: Speed Recall ───────────────────────────── */

function SpeedRecallScreen() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setPhase(p => (p + 1) % 3), 2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 6 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: P.textD, textAlign: "center" }}>
        {phase === 0 ? "Memorise the positions!" : phase === 1 ? <span style={{ color: P.green }}>Where was the green circle?</span> : "Round complete!"}
      </div>
      <div style={{ flex: 1, aspectRatio: "1/1", background: "white", borderRadius: 14, position: "relative", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden", maxHeight: 200 }}>
        {phase === 0 && <>
          <div style={{ position: "absolute", left: "18%", top: "20%", width: 28, height: 28, borderRadius: "50%", background: P.coral }} />
          <div style={{ position: "absolute", right: "20%", top: "15%", width: 26, height: 26, borderRadius: 5, background: P.blue }} />
          <div style={{ position: "absolute", left: "45%", top: "50%", width: 24, height: 24, borderRadius: "50%", background: P.green }} />
          <div style={{ position: "absolute", left: "15%", bottom: "20%", width: 24, height: 24, borderRadius: 5, background: P.gold }} />
          <svg style={{ position: "absolute", right: "18%", bottom: "22%", width: 28, height: 28 }} viewBox="0 0 100 100"><polygon points="50,8 92,88 8,88" fill={P.accent} /></svg>
        </>}
        {phase === 1 && <>
          <div style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%,-50%)", width: 16, height: 16, borderRadius: "50%", background: P.green, opacity: 0.7 }} />
          <div style={{ position: "absolute", left: "45%", top: "50%", transform: "translate(-50%,-50%)", width: 30, height: 30, borderRadius: "50%", border: `2px dashed ${P.green}` }} />
        </>}
        {phase === 2 && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: P.coral }}>438</div>
            <div style={{ fontSize: 10, color: P.textD }}>out of 500 points</div>
          </div>
        )}
      </div>
      {phase === 1 && <div style={{ fontSize: 9, color: P.green, fontWeight: 600, textAlign: "center" }}>6% off — 88 points!</div>}
      {phase === 2 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
          {[92, 88, 96, 84, 78].map((s, i) => (
            <div key={i} style={{ width: 32, padding: "3px 0", borderRadius: 6, background: `${P.coral}10`, textAlign: "center", fontSize: 8, fontWeight: 700, color: P.coral }}>{s}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Screen 5: Colour Chain ───────────────────────────── */

const gridColors = ["#FF6B6B", "#0984E3", "#00B894", "#D4A012", "#6C5CE7", "#E84393", "#FF6B6B", "#0984E3", "#00B894", "#D4A012", "#6C5CE7", "#E84393"];

function ColourChainScreen() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setPhase(p => (p + 1) % 3), 2200);
    return () => clearInterval(iv);
  }, []);
  const timerPct = 60;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 6 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: P.textD, textAlign: "center" }}>
        {phase === 0 ? "Memorise the colours!" : phase === 1 ? <span style={{ color: P.gold }}>Where was Gold?</span> : "Round complete!"}
      </div>
      {phase === 0 && (
        <>
          <div style={{ height: 4, borderRadius: 2, background: "#EEEDE8", overflow: "hidden" }}>
            <div style={{ width: `${timerPct}%`, height: "100%", borderRadius: 2, background: PINK }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, flex: 1 }}>
            {gridColors.map((c, i) => (
              <div key={i} style={{ background: c, borderRadius: 6, minHeight: 24 }} />
            ))}
          </div>
        </>
      )}
      {phase === 1 && (
        <>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: P.gold, margin: "0 auto", boxShadow: `0 2px 8px ${P.gold}30` }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, flex: 1 }}>
            {gridColors.map((_, i) => {
              const revealed = [2, 5, 9];
              const isRevealed = revealed.includes(i);
              const isCurrent = i === 9;
              return (
                <div key={i} style={{
                  background: isRevealed ? `${P.green}10` : "#F5F4F0",
                  borderRadius: 6, minHeight: 24,
                  border: isCurrent ? `2px solid ${P.gold}` : isRevealed ? `2px solid ${P.green}` : "2px solid transparent"
                }} />
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 3 }}>
            {[P.green, P.green, P.coral, P.accent, "#E8E6E1", "#E8E6E1"].map((c, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
            ))}
          </div>
        </>
      )}
      {phase === 2 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: PINK }}>5/6</div>
          <div style={{ fontSize: 10, color: P.textD }}>500 points</div>
          <div style={{ display: "flex", gap: 4 }}>
            {["✓", "✓", "✗", "✓", "✓", "✓"].map((r, i) => (
              <div key={i} style={{ width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, background: r === "✓" ? `${P.green}12` : `${P.coral}12`, color: r === "✓" ? P.green : P.coral }}>{r}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main component ───────────────────────────────────── */

const screenComponents = [ClassicScreen, JourneyScreen, AchievementsScreen, SpeedRecallScreen, ColourChainScreen];

export default function PhoneMockup() {
  const [active, setActive] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setFadeKey(k => k + 1);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => goTo((active + 1) % 5), 5000);
    return () => clearInterval(iv);
  }, [active, goTo]);

  const ActiveScreen = screenComponents[active];
  const s = screens[active];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      {/* Phone frame */}
      <div style={{ position: "relative", width: 260, height: 530 }}>
        {/* Physical buttons */}
        <div style={{ position: "absolute", left: -3, top: 100, width: 3, height: 28, borderRadius: 1.5, background: "#2D2D2D" }} />
        <div style={{ position: "absolute", left: -3, top: 140, width: 3, height: 42, borderRadius: 1.5, background: "#2D2D2D" }} />
        <div style={{ position: "absolute", left: -3, top: 190, width: 3, height: 42, borderRadius: 1.5, background: "#2D2D2D" }} />
        <div style={{ position: "absolute", right: -3, top: 155, width: 3, height: 50, borderRadius: 1.5, background: "#2D2D2D" }} />

        <div style={{
          width: 260, height: 530, borderRadius: 36, background: "#1A1A18", padding: 7,
          boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1)",
          position: "relative", overflow: "hidden"
        }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 30, background: "#FAFAF7", overflow: "hidden", position: "relative" }}>
            {/* Notch */}
            <div style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", width: 80, height: 22, borderRadius: 11, background: "#1A1A18", zIndex: 10 }} />

            {/* Screen content with fade transition */}
            <div key={fadeKey} style={{
              position: "absolute", inset: 0, padding: "32px 12px 18px",
              animation: "screenFadeIn 0.6s ease-out"
            }}>
              <ActiveScreen />
            </div>

            {/* Home indicator */}
            <div style={{ position: "absolute", bottom: 5, left: "50%", transform: "translateX(-50%)", width: 90, height: 4, borderRadius: 2, background: "#D0CEC8" }} />
          </div>
        </div>
      </div>

      {/* Label + tagline */}
      <div key={`label-${fadeKey}`} style={{ textAlign: "center", animation: "screenFadeIn 0.4s ease-out" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.label}</div>
        <div style={{ fontSize: 12, color: P.textD, marginTop: 2 }}>{s.tagline}</div>
      </div>

      {/* Navigation dots */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {screens.map((sc, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${sc.label}`}
            style={{
              width: i === active ? 20 : 8, height: 8,
              borderRadius: 4, border: "none", cursor: "pointer",
              background: i === active ? sc.color : "#E8E6E1",
              transition: "all 0.3s", padding: 0
            }}
          />
        ))}
      </div>
    </div>
  );
}
