'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { COLORS } from '@/lib/constants';

const P = {
  ...COLORS,
  teal: "#00CEC9",
  orange: "#E17055",
  pink: "#FD79A8",
};

const modeLabels = [
  { name: "Classic Mode", tagline: "Memorise the scene. Answer from memory.", color: P.accent },
  { name: "6 Game Modes", tagline: "380+ levels across 6 unique campaigns.", color: P.green },
  { name: "Achievements", tagline: "Unlock badges. Earn gems. Track progress.", color: P.gold },
  { name: "Speed Recall", tagline: "Tap where each shape was on the canvas.", color: P.coral },
  { name: "Colour Chain", tagline: "Memorise the grid. Recall each colour.", color: P.pink },
];

// ═══ PHONE FRAME ═══
const PhoneFrame = ({ children }: { children: ReactNode }) => (
  <div style={{
    width: 270, height: 555, borderRadius: 38, background: "#1A1A18",
    padding: 7, position: "relative",
    boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1)",
  }}>
    <div style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", width: 85, height: 22, borderRadius: 11, background: "#1A1A18", zIndex: 10 }} />
    <div style={{ width: "100%", height: "100%", borderRadius: 32, background: P.bg, overflow: "hidden", position: "relative" }}>
      {children}
    </div>
    <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", width: 95, height: 4, borderRadius: 2, background: "#555" }} />
  </div>
);

// ═══ TAB BAR ═══
const TabBar = ({ activeIdx = 1 }: { activeIdx?: number }) => (
  <div style={{
    position: "absolute", bottom: 0, left: 0, right: 0,
    display: "flex", justifyContent: "space-around", alignItems: "center",
    padding: "5px 8px 16px", background: "white",
    borderTop: "1px solid rgba(0,0,0,0.04)",
  }}>
    {[
      <svg key="0" width="18" height="18" viewBox="0 0 24 24"><path d="M8,5 L19,12 L8,19Z" fill={activeIdx===0?P.accent:"#C8CDD0"}/></svg>,
      <svg key="1" width="18" height="18" viewBox="0 0 24 24"><path d="M3,7 L8.5,4 L15.5,7 L21,4 V18 L15.5,21 L8.5,18 L3,21Z" fill="none" stroke={activeIdx===1?P.accent:"#C8CDD0"} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
      <svg key="2" width="18" height="18" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5" fill="none" stroke={activeIdx===2?P.accent:"#C8CDD0"} strokeWidth="1.5"/><path d="M2,20 C2,15 5,13 9,13 C13,13 16,15 16,20" fill="none" stroke={activeIdx===2?P.accent:"#C8CDD0"} strokeWidth="1.5"/><circle cx="17" cy="9" r="2.5" fill="none" stroke={activeIdx===2?P.accent:"#C8CDD0"} strokeWidth="1.3"/></svg>,
      <svg key="3" width="18" height="18" viewBox="0 0 24 24"><polygon points="12,2 20,9 12,22 4,9" fill="none" stroke={activeIdx===3?P.accent:"#C8CDD0"} strokeWidth="1.5" strokeLinejoin="round"/><line x1="4" y1="9" x2="20" y2="9" stroke={activeIdx===3?P.accent:"#C8CDD0"} strokeWidth="1.2"/></svg>,
    ].map((icon, i) => (
      <div key={i} style={{ padding: "3px 10px", borderRadius: 8, background: i===activeIdx?`${P.accent}08`:"transparent" }}>{icon}</div>
    ))}
  </div>
);

