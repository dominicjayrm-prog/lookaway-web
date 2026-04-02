import { useState, useEffect } from "react";

const P = {
  bg: "#FAFAF7", card: "#FFFFFF", accent: "#6C5CE7", accentL: "#A29BFE",
  green: "#00B894", coral: "#FF6B6B", gold: "#D4A012", blue: "#0984E3",
  text: "#1A1A18", textM: "#555555", textD: "#999999",
};

const Logo = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6C5CE7"/><stop offset="100%" stopColor="#A29BFE"/></linearGradient></defs>
    <rect width="64" height="64" rx="16" fill="url(#lg)"/>
    <g transform="translate(14,20)"><path d="M2 12Q18 0 34 12Q18 24 2 12Z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5"/><circle cx="18" cy="12" r="6" fill="white"/><circle cx="18" cy="12" r="3" fill="#6C5CE7"/></g>
  </svg>
);

// Hero shapes — more visible, varied animations with rotation and scale
const HeroShape = ({ type, color, size, x, y, delay, duration, rotateRange }) => {
  const animName = `hs_${type}_${delay}`.replace(/\./g, '_');
  const keyframes = `
    @keyframes ${animName}_in { from { opacity:0; transform:scale(0.3) rotate(-30deg); } to { opacity:1; transform:scale(1) rotate(0deg); } }
    @keyframes ${animName}_float {
      0% { transform: translateY(0) rotate(0deg) scale(1); }
      33% { transform: translateY(${-4 - Math.random()*8}px) rotate(${rotateRange/2}deg) scale(${0.97 + Math.random()*0.06}); }
      66% { transform: translateY(${2 + Math.random()*4}px) rotate(${-rotateRange/3}deg) scale(${1.0 + Math.random()*0.04}); }
      100% { transform: translateY(0) rotate(0deg) scale(1); }
    }
  `;
  const s = {
    position: "absolute", left: x, top: y, width: size, height: size, opacity: 0, pointerEvents: "none",
    animation: `${animName}_in 0.8s ${delay}s forwards ease-out, ${animName}_float ${duration}s ${delay + 0.8}s infinite ease-in-out`,
  };

  return (
    <>
      <style>{keyframes}</style>
      {type === "circle" && <div style={{ ...s, borderRadius: "50%", background: color }} />}
      {type === "square" && <div style={{ ...s, borderRadius: size * 0.18, background: color }} />}
      {type === "triangle" && <svg style={s} viewBox="0 0 100 100"><polygon points="50,8 92,88 8,88" fill={color}/></svg>}
      {type === "star" && <svg style={s} viewBox="0 0 100 100"><polygon points="50,5 63,35 95,35 69,57 79,90 50,70 21,90 31,57 5,35 37,35" fill={color}/></svg>}
      {type === "diamond" && <svg style={s} viewBox="0 0 100 100"><polygon points="50,5 95,50 50,95 5,50" fill={color}/></svg>}
      {type === "hexagon" && <svg style={s} viewBox="0 0 100 100"><polygon points="50,3 93,25 93,75 50,97 7,75 7,25" fill={color}/></svg>}
    </>
  );
};

