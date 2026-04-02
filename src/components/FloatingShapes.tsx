'use client';

import { COLORS } from '@/lib/constants';

const P = COLORS;

interface ShapeProps {
  type: string;
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
  rotateRange: number;
  id: number;
}

function HeroShape({ type, color, size, x, y, delay, duration, rotateRange, id }: ShapeProps) {
  const animName = `hs_${id}`;
  const floatY1 = -4 - (id * 3) % 8;
  const floatY2 = 2 + (id * 5) % 4;
  const scale1 = 0.97 + ((id * 7) % 6) * 0.01;
  const scale2 = 1.0 + ((id * 3) % 4) * 0.01;

  const keyframes = `
    @keyframes ${animName}_in { from { opacity:0; transform:scale(0.3) rotate(-30deg); } to { opacity:1; transform:scale(1) rotate(0deg); } }
    @keyframes ${animName}_float {
      0% { transform: translateY(0) rotate(0deg) scale(1); }
      33% { transform: translateY(${floatY1}px) rotate(${rotateRange / 2}deg) scale(${scale1}); }
      66% { transform: translateY(${floatY2}px) rotate(${-rotateRange / 3}deg) scale(${scale2}); }
      100% { transform: translateY(0) rotate(0deg) scale(1); }
    }
  `;

  const s: React.CSSProperties = {
    position: "absolute", left: x, top: y, width: size, height: size, opacity: 0, pointerEvents: "none",
    animation: `${animName}_in 0.8s ${delay}s forwards ease-out, ${animName}_float ${duration}s ${delay + 0.8}s infinite ease-in-out`,
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      {type === "circle" && <div style={{ ...s, borderRadius: "50%", background: color }} />}
      {type === "square" && <div style={{ ...s, borderRadius: size * 0.18, background: color }} />}
      {type === "triangle" && <svg style={s} viewBox="0 0 100 100"><polygon points="50,8 92,88 8,88" fill={color} /></svg>}
      {type === "star" && <svg style={s} viewBox="0 0 100 100"><polygon points="50,5 63,35 95,35 69,57 79,90 50,70 21,90 31,57 5,35 37,35" fill={color} /></svg>}
      {type === "diamond" && <svg style={s} viewBox="0 0 100 100"><polygon points="50,5 95,50 50,95 5,50" fill={color} /></svg>}
      {type === "hexagon" && <svg style={s} viewBox="0 0 100 100"><polygon points="50,3 93,25 93,75 50,97 7,75 7,25" fill={color} /></svg>}
    </>
  );
}

const shapes: Omit<ShapeProps, 'id'>[] = [
  // Large background layer
  { type: "circle", color: `${P.coral}18`, size: 65, x: "2%", y: "8%", delay: 0, duration: 7, rotateRange: 8 },
  { type: "hexagon", color: `${P.accent}12`, size: 80, x: "78%", y: "5%", delay: 0.3, duration: 9, rotateRange: 12 },
  { type: "diamond", color: `${P.blue}10`, size: 55, x: "85%", y: "60%", delay: 0.5, duration: 8, rotateRange: 15 },
  { type: "square", color: `${P.green}14`, size: 50, x: "0%", y: "70%", delay: 0.7, duration: 7.5, rotateRange: 10 },
  // Medium foreground layer
  { type: "star", color: `${P.gold}20`, size: 36, x: "90%", y: "35%", delay: 0.2, duration: 6, rotateRange: 20 },
  { type: "triangle", color: `${P.green}18`, size: 32, x: "6%", y: "42%", delay: 0.4, duration: 6.5, rotateRange: 18 },
  { type: "circle", color: `${P.accentL}15`, size: 28, x: "72%", y: "78%", delay: 0.6, duration: 5.5, rotateRange: 0 },
  { type: "square", color: `${P.coral}14`, size: 24, x: "15%", y: "85%", delay: 0.9, duration: 7, rotateRange: 25 },
  // Small sparkle layer
  { type: "circle", color: `${P.accent}22`, size: 14, x: "20%", y: "18%", delay: 0.1, duration: 5, rotateRange: 0 },
  { type: "circle", color: `${P.green}20`, size: 12, x: "65%", y: "12%", delay: 0.8, duration: 4.5, rotateRange: 0 },
  { type: "diamond", color: `${P.gold}22`, size: 16, x: "88%", y: "82%", delay: 0.3, duration: 5.5, rotateRange: 30 },
  { type: "star", color: `${P.coral}18`, size: 18, x: "8%", y: "60%", delay: 1.0, duration: 6, rotateRange: 25 },
  { type: "triangle", color: `${P.accent}16`, size: 14, x: "55%", y: "88%", delay: 0.5, duration: 5, rotateRange: 20 },
  { type: "circle", color: `${P.blue}18`, size: 10, x: "40%", y: "5%", delay: 1.2, duration: 4, rotateRange: 0 },
];

export default function FloatingShapes() {
  return (
    <div style={{ position: "absolute", inset: -40, overflow: "hidden", pointerEvents: "none" }}>
      {shapes.map((shape, i) => (
        <HeroShape key={i} {...shape} id={i} />
      ))}
    </div>
  );
}
