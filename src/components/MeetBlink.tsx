'use client';

import { useState, useEffect, useRef } from 'react';
import Blink, { BlinkExpression } from './Blink';
import { COLORS } from '@/lib/constants';

const P = COLORS;

const showcaseExpressions: { expr: BlinkExpression; label: string }[] = [
  { expr: 'normal', label: 'Ready to play' },
  { expr: 'memorise', label: 'Studying the scene' },
  { expr: 'blank', label: 'Go blank!' },
  { expr: 'correct', label: 'Got it right!' },
  { expr: 'celebrate', label: 'Celebrating!' },
  { expr: 'streak', label: 'On a streak!' },
];

const cards = [
  { expr: 'memorise' as BlinkExpression, title: 'Trains with you', desc: "Blink studies every scene alongside you, reacting in real-time as you play" },
  { expr: 'blank' as BlinkExpression, title: 'The signature move', desc: "When the scene disappears, Blink covers his eyes. It's your cue to remember" },
  { expr: 'streak' as BlinkExpression, title: 'Guards your streak', desc: "Miss a day and Blink's fire goes out. Keep playing to keep him burning" },
];

export default function MeetBlink() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i + 1) % showcaseExpressions.length), 2000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const current = showcaseExpressions[idx];

  return (
    <section
      ref={ref}
      id="blink"
      style={{
        padding: "80px 40px", maxWidth: 1100, margin: "0 auto", textAlign: "center",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
      aria-label="Meet Blink"
    >
      <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Your companion</div>
      <h2 style={{ fontSize: 40, fontWeight: 800, color: "#1A1A18", marginBottom: 12 }}>Meet Blink</h2>
      <p style={{ fontSize: 17, color: "#636E72", maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.6 }}>
        Your memory training buddy who celebrates your wins, worries about your streak, and covers his eyes every time the scene disappears.
      </p>

      {/* Cycling showcase */}
      <div style={{ marginBottom: 12 }}>
        <Blink size={160} expression={current.expr} />
      </div>
      <div key={idx} style={{ fontSize: 14, fontWeight: 600, color: P.accent, marginBottom: 48, animation: "screenFadeIn 0.4s ease-out" }}>
        {current.label}
      </div>

      {/* Feature cards */}
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
        {cards.map((card, i) => (
          <article
            key={i}
            style={{
              flex: "1 1 260px", maxWidth: 320, padding: "32px 24px", borderRadius: 20,
              background: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.04)", textAlign: "center",
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.6s ${0.15 * (i + 1)}s ease-out, transform 0.6s ${0.15 * (i + 1)}s ease-out`,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <Blink size={40} expression={card.expr} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A18", marginBottom: 8 }}>{card.title}</h3>
            <p style={{ fontSize: 13, color: "#636E72", lineHeight: 1.5 }}>{card.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