// ═══ SCREEN 1: CLASSIC ═══
const ClassicScreen = () => {
  const [timerWidth, setTimerWidth] = useState(90);
  useEffect(() => {
    const t = setInterval(() => setTimerWidth(w => Math.max(3, w - 0.35)), 50);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ padding: "34px 14px 14px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: P.textD, fontWeight: 300 }}>✕</span>
        <div style={{ padding: "2px 10px", borderRadius: 8, background: `${P.green}10`, border: `1px solid ${P.green}18` }}>
          <span style={{ fontSize: 8, fontWeight: 700, color: P.green, letterSpacing: 0.5 }}>LEVEL 4</span>
        </div>
        <div style={{ width: 12 }} />
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "#E8E6E1", margin: "4px 0 8px" }}>
        <div style={{ width: `${timerWidth}%`, height: "100%", borderRadius: 2, background: timerWidth > 25 ? P.gold : P.coral, transition: "width 0.06s linear, background 0.3s" }} />
      </div>
      <div style={{ fontSize: 11, textAlign: "center", color: P.textM, marginBottom: 8, fontWeight: 500 }}>Memorise this scene!</div>
      <div style={{ width: "100%", aspectRatio: "1", background: "white", borderRadius: 14, position: "relative", boxShadow: "0 1px 8px rgba(0,0,0,0.03)" }}>
        <div style={{ position: "absolute", left: "14%", top: "14%", width: 38, height: 38, borderRadius: "50%", background: P.coral }} />
        <div style={{ position: "absolute", right: "14%", top: "13%", width: 38, height: 38, borderRadius: 8, background: P.blue }} />
        <div style={{ position: "absolute", left: "50%", top: "42%", transform: "translateX(-50%)", width: 36, height: 36, borderRadius: 8, background: P.accent }} />
        <svg style={{ position: "absolute", left: "12%", bottom: "12%" }} width="40" height="40" viewBox="0 0 100 100"><polygon points="50,8 95,88 5,88" fill={P.teal}/></svg>
        <div style={{ position: "absolute", right: "14%", bottom: "14%", width: 36, height: 36, borderRadius: "50%", background: P.gold }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <div style={{ padding: "5px 16px", borderRadius: 10, background: `${P.blue}06`, border: `1px solid ${P.blue}10`, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 9, color: P.textD }}>⏱</span>
          <span style={{ fontSize: 9, color: P.textD }}>+3s</span>
          <span style={{ fontSize: 9, color: P.blue }}>💎30</span>
        </div>
      </div>
    </div>
  );
};

// ═══ SCREEN 2: JOURNEY ═══
const JourneyScreen = () => {
  const [sel, setSel] = useState(0);
  useEffect(() => { const t = setInterval(() => setSel(m => (m+1)%6), 1800); return () => clearInterval(t); }, []);

  const c = [
    { l: "C", n: "Classic", ct: "200", col: P.accent },
    { l: "S", n: "Speed\nRecall", ct: "45", col: P.coral },
    { l: "S", n: "Snap\nMatch", ct: "45", col: P.blue },
    { l: "S", n: "Sequence", ct: "36", col: P.gold },
    { l: "C", n: "Counting\nBlitz", ct: "30", col: P.green },
    { l: "C", n: "Colour\nChain", ct: "24", col: P.pink },
  ];
  const info = [
    { t: "Classic", d: "Memorise the scene. Answer from memory.", s: "6 worlds · 200 levels" },
    { t: "Speed Recall", d: "Remember where shapes were.", s: "3 worlds · 45 levels" },
    { t: "Snap Match", d: "Two scenes. One change. Find it.", s: "3 worlds · 45 levels" },
    { t: "Sequence", d: "Shapes flash in order. Tap back.", s: "3 worlds · 36 levels" },
    { t: "Counting Blitz", d: "Shapes pop in and out. Count.", s: "2 worlds · 30 levels" },
    { t: "Colour Chain", d: "Memorise the grid colours.", s: "2 worlds · 24 levels" },
  ];
  const wn = ["Shape Basics","Foundations","Sharp Eyes","First Steps","Focus","Palette"];
  const wl = ["20","15","15","12","15","12"];

  return (
    <div style={{ padding: "34px 12px 50px", height: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: P.text }}>Journey</span>
        <div style={{ padding: "3px 9px", borderRadius: 10, background: `${P.gold}10` }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: P.gold }}>★ 479/1140</span>
        </div>
      </div>
      <div style={{ fontSize: 7, fontWeight: 700, color: P.textD, letterSpacing: 1.2, marginBottom: 5 }}>CAMPAIGNS</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5, marginBottom: 7 }}>
        {c.map((m, i) => (
          <div key={i} style={{
            padding: "8px 2px 6px", borderRadius: 10, textAlign: "center",
            background: i===sel ? `${m.col}08` : "white",
            border: i===sel ? `1.5px solid ${m.col}35` : "1.5px solid rgba(0,0,0,0.03)",
            transition: "all 0.35s ease",
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 10, margin: "0 auto 3px",
              background: m.col,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 800, color: "white",
            }}>{m.l}</div>
            <div style={{ fontSize: 7.5, fontWeight: 700, lineHeight: 1.15, color: i===sel ? m.col : P.text, whiteSpace: "pre-line" }}>{m.n}</div>
            <div style={{ fontSize: 6.5, color: P.textD, marginTop: 1 }}>{m.ct} levels</div>
          </div>
        ))}
      </div>
      {/* Description */}
      <div style={{ padding: "7px 10px", borderRadius: 9, background: `${c[sel].col}06`, border: `1px solid ${c[sel].col}12`, marginBottom: 6 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: c[sel].col }}>{info[sel].t}</div>
        <div style={{ fontSize: 7.5, color: P.textM, marginTop: 1 }}>{info[sel].d}</div>
        <div style={{ fontSize: 7, color: c[sel].col, fontWeight: 600, marginTop: 1 }}>{info[sel].s}</div>
      </div>
      {/* World card */}
      <div style={{ padding: "7px 10px", borderRadius: 10, background: "white", border: `1.5px solid ${c[sel].col}20` }}>
        <div style={{ padding: "1px 6px", borderRadius: 4, background: `${c[sel].col}10`, display: "inline-block", marginBottom: 2 }}>
          <span style={{ fontSize: 6, fontWeight: 700, color: c[sel].col, letterSpacing: 0.5 }}>WORLD 1</span>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: P.text }}>{wn[sel]}</div>
        <div style={{ fontSize: 7.5, color: P.textD }}>{wl[sel]} levels</div>
        <div style={{ height: 3, borderRadius: 2, background: "#E8E6E1", margin: "4px 0 2px" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 2, background: c[sel].col }} />
        </div>
        <div style={{ marginTop: 4, padding: "6px 0", borderRadius: 7, background: c[sel].col, textAlign: "center" }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "white" }}>Continue</span>
        </div>
      </div>
      <TabBar activeIdx={1} />
    </div>
  );
};

