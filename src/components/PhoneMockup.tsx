'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '@/lib/constants';

const P = COLORS;

const HeartIcon = ({ filled, size = 10 }: { filled: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? P.coral : "none"} stroke={filled ? P.coral : "#E8E6E1"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const GemIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={P.accent} strokeWidth="2" strokeLinejoin="round">
    <polygon points="12,2 22,8.5 18,22 6,22 2,8.5" />
    <polyline points="2,8.5 12,12 22,8.5" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

const ClosedEyeIcon = () => (
  <svg width="28" height="20" viewBox="0 0 36 24">
    <path d="M3 14 Q18 14 33 14" stroke={P.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <line x1="9" y1="15" x2="6" y2="21" stroke={P.accent} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="18" y1="16" x2="18" y2="22" stroke={P.accent} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="27" y1="15" x2="30" y2="21" stroke={P.accent} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const questions = [
  { label: "QUESTION 1 OF 5", text: "How many red shapes were there?", options: ["1", "2", "3", "4"], correct: 0 },
  { label: "QUESTION 2 OF 5", text: "What colour was the square?", options: ["Red", "Blue", "Green", "Gold"], correct: 1 },
];

export default function PhoneMockup() {
  const [phase, setPhase] = useState<'scene' | 'fade' | 'question'>('scene');
  const [timer, setTimer] = useState(100);
  const [activeQ, setActiveQ] = useState(0);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    let ts: ReturnType<typeof setTimeout>[] = [];
    const loop = () => {
      setPhase('scene'); setTimer(100); setActiveQ(0); setAnswered(false);
      ts.push(setTimeout(() => setTimer(75), 400));
      ts.push(setTimeout(() => setTimer(50), 900));
      ts.push(setTimeout(() => setTimer(25), 1500));
      ts.push(setTimeout(() => setTimer(8), 2200));
      ts.push(setTimeout(() => { setPhase('fade'); setTimer(0); }, 2800));
      ts.push(setTimeout(() => { setPhase('question'); setActiveQ(1); setAnswered(false); }, 3400));
      ts.push(setTimeout(() => setAnswered(true), 4200));
      ts.push(setTimeout(() => { setActiveQ(2); setAnswered(false); }, 5000));
      ts.push(setTimeout(() => setAnswered(true), 5600));
      ts.push(setTimeout(loop, 7000));
    };
    loop();
    return () => ts.forEach(clearTimeout);
  }, []);

  const q = activeQ > 0 ? questions[activeQ - 1] : null;

  return (
    <div style={{ position: "relative", width: 260, height: 520 }}>
      {/* Physical buttons — left */}
      <div style={{ position: "absolute", left: -3, top: 100, width: 3, height: 28, borderRadius: 1.5, background: "#2D2D2D" }} />
      <div style={{ position: "absolute", left: -3, top: 140, width: 3, height: 42, borderRadius: 1.5, background: "#2D2D2D" }} />
      <div style={{ position: "absolute", left: -3, top: 190, width: 3, height: 42, borderRadius: 1.5, background: "#2D2D2D" }} />
      {/* Physical button — right */}
      <div style={{ position: "absolute", right: -3, top: 155, width: 3, height: 50, borderRadius: 1.5, background: "#2D2D2D" }} />

      {/* Phone body */}
      <div style={{
        width: 260, height: 520, borderRadius: 40, background: "#1A1A18", padding: 8,
        boxShadow: "0 30px 80px rgba(0,0,0,0.12), 0 10px 30px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.05)",
        position: "relative", overflow: "hidden"
      }}>
        {/* Inner screen */}
        <div style={{
          width: "100%", height: "100%", borderRadius: 33, background: "#FAFAF7",
          overflow: "hidden", position: "relative"
        }}>
          {/* Dynamic Island — inside inner screen so it clips properly */}
          <div style={{
            position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)",
            width: 90, height: 24, borderRadius: 12, background: "#1A1A18", zIndex: 10
          }} />

          {/* Screen content */}
          <div style={{
            position: "absolute", inset: 0,
            padding: "34px 14px 10px",
            display: "flex", flexDirection: "column"
          }}>
            {/* Top bar: hearts + gems */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map(i => <HeartIcon key={i} filled={i <= 4} />)}
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 4, padding: "2px 8px",
                borderRadius: 10, background: `${P.accent}10`
              }}>
                <GemIcon />
                <span style={{ fontSize: 9, fontWeight: 700, color: P.accent }}>50</span>
              </div>
            </div>

            {/* Level badge */}
            <div style={{ textAlign: "center", marginBottom: 5 }}>
              <span style={{
                display: "inline-block", padding: "2px 10px", borderRadius: 8,
                background: `${P.accent}10`, fontSize: 9, fontWeight: 700, color: P.accent, letterSpacing: 1
              }}>LEVEL 4</span>
            </div>

            {/* Timer bar */}
            <div style={{ height: 4, borderRadius: 2, background: "#EEEDE8", marginBottom: 8, overflow: "hidden" }}>
              <div style={{
                width: `${timer}%`, height: "100%", borderRadius: 2,
                background: timer > 50 ? P.accent : timer > 20 ? P.gold : P.coral,
                transition: "width 0.5s linear, background 0.3s"
              }} />
            </div>

            {/* Main canvas */}
            <div style={{
              flex: 1, borderRadius: 16, background: "white",
              border: "1px solid rgba(0,0,0,0.04)", position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.03)"
            }}>
              {/* Scene phase */}
              {(phase === 'scene' || phase === 'fade') && (
                <div style={{
                  position: "absolute", inset: 0,
                  opacity: phase === 'fade' ? 0 : 1,
                  transition: "opacity 0.5s ease-out"
                }}>
                  <div style={{
                    position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
                    fontSize: 9, color: P.textD, fontWeight: 600, whiteSpace: "nowrap"
                  }}>Memorise this scene!</div>
                  <div style={{ position: "absolute", left: "15%", top: "15%", width: 34, height: 34, borderRadius: "50%", background: P.coral, boxShadow: `0 2px 8px ${P.coral}30` }} />
                  <div style={{ position: "absolute", right: "16%", top: "18%", width: 28, height: 28, borderRadius: 6, background: P.blue, boxShadow: `0 2px 8px ${P.blue}30` }} />
                  <div style={{ position: "absolute", left: "40%", top: "40%" }}>
                    <svg viewBox="0 0 100 100" width="26" height="26"><polygon points="50,5 63,35 95,35 69,57 79,90 50,70 21,90 31,57 5,35 37,35" fill={P.gold} /></svg>
                  </div>
                  <div style={{ position: "absolute", left: "14%", bottom: "18%" }}>
                    <svg viewBox="0 0 100 100" width="24" height="24"><polygon points="50,5 95,50 50,95 5,50" fill={P.accent} /></svg>
                  </div>
                  <div style={{ position: "absolute", right: "15%", bottom: "20%" }}>
                    <svg viewBox="0 0 100 100" width="30" height="30"><polygon points="50,8 92,88 8,88" fill={P.green} /></svg>
                  </div>
                </div>
              )}

              {/* Fade overlay */}
              {phase === 'fade' && (
                <div style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 6,
                  background: "rgba(250,250,247,0.9)", backdropFilter: "blur(3px)"
                }}>
                  <ClosedEyeIcon />
                  <span style={{ fontSize: 10, fontWeight: 700, color: P.accent }}>Scene disappeared!</span>
                </div>
              )}

              {/* Question phase */}
              {phase === 'question' && q && (
                <div style={{ padding: "10px 12px", width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 6 }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: i < activeQ ? P.green : i === activeQ ? (answered ? P.green : P.accent) : "#E8E6E1"
                      }} />
                    ))}
                  </div>
                  <div style={{ fontSize: 7, color: P.textD, fontWeight: 700, marginBottom: 3, letterSpacing: 0.5, textAlign: "center" }}>{q.label}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: P.text, marginBottom: 8, lineHeight: 1.3, textAlign: "center" }}>{q.text}</div>
                  {q.options.map((opt, i) => {
                    const highlight = answered && i === q.correct;
                    return (
                      <div key={i} style={{
                        padding: "7px 0", borderRadius: 8, textAlign: "center",
                        marginBottom: 3, fontSize: 10, fontWeight: 600,
                        background: highlight ? `${P.green}15` : "#F5F4F0",
                        color: highlight ? P.green : P.textM,
                        border: highlight ? `1.5px solid ${P.green}` : "1.5px solid transparent",
                        transform: highlight ? "scale(1.02)" : "scale(1)",
                        transition: "all 0.3s"
                      }}>
                        {opt}{highlight ? " ✓" : ""}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Power-up hints */}
            {phase === 'question' && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 6 }}>
                {[
                  <svg key="eye" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={P.textD} strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
                  <svg key="cut" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={P.textD} strokeWidth="1.8"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>,
                  <svg key="skip" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={P.textD} strokeWidth="1.8"><polygon points="5,4 15,12 5,20" /><line x1="19" y1="5" x2="19" y2="19" /></svg>,
                ].map((icon, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: 7, background: "#F5F4F0", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.5 }}>
                    {icon}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Home indicator bar */}
          <div style={{
            position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)",
            width: 80, height: 4, borderRadius: 2, background: "#D0CEC8"
          }} />
        </div>
      </div>
    </div>
  );
}