// Phone mockup with animated gameplay
const PhoneMockup = () => {
  const [phase, setPhase] = useState("scene");
  const [timer, setTimer] = useState(100);
  useEffect(() => {
    let ts = [];
    const loop = () => {
      setPhase("scene"); setTimer(100);
      ts.push(setTimeout(() => setTimer(60), 500));
      ts.push(setTimeout(() => setTimer(20), 1500));
      ts.push(setTimeout(() => { setPhase("fade"); setTimer(0); }, 2500));
      ts.push(setTimeout(() => setPhase("question"), 3200));
      ts.push(setTimeout(() => setPhase("correct"), 4500));
      ts.push(setTimeout(loop, 6500));
    };
    loop();
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ width: 230, height: 460, borderRadius: 36, background: "#FAFAF7", border: "3px solid #E0DDD6", position: "relative", overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.1), 0 10px 25px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02)" }}>
      <div style={{ width: 70, height: 6, borderRadius: 3, background: "#E0DDD6", margin: "10px auto 0" }} />
      <div style={{ padding: "14px 16px", height: "calc(100% - 22px)", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 8, color: P.textD, fontWeight: 700, letterSpacing: 0.5 }}>LEVEL 4</span>
          <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: 3, background: i<=3 ? P.green : "#E8E6E1" }} />)}</div>
        </div>
        <div style={{ height: 3, borderRadius: 1.5, background: "#EEEDE8", marginBottom: 10, overflow: "hidden" }}>
          <div style={{ width: `${timer}%`, height: "100%", borderRadius: 1.5, background: timer > 40 ? P.accent : timer > 15 ? P.gold : P.coral, transition: "width 1s linear, background 0.3s" }} />
        </div>
        <div style={{ flex: 1, borderRadius: 16, background: "white", border: "1px solid rgba(0,0,0,0.04)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {(phase === "scene" || phase === "fade") && (
            <div style={{ position: "absolute", inset: 0, opacity: phase === "fade" ? 0 : 1, transition: "opacity 0.6s" }}>
              <div style={{ position: "absolute", left: "18%", top: "16%", width: 30, height: 30, borderRadius: "50%", background: P.coral }} />
              <div style={{ position: "absolute", right: "20%", top: "28%", width: 26, height: 26, borderRadius: 5, background: P.blue }} />
              <div style={{ position: "absolute", left: "42%", bottom: "20%" }}><svg viewBox="0 0 100 100" width="26" height="26"><polygon points="50,8 92,88 8,88" fill={P.green}/></svg></div>
              <div style={{ position: "absolute", right: "16%", bottom: "35%", width: 22, height: 22, borderRadius: "50%", background: P.gold }} />
              <div style={{ position: "absolute", left: "15%", bottom: "42%" }}><svg viewBox="0 0 100 100" width="20" height="20"><polygon points="50,5 63,35 95,35 69,57 79,90 50,70 21,90 31,57 5,35 37,35" fill={P.accent}/></svg></div>
            </div>
          )}
          {(phase === "question" || phase === "correct") && (
            <div style={{ padding: "12px 14px", width: "100%" }}>
              <div style={{ fontSize: 7, color: P.textD, fontWeight: 700, marginBottom: 4, letterSpacing: 0.3 }}>QUESTION 1 OF 5</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: P.text, marginBottom: 10 }}>How many red shapes?</div>
              {["1","2","3","4"].map((opt,i) => (
                <div key={i} style={{ padding: "7px 0", borderRadius: 7, textAlign: "center", marginBottom: 4, fontSize: 9, fontWeight: 600, background: phase==="correct" && i===0 ? `${P.green}12` : "#F5F4F0", color: phase==="correct" && i===0 ? P.green : P.textM, border: phase==="correct" && i===0 ? `1.5px solid ${P.green}` : "1.5px solid transparent", transition: "all 0.3s" }}>{opt}{phase==="correct" && i===0 ? " ✓" : ""}</div>
              ))}
            </div>
          )}
          {phase === "fade" && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(250,250,247,0.88)", backdropFilter: "blur(2px)" }}><span style={{ fontSize: 9, fontWeight: 700, color: P.accent }}>Scene disappeared!</span></div>}
        </div>
      </div>
    </div>
  );
};

const WorldCard = ({ number, name, desc, objects, color, hint }) => (
  <div style={{ minWidth: 210, padding: "20px 22px", borderRadius: 18, background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.03)", flexShrink: 0 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <div style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 8, background: `${color}10` }}><span style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 0.5 }}>WORLD {number}</span></div>
      <div style={{ fontSize: 16 }}>{hint}</div>
    </div>
    <div style={{ fontSize: 16, fontWeight: 700, color: P.text, marginBottom: 4 }}>{name}</div>
    <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.4, marginBottom: 10 }}>{desc}</div>
    <div style={{ fontSize: 11, color: P.textM, fontWeight: 600 }}>{objects}</div>
  </div>
);