// ═══ SCREEN 3: ACHIEVEMENTS ═══
const AchievementsScreen = () => {
  const tc: Record<string, string> = { bronze: "#CD7F32", silver: "#9CA3A8", gold: "#D4A012", none: "#E8E6E1" };
  const badges = [
    { n: "World Traveller", d: "Complete all levels", t: "gold", p: "6/6", dots: [1,1,1] },
    { n: "Perfectionist", d: "3 stars every level", t: "silver", p: "3/3", dots: [1,1,0] },
    { n: "Level Grinder", d: "Complete levels", t: "bronze", p: "25/25", dots: [1,0,0] },
    { n: "Memory Master", d: "100% on dailies", t: "silver", p: "25/25", dots: [1,1,0] },
    { n: "Daily Devotee", d: "Complete dailies", t: "gold", p: "200/200", dots: [1,1,1] },
    { n: "Social Butterfly", d: "Challenge friends", t: "bronze", p: "5/5", dots: [1,0,0] },
    { n: "Champion", d: "Win challenges", t: "none", p: "3/5", dots: [0,0,0] },
    { n: "Popular", d: "Add friends", t: "bronze", p: "3/3", dots: [1,0,0] },
  ];
  const icons = [
    <svg key="0" width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M12,3 C12,3 8,8 8,12 C8,16 12,21 12,21" fill="none" stroke="currentColor" strokeWidth="1"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1"/></svg>,
    <svg key="1" width="15" height="15" viewBox="0 0 24 24"><polygon points="12,3 15,9 21,9 16,13 18,20 12,16 6,20 8,13 3,9 9,9" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="2" width="15" height="15" viewBox="0 0 24 24"><path d="M4,14 L12,6 L20,14" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M4,20 L12,12 L20,20" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="3" width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M12,12 L12,20 M8,16 L16,16" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="4" width="15" height="15" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1"/></svg>,
    <svg key="5" width="15" height="15" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M3,20 C3,15 6,13 9,13 C12,13 15,15 15,20" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="6" width="15" height="15" viewBox="0 0 24 24"><path d="M8,2 H16 V10 C16,13 14,15 12,15 C10,15 8,13 8,10Z" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="15" x2="12" y2="19" stroke="currentColor" strokeWidth="1.5"/><rect x="8" y="19" width="8" height="2" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>,
    <svg key="7" width="15" height="15" viewBox="0 0 24 24"><path d="M12,20 C12,20 4,14 4,8.5 C4,5.5 6.5,3 9,3 C10.5,3 11.5,4 12,5 C12.5,4 13.5,3 15,3 C17.5,3 20,5.5 20,8.5 C20,14 12,20 12,20Z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  ];
  const tierKeys = ["bronze", "silver", "gold"] as const;
  return (
    <div style={{ padding: "34px 10px 12px", height: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 12, color: P.textD }}>‹</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: P.text }}>Achievements</span>
        </div>
        <span style={{ fontSize: 9, fontWeight: 600, color: P.textD }}>27/39</span>
      </div>
      <div style={{ display: "flex", gap: 3, marginBottom: 7, flexWrap: "wrap" }}>
        {["All","Campaign","Daily","Social","Streak","Mastery"].map((f,i) => (
          <div key={f} style={{ padding: "2px 7px", borderRadius: 7, fontSize: 7, fontWeight: 600, background: i===0?P.green:"white", color: i===0?"white":P.textM, border: i===0?"none":"1px solid rgba(0,0,0,0.05)" }}>{f}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
        {badges.map((b,i) => {
          const col = b.t!=="none" ? tc[b.t] : "#CCC";
          return (
            <div key={i} style={{ padding: "7px 8px", borderRadius: 10, background: "white", border: b.t!=="none" ? `1.5px solid ${col}35` : "1.5px solid rgba(0,0,0,0.04)" }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, marginBottom: 3, background: b.t!=="none"?`${col}12`:"#F5F4F0", display: "flex", alignItems: "center", justifyContent: "center", color: col }}>{icons[i]}</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: P.text, marginBottom: 1 }}>{b.n}</div>
              <div style={{ fontSize: 6.5, color: P.textD, marginBottom: 3 }}>{b.d}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {b.dots.map((f,j) => (<div key={j} style={{ width: 6, height: 6, borderRadius: 3, background: f ? tc[tierKeys[j]] : "#E8E6E1" }} />))}
                </div>
                <span style={{ fontSize: 7, color: P.textD }}>{b.p}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══ SCREEN 4: SPEED RECALL ═══
const SpeedRecallScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => { const t = setInterval(() => setPhase(p => (p+1)%3), 2000); return () => clearInterval(t); }, []);
  return (
    <div style={{ padding: "34px 14px 14px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: P.coral }}>Speed Recall</span>
        <span style={{ fontSize: 9, color: P.textD }}>Round 3/5</span>
      </div>
      {phase===0 && (<>
        <div style={{ height: 4, borderRadius: 2, background: "#E8E6E1", marginBottom: 6 }}><div style={{ width: "65%", height: "100%", borderRadius: 2, background: P.coral }} /></div>
        <div style={{ fontSize: 10, textAlign: "center", color: P.textM, marginBottom: 6, fontWeight: 500 }}>Memorise the positions!</div>
        <div style={{ width: "100%", aspectRatio: "1", background: "white", borderRadius: 14, position: "relative", boxShadow: "0 1px 6px rgba(0,0,0,0.03)" }}>
          <div style={{ position: "absolute", left: "16%", top: "14%", width: 32, height: 32, borderRadius: "50%", background: P.coral }} />
          <div style={{ position: "absolute", right: "14%", top: "20%", width: 30, height: 30, borderRadius: 7, background: P.blue }} />
          <div style={{ position: "absolute", left: "42%", top: "40%", width: 28, height: 28, borderRadius: "50%", background: P.green }} />
          <div style={{ position: "absolute", left: "14%", bottom: "16%", width: 30, height: 30, borderRadius: 7, background: P.gold }} />
          <svg style={{ position: "absolute", right: "18%", bottom: "20%" }} width="30" height="30" viewBox="0 0 100 100"><polygon points="50,8 95,88 5,88" fill={P.accent}/></svg>
        </div>
      </>)}
      {phase===1 && (<>
        <div style={{ fontSize: 10, textAlign: "center", color: P.textM, marginBottom: 6, fontWeight: 500 }}>Where was the <span style={{ color: P.green, fontWeight: 700 }}>green circle</span>?</div>
        <div style={{ width: "100%", aspectRatio: "1", background: "white", borderRadius: 14, position: "relative", boxShadow: "0 1px 6px rgba(0,0,0,0.03)" }}>
          <div style={{ position: "absolute", left: "40%", top: "45%", width: 10, height: 10, borderRadius: 5, background: P.green, zIndex: 2 }} />
          <div style={{ position: "absolute", left: "38%", top: "36%", width: 28, height: 28, borderRadius: 14, border: `2px dashed ${P.green}60` }} />
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}><line x1="45%" y1="49%" x2="43%" y2="42%" stroke={P.green} strokeWidth="1.2" strokeDasharray="3,3" opacity="0.4" /></svg>
        </div>
        <div style={{ textAlign: "center", marginTop: 10 }}><span style={{ fontSize: 12, fontWeight: 700, color: P.green }}>6% off — 88 points!</span></div>
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 8 }}>
          {[{c:P.coral,s:92},{c:P.blue,s:96},{c:P.green,s:88},{c:P.gold,s:null},{c:P.accent,s:null}].map((x,i) => (
            <div key={i} style={{ width: 26, height: 26, borderRadius: 7, background: x.s!==null?`${x.c}15`:"#F0EFEB", display: "flex", alignItems: "center", justifyContent: "center", border: i===2?`1.5px solid ${x.c}40`:"none" }}>
              {x.s!==null && <span style={{ fontSize: 7, fontWeight: 700, color: x.c }}>{x.s}</span>}
            </div>
          ))}
        </div>
      </>)}
      {phase===2 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 11, color: P.textD, marginBottom: 8 }}>Round complete!</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: P.coral, lineHeight: 1 }}>438</div>
          <div style={{ fontSize: 12, color: P.textD, marginTop: 4 }}>out of 500 points</div>
          <div style={{ display: "flex", gap: 5, marginTop: 16 }}>
            {[92,96,88,84,78].map((s,i) => (
              <div key={i} style={{ width: 34, height: 34, borderRadius: 9, background: `${P.coral}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: P.coral }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ═══ SCREEN 5: COLOUR CHAIN ═══
const ColourChainScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => { const t = setInterval(() => setPhase(p => (p+1)%3), 2200); return () => clearInterval(t); }, []);
  const gc = [P.coral, P.blue, P.green, P.gold, P.accent, P.teal, P.orange, P.pink, "#636E72", P.coral, P.blue, P.green];
  return (
    <div style={{ padding: "34px 14px 14px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: P.pink }}>Colour Chain</span>
        <span style={{ fontSize: 9, color: P.textD }}>Round 4/6</span>
      </div>
      {phase===0 && (<>
        <div style={{ fontSize: 10, textAlign: "center", color: P.textM, marginBottom: 6, fontWeight: 500 }}>Memorise the colours!</div>
        <div style={{ height: 4, borderRadius: 2, background: "#E8E6E1", marginBottom: 8 }}><div style={{ width: "55%", height: "100%", borderRadius: 2, background: P.pink }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, padding: "0 6px" }}>
          {gc.map((c,i) => (<div key={i} style={{ aspectRatio: "1", borderRadius: 10, background: c }} />))}
        </div>
      </>)}
      {phase===1 && (<>
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <div style={{ fontSize: 10, color: P.textM, marginBottom: 5 }}>Where was this colour?</div>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: P.gold, margin: "0 auto 4px", boxShadow: `0 3px 10px ${P.gold}30` }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: P.gold }}>Gold</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, padding: "0 6px" }}>
          {gc.map((c,i) => {
            const r = i===0||i===2||i===5;
            return (<div key={i} style={{ aspectRatio: "1", borderRadius: 10, background: r?c:"#E8E6E1", borderWidth: i===0?2:i===5?2:0, borderStyle: "solid", borderColor: i===0?P.green:i===5?P.gold:"transparent", boxSizing: "border-box" }} />);
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 10 }}>
          {[P.green,P.green,P.coral,P.accent,"#E8E6E1","#E8E6E1"].map((c,i) => (<div key={i} style={{ width: 7, height: 7, borderRadius: 4, background: c }} />))}
        </div>
      </>)}
      {phase===2 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 11, color: P.textD, marginBottom: 8 }}>Round complete!</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: P.pink, lineHeight: 1 }}>5/6</div>
          <div style={{ fontSize: 12, color: P.textD, marginTop: 4 }}>500 points</div>
          <div style={{ display: "flex", gap: 5, marginTop: 16 }}>
            {["\u2713","\u2713","\u2717","\u2713","\u2713","\u2713"].map((r,i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: 7, background: r==="\u2713"?`${P.green}12`:`${P.coral}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: r==="\u2713"?P.green:P.coral }}>{r}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const screens = [ClassicScreen, JourneyScreen, AchievementsScreen, SpeedRecallScreen, ColourChainScreen];

// ═══ MAIN COMPONENT ═══
export default function PhoneMockup() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const goTo = useCallback((idx: number) => {
    setActiveIdx(idx);
    setFadeKey(k => k + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => goTo((activeIdx + 1) % 5), 5000);
    return () => clearInterval(t);
  }, [activeIdx, goTo]);

  const ActiveScreen = screens[activeIdx];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div className="phone-bob">
        <PhoneFrame>
          <div key={fadeKey} style={{ height: "100%", animation: "screenFadeIn 0.6s ease-out" }}><ActiveScreen /></div>
        </PhoneFrame>
      </div>
      <div key={`lbl-${fadeKey}`} style={{ textAlign: "center", animation: "screenFadeIn 0.4s ease-out" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: modeLabels[activeIdx].color }}>{modeLabels[activeIdx].name}</div>
        <div style={{ fontSize: 12, color: P.textD, marginTop: 3 }}>{modeLabels[activeIdx].tagline}</div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {modeLabels.map((m,i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${m.name}`}
            style={{ width: i===activeIdx?20:8, height: 8, borderRadius: 4, background: i===activeIdx?m.color:"#E8E6E1", cursor: "pointer", transition: "all 0.3s", border: "none", padding: 0 }}
          />
        ))}
      </div>
    </div>
  );
}
