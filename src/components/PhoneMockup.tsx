'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '@/lib/constants';

const P = COLORS;

export default function PhoneMockup() {
  const [phase, setPhase] = useState("scene");
  const [timer, setTimer] = useState(100);

  useEffect(() => {
    let ts: ReturnType<typeof setTimeout>[] = [];
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
    <div style={{
      width: 230, height: 460, borderRadius: 36, background: "#FAFAF7",
      border: "3px solid #E0DDD6", position: "relative", overflow: "hidden",
      boxShadow: "0 30px 70px rgba(0,0,0,0.1), 0 10px 25px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02)"
    }}>
      <div style={{ width: 70, height: 6, borderRadius: 3, background: "#E0DDD6", margin: "10px auto 0" }} />
      <div style={{ padding: "14px 16px", height: "calc(100% - 22px)", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 8, color: P.textD, fontWeight: 700, letterSpacing: 0.5 }}>LEVEL 4</span>
          <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: 3, background: i <= 3 ? P.green : "#E8E6E1" }} />
            ))}
          </div>
        </div>
        <div style={{ height: 3, borderRadius: 1.5, background: "#EEEDE8", marginBottom: 10, overflow: "hidden" }}>
          <div style={{
            width: `${timer}%`, height: "100%", borderRadius: 1.5,
            background: timer > 40 ? P.accent : timer > 15 ? P.gold : P.coral,
            transition: "width 1s linear, background 0.3s"
          }} />
        </div>
        <div style={{
          flex: 1, borderRadius: 16, background: "white", border: "1px solid rgba(0,0,0,0.04)",
          position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"
        }}>
          {(phase === "scene" || phase === "fade") && (
            <div style={{ position: "absolute", inset: 0, opacity: phase === "fade" ? 0 : 1, transition: "opacity 0.6s" }}>
              <div style={{ position: "absolute", left: "18%", top: "16%", width: 30, height: 30, borderRadius: "50%", background: P.coral }} />
              <div style={{ position: "absolute", right: "20%", top: "28%", width: 26, height: 26, borderRadius: 5, background: P.blue }} />
              <div style={{ position: "absolute", left: "42%", bottom: "20%" }}>
                <svg viewBox="0 0 100 100" width="26" height="26"><polygon points="50,8 92,88 8,88" fill={P.green} /></svg>
              </div>
              <div style={{ position: "absolute", right: "16%", bottom: "35%", width: 22, height: 22, borderRadius: "50%", background: P.gold }} />
              <div style={{ position: "absolute", left: "15%", bottom: "42%" }}>
                <svg viewBox="0 0 100 100" width="20" height="20"><polygon points="50,5 63,35 95,35 69,57 79,90 50,70 21,90 31,57 5,35 37,35" fill={P.accent} /></svg>
              </div>
            </div>
          )}
          {(phase === "question" || phase === "correct") && (
            <div style={{ padding: "12px 14px", width: "100%" }}>
              <div style={{ fontSize: 7, color: P.textD, fontWeight: 700, marginBottom: 4, letterSpacing: 0.3 }}>QUESTION 1 OF 5</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: P.text, marginBottom: 10 }}>How many red shapes?</div>
              {["1", "2", "3", "4"].map((opt, i) => (
                <div key={i} style={{
                  padding: "7px 0", borderRadius: 7, textAlign: "center", marginBottom: 4, fontSize: 9, fontWeight: 600,
                  background: phase === "correct" && i === 0 ? `${P.green}12` : "#F5F4F0",
                  color: phase === "correct" && i === 0 ? P.green : P.textM,
                  border: phase === "correct" && i === 0 ? `1.5px solid ${P.green}` : "1.5px solid transparent",
                  transition: "all 0.3s"
                }}>
                  {opt}{phase === "correct" && i === 0 ? " ✓" : ""}
                </div>
              ))}
            </div>
          )}
          {phase === "fade" && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(250,250,247,0.88)", backdropFilter: "blur(2px)"
            }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: P.accent }}>Scene disappeared!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