export default function LandingPage() {
  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", background: P.bg, minHeight: "100vh", overflow: "hidden" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes phoneBob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        .fu { opacity:0; animation: fadeUp 0.8s forwards; }
        .fu1 { animation-delay:0.1s; } .fu2 { animation-delay:0.2s; } .fu3 { animation-delay:0.35s; } .fu4 { animation-delay:0.5s; }
      `}</style>

      {/* NAV */}
      <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={36} />
          <span style={{ fontSize: 18, fontWeight: 800, color: P.text }}>Look<span style={{ color: P.accent }}>Away</span></span>
        </div>
        <div style={{ padding: "9px 20px", borderRadius: 10, background: P.text, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 814 1000"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.4-155.5-127.4C46.7 769.2 0 626.8 0 googol 0 252.7 163.8 382 293.5 382c64.2 0 117.8 42.1 158.1 42.1 36.9 0 94.2-44.6 168.1-44.6 27.1 0 124.5 2.3 188.4 88.4z" fill="white" transform="scale(0.017) translate(0,50)"/></svg>
          Download
        </div>
      </div>

      {/* HERO */}
      <div style={{ padding: "50px 24px 70px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 56, flexWrap: "wrap" }}>
        {/* Animated background shapes — more visible, varied, mesmerising */}
        <div style={{ position: "absolute", inset: -40, overflow: "hidden", pointerEvents: "none" }}>
          {/* Large background layer */}
          <HeroShape type="circle" color={`${P.coral}18`} size={65} x="2%" y="8%" delay={0} duration={7} rotateRange={8} />
          <HeroShape type="hexagon" color={`${P.accent}12`} size={80} x="78%" y="5%" delay={0.3} duration={9} rotateRange={12} />
          <HeroShape type="diamond" color={`${P.blue}10`} size={55} x="85%" y="60%" delay={0.5} duration={8} rotateRange={15} />
          <HeroShape type="square" color={`${P.green}14`} size={50} x="0%" y="70%" delay={0.7} duration={7.5} rotateRange={10} />

          {/* Medium foreground layer */}
          <HeroShape type="star" color={`${P.gold}20`} size={36} x="90%" y="35%" delay={0.2} duration={6} rotateRange={20} />
          <HeroShape type="triangle" color={`${P.green}18`} size={32} x="6%" y="42%" delay={0.4} duration={6.5} rotateRange={18} />
          <HeroShape type="circle" color={`${P.accentL}15`} size={28} x="72%" y="78%" delay={0.6} duration={5.5} rotateRange={0} />
          <HeroShape type="square" color={`${P.coral}14`} size={24} x="15%" y="85%" delay={0.9} duration={7} rotateRange={25} />

          {/* Small sparkle layer */}
          <HeroShape type="circle" color={`${P.accent}22`} size={14} x="20%" y="18%" delay={0.1} duration={5} rotateRange={0} />
          <HeroShape type="circle" color={`${P.green}20`} size={12} x="65%" y="12%" delay={0.8} duration={4.5} rotateRange={0} />
          <HeroShape type="diamond" color={`${P.gold}22`} size={16} x="88%" y="82%" delay={0.3} duration={5.5} rotateRange={30} />
          <HeroShape type="star" color={`${P.coral}18`} size={18} x="8%" y="60%" delay={1.0} duration={6} rotateRange={25} />
          <HeroShape type="triangle" color={`${P.accent}16`} size={14} x="55%" y="88%" delay={0.5} duration={5} rotateRange={20} />
          <HeroShape type="circle" color={`${P.blue}18`} size={10} x="40%" y="5%" delay={1.2} duration={4} rotateRange={0} />
        </div>

        <div style={{ maxWidth: 420, position: "relative", zIndex: 1 }}>
          <div className="fu" style={{ fontSize: 46, fontWeight: 800, color: P.text, lineHeight: 1.12, letterSpacing: -1.5 }}>
            How much can<br/>you <span style={{ color: P.accent }}>remember</span>?
          </div>
          <div className="fu fu1" style={{ fontSize: 17, color: P.textM, lineHeight: 1.65, marginTop: 18, maxWidth: 370 }}>
            Study the scene. Look away. Answer from memory. A visual memory game that starts simple and gets impossibly hard.
          </div>

          {/* App Store button */}
          <div className="fu fu2" style={{ display: "flex", gap: 12, marginTop: 28, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ padding: "12px 22px", borderRadius: 12, background: P.text, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: 10 }}>
              {/* Proper Apple logo */}
              <svg width="20" height="24" viewBox="0 0 170 200" fill="white">
                <path d="M150.4 172.2c-8.2 18.8-12.1 27.2-22.7 43.7-14.7 23-35.5 51.6-61.2 51.9-22.8.3-28.7-14.8-59.7-14.6-31 .2-37.5 15-60.3 14.7C21 267.6 1.2 241.6-12.5 218.6c-36.2-60.8-40-132.2-17.7-170.1 15.9-27 41-42.8 64.6-42.8 27.3 0 44.5 14.9 67.1 14.9 21.9 0 35.2-14.9 66.8-14.9 21 0 43.6 11.4 59.5 31.1C187.3 62.1 174 111.4 150.4 172.2zM101.3-25.4c11.2-14.4 19.7-34.7 16.6-55.4-18.3 1.2-39.7 12.9-52.2 28.1-11.4 13.7-20.8 34.1-17.1 53.9 20 .6 40.7-11.3 52.7-26.6z" transform="translate(30,80) scale(0.7)"/>
              </svg>
              <div>
                <div style={{ fontSize: 9, fontWeight: 500, opacity: 0.8, lineHeight: 1 }}>Download on the</div>
                <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>App Store</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: P.textD }}>Free to play</div>
          </div>

          <div className="fu fu3" style={{ display: "flex", gap: 28, marginTop: 32 }}>
            {[{ num: "200+", label: "Levels" }, { num: "6", label: "Worlds" }, { num: "30s", label: "Per round" }].map((s,i) => (
              <div key={i}><div style={{ fontSize: 24, fontWeight: 800, color: P.text }}>{s.num}</div><div style={{ fontSize: 12, color: P.textD, fontWeight: 500, marginTop: 2 }}>{s.label}</div></div>
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
            { step:"1", title:"Memorise", desc:"A scene appears with coloured shapes, objects, and numbers. You have a few seconds to take it all in.", color:P.accent, icon:<svg width="34" height="24" viewBox="0 0 36 24"><path d="M2 12Q18 0 34 12Q18 24 2 12Z" fill={`${P.accent}12`} stroke={P.accent} strokeWidth="1.5"/><circle cx="18" cy="12" r="5" fill={P.accent}/><circle cx="18" cy="12" r="2.5" fill="white"/></svg> },
            { step:"2", title:"Look Away", desc:"The scene vanishes completely. Everything disappears. Now it's just you and your memory.", color:P.coral, icon:<svg width="34" height="24" viewBox="0 0 36 24"><path d="M2 14 Q18 14 34 14" stroke={P.coral} strokeWidth="2.5" strokeLinecap="round" fill="none"/><line x1="11" y1="16" x2="8" y2="22" stroke={P.coral} strokeWidth="1.8" strokeLinecap="round"/><line x1="18" y1="16" x2="18" y2="23" stroke={P.coral} strokeWidth="1.8" strokeLinecap="round"/><line x1="25" y1="16" x2="28" y2="22" stroke={P.coral} strokeWidth="1.8" strokeLinecap="round"/></svg> },
            { step:"3", title:"Answer", desc:"Five questions test what you saw. Colours, positions, counts. How much did you really remember?", color:P.green, icon:<svg width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill={`${P.green}12`} stroke={P.green} strokeWidth="1.5"/><text x="12" y="16" textAnchor="middle" fill={P.green} fontSize="13" fontWeight="700">?</text></svg> },
          ].map((item,i) => (
            <div key={i} style={{ flex: "1 1 240px", maxWidth: 280, padding: "30px 26px", borderRadius: 22, background: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.04)", textAlign: "center" }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: `${item.color}06`, border: `1.5px solid ${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>{item.icon}</div>
              <div style={{ display: "inline-flex", padding: "2px 10px", borderRadius: 6, background: `${item.color}08`, marginBottom: 10 }}><span style={{ fontSize: 10, fontWeight: 700, color: item.color, letterSpacing: 0.5 }}>STEP {item.step}</span></div>
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
      <div style={{ padding: "70px 24px", textAlign: "center", background: "linear-gradient(180deg, transparent 0%, rgba(108,92,231,0.03) 50%, transparent 100%)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Challenge friends</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: P.text, marginBottom: 8 }}>Who remembers more?</div>
        <div style={{ fontSize: 15, color: P.textM, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.6 }}>Same scenes. Same questions. Head-to-head. Pure skill, zero luck.</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 28, background: "white", borderRadius: 28, padding: "32px 44px", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: 20, background: P.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 26, fontWeight: 800, margin: "0 auto 8px", border: `2.5px solid ${P.gold}`, boxShadow: `0 4px 14px ${P.accent}25` }}>Y</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: P.text }}>You</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: P.green, marginTop: 4 }}>88%</div>
          </div>
          <div>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: `${P.green}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: P.green }}>WIN</span>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: 20, background: P.coral, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 26, fontWeight: 800, margin: "0 auto 8px", boxShadow: `0 4px 14px ${P.coral}20` }}>S</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: P.text }}>@sarah.k</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: P.text, marginTop: 4 }}>72%</div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ padding: "50px 24px 70px" }}>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { title: "Visual memory", desc: "Train your brain to hold more visual information", color: P.accent, icon: <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke={P.accent} strokeWidth="1.8"/><path d="M12 6v6l4 2" fill="none" stroke={P.accent} strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="12" r="2" fill={P.accent}/></svg> },
            { title: "Quick sessions", desc: "Each level takes 30-60 seconds. Play anywhere.", color: P.gold, icon: <svg width="24" height="24" viewBox="0 0 24 24"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="none" stroke={P.gold} strokeWidth="1.8" strokeLinejoin="round"/></svg> },
            { title: "Track progress", desc: "Watch your memory score improve over time", color: P.green, icon: <svg width="24" height="24" viewBox="0 0 24 24"><polyline points="4,18 9,12 13,15 20,6" fill="none" stroke={P.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="16,6 20,6 20,10" fill="none" stroke={P.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { title: "Earn achievements", desc: "Unlock badges and climb the ranks", color: P.coral, icon: <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="9" r="6" fill="none" stroke={P.coral} strokeWidth="1.8"/><path d="M8,14 L6,22 L12,19 L18,22 L16,14" fill="none" stroke={P.coral} strokeWidth="1.8" strokeLinejoin="round"/></svg> },
          ].map((f,i) => (
            <div key={i} style={{ flex: "1 1 180px", maxWidth: 220, padding: "22px 20px", borderRadius: 18, background: "white", boxShadow: "0 2px 14px rgba(0,0,0,0.03)", textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${f.color}08`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: P.text, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ padding: "70px 24px 50px", textAlign: "center", background: "linear-gradient(180deg, transparent, rgba(108,92,231,0.04))" }}>
        <div style={{ fontSize: 38, fontWeight: 800, color: P.text, marginBottom: 10, letterSpacing: -0.5 }}>Ready to test your memory?</div>
        <div style={{ fontSize: 16, color: P.textM, marginBottom: 28 }}>Free to play. No account required to start.</div>
        <div style={{ display: "inline-flex", padding: "15px 36px", borderRadius: 14, background: `linear-gradient(135deg, ${P.accent}, ${P.accentL})`, color: "white", fontSize: 17, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 24px ${P.accent}25` }}>Download LookAway</div>
        <div style={{ fontSize: 12, color: P.textD, marginTop: 14 }}>Available on iOS. Android coming soon.</div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "32px 24px", borderTop: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Logo size={24} />
          <span style={{ fontSize: 13, fontWeight: 700, color: P.text }}>LookAway</span>
          <span style={{ fontSize: 12, color: P.textD }}>© 2026</span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy","Terms","Contact","Press"].map(l => <span key={l} style={{ fontSize: 12, color: P.textD, cursor: "pointer" }}>{l}</span>)}
        </div>
      </div>
    </div>
  );
}
