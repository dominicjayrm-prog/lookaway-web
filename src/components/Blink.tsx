'use client';

/**
 * Blink — The Blanked mascot (v4 Final)
 * 12 expressions, pure SVG, all sizes.
 * Ported from blanked-blink-mascot.jsx reference sheet.
 */

export type BlinkExpression =
  | 'normal' | 'memorise' | 'blank' | 'thinking' | 'correct' | 'wrong'
  | 'celebrate' | 'streak' | 'sad' | 'sleeping' | 'surprised' | 'love';

interface BlinkProps {
  expression?: BlinkExpression;
  size?: number;
  style?: React.CSSProperties;
}

const C = {
  accent: "#6C5CE7", accentL: "#A29BFE", accentD: "#4A3BBF",
  green: "#00B894", coral: "#FF6B6B", gold: "#D4A012", blue: "#0984E3",
  pink: "#FD79A8", teal: "#00CEC9",
  text: "#1A1A18", textM: "#636E72", textD: "#B2BEC3",
};

function starPts(sx: number, sy: number, sr: number): string {
  const p: string[] = [];
  for (let i = 0; i < 5; i++) {
    const oa = (i * 72 - 90) * Math.PI / 180;
    const ia = ((i * 72) + 36 - 90) * Math.PI / 180;
    p.push(`${sx + sr * Math.cos(oa)},${sy + sr * Math.sin(oa)}`);
    p.push(`${sx + sr * 0.4 * Math.cos(ia)},${sy + sr * 0.4 * Math.sin(ia)}`);
  }
  return p.join(" ");
}

function heartPath(hx: number, hy: number, hs: number): string {
  return `M${hx},${hy + hs * 0.3} C${hx - hs * 0.5},${hy - hs * 0.15} ${hx - hs * 0.5},${hy - hs * 0.55} ${hx},${hy - hs * 0.3} C${hx + hs * 0.5},${hy - hs * 0.55} ${hx + hs * 0.5},${hy - hs * 0.15} ${hx},${hy + hs * 0.3}Z`;
}

export default function Blink({ expression = 'normal', size = 120, style }: BlinkProps) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2 + s * 0.04;
  const bR = s * 0.38;
  const sw = (min: number, pct: number) => Math.max(min, s * pct);

  // ═══ BODY ═══
  const body = (
    <>
      <ellipse cx={cx} cy={cy + bR + s * 0.04} rx={bR * 0.55} ry={s * 0.025} fill="rgba(0,0,0,0.06)" />
      <circle cx={cx} cy={cy} r={bR} fill={`url(#bb-${s})`} />
      <ellipse cx={cx - s * 0.07} cy={cy - s * 0.12} rx={bR * 0.45} ry={bR * 0.3} fill="rgba(255,255,255,0.14)" />
    </>
  );

  // ═══ EYES ═══
  const eyes = ({ pc = C.text, sx = 1, sy = 1, pr = s * 0.045, lx = 0, ly = 0, sp = true }: {
    pc?: string; sx?: number; sy?: number; pr?: number; lx?: number; ly?: number; sp?: boolean;
  } = {}) => (
    <>
      <ellipse cx={cx - s * 0.1} cy={cy - s * 0.05} rx={s * 0.085 * sx} ry={s * 0.11 * sy} fill="white" />
      <ellipse cx={cx + s * 0.1} cy={cy - s * 0.05} rx={s * 0.085 * sx} ry={s * 0.11 * sy} fill="white" />
      <circle cx={cx - s * 0.085 + lx} cy={cy - s * 0.04 + ly} r={pr} fill={pc} />
      <circle cx={cx + s * 0.115 + lx} cy={cy - s * 0.04 + ly} r={pr} fill={pc} />
      {sp && <>
        <circle cx={cx - s * 0.07 + lx} cy={cy - s * 0.06 + ly} r={s * 0.014} fill="white" />
        <circle cx={cx + s * 0.13 + lx} cy={cy - s * 0.06 + ly} r={s * 0.014} fill="white" />
      </>}
    </>
  );

  // ═══ MOUTHS ═══
  const smile = (w = 0.06, lift = 0.06) => (
    <path d={`M${cx - s * w},${cy + s * 0.1} Q${cx},${cy + s * 0.1 + s * lift} ${cx + s * w},${cy + s * 0.1}`}
      fill="none" stroke={C.text} strokeWidth={sw(1, 0.018)} strokeLinecap="round" />
  );
  const bigSmile = () => (
    <path d={`M${cx - s * 0.08},${cy + s * 0.08} Q${cx},${cy + s * 0.19} ${cx + s * 0.08},${cy + s * 0.08}`}
      fill="none" stroke={C.text} strokeWidth={sw(1, 0.02)} strokeLinecap="round" />
  );
  const frown = (w = 0.05) => (
    <path d={`M${cx - s * w},${cy + s * 0.13} Q${cx},${cy + s * 0.09} ${cx + s * w},${cy + s * 0.13}`}
      fill="none" stroke={C.text} strokeWidth={sw(1, 0.016)} strokeLinecap="round" />
  );
  const openMouth = () => (
    <ellipse cx={cx} cy={cy + s * 0.12} rx={s * 0.04} ry={s * 0.035} fill={C.accentD} />
  );

  // ═══ BLANK: ARMS + HANDS (natural "covering eyes" posture) ═══
  const blankArmsAndHands = () => (
    <>
      <path d={`M${cx - bR + s * 0.06},${cy + s * 0.1} C${cx - bR - s * 0.08},${cy - s * 0.02} ${cx - bR - s * 0.06},${cy - s * 0.18} ${cx - s * 0.18},${cy - s * 0.04}`}
        fill="none" stroke={C.accentD} strokeWidth={sw(1.5, 0.04)} strokeLinecap="round" />
      <path d={`M${cx + bR - s * 0.06},${cy + s * 0.1} C${cx + bR + s * 0.08},${cy - s * 0.02} ${cx + bR + s * 0.06},${cy - s * 0.18} ${cx + s * 0.18},${cy - s * 0.04}`}
        fill="none" stroke={C.accentD} strokeWidth={sw(1.5, 0.04)} strokeLinecap="round" />
      <ellipse cx={cx - s * 0.11} cy={cy - s * 0.03} rx={s * 0.11} ry={s * 0.065} fill="white" stroke="#DDD9D5" strokeWidth={sw(0.5, 0.007)} />
      <ellipse cx={cx - s * 0.19} cy={cy - s * 0.06} rx={s * 0.025} ry={s * 0.035} fill="white" stroke="#DDD9D5" strokeWidth={sw(0.4, 0.005)} />
      <ellipse cx={cx + s * 0.11} cy={cy - s * 0.03} rx={s * 0.11} ry={s * 0.065} fill="white" stroke="#DDD9D5" strokeWidth={sw(0.5, 0.007)} />
      <ellipse cx={cx + s * 0.19} cy={cy - s * 0.06} rx={s * 0.025} ry={s * 0.035} fill="white" stroke="#DDD9D5" strokeWidth={sw(0.4, 0.005)} />
      <line x1={cx - s * 0.15} y1={cy - s * 0.035} x2={cx - s * 0.15} y2={cy + s * 0.005} stroke="#E8E4E0" strokeWidth={sw(0.3, 0.005)} strokeLinecap="round" />
      <line x1={cx - s * 0.1} y1={cy - s * 0.038} x2={cx - s * 0.1} y2={cy + s * 0.008} stroke="#E8E4E0" strokeWidth={sw(0.3, 0.005)} strokeLinecap="round" />
      <line x1={cx + s * 0.06} y1={cy - s * 0.038} x2={cx + s * 0.06} y2={cy + s * 0.008} stroke="#E8E4E0" strokeWidth={sw(0.3, 0.005)} strokeLinecap="round" />
      <line x1={cx + s * 0.11} y1={cy - s * 0.035} x2={cx + s * 0.11} y2={cy + s * 0.005} stroke="#E8E4E0" strokeWidth={sw(0.3, 0.005)} strokeLinecap="round" />
    </>
  );

  // ═══ ACCESSORIES ═══
  const smallStars = () => s >= 50 ? (
    <>
      <polygon points={starPts(cx + s * 0.24, cy - s * 0.2, s * 0.035)} fill={C.gold} />
      <polygon points={starPts(cx - s * 0.26, cy - s * 0.14, s * 0.025)} fill={C.gold} />
    </>
  ) : null;

  const bigStarsAndConfetti = () => (
    <>
      <polygon points={starPts(cx + s * 0.28, cy - s * 0.24, s * 0.05)} fill={C.gold} />
      <polygon points={starPts(cx - s * 0.32, cy - s * 0.18, s * 0.04)} fill={C.gold} />
      <polygon points={starPts(cx + s * 0.06, cy - s * 0.38, s * 0.028)} fill={C.gold} />
      {[
        { x: cx - s * 0.34, y: cy - s * 0.28, a: -35, c: C.coral },
        { x: cx + s * 0.35, y: cy - s * 0.2, a: 25, c: C.blue },
        { x: cx - s * 0.22, y: cy + s * 0.24, a: -55, c: C.gold },
        { x: cx + s * 0.28, y: cy + s * 0.26, a: 45, c: C.green },
        { x: cx - s * 0.1, y: cy - s * 0.42, a: -5, c: C.pink },
        { x: cx + s * 0.18, y: cy - s * 0.4, a: 12, c: C.gold },
        { x: cx - s * 0.38, y: cy + s * 0.06, a: -70, c: C.teal },
        { x: cx + s * 0.36, y: cy + s * 0.1, a: 65, c: C.coral },
      ].map((l, i) => (
        <line key={i} x1={l.x} y1={l.y}
          x2={l.x + Math.cos(l.a * Math.PI / 180) * s * 0.06}
          y2={l.y + Math.sin(l.a * Math.PI / 180) * s * 0.06}
          stroke={l.c} strokeWidth={sw(1.2, 0.02)} strokeLinecap="round" />
      ))}
    </>
  );

  const fireWithGlow = () => (
    <>
      <ellipse cx={cx} cy={cy - bR - s * 0.01} rx={s * 0.06} ry={s * 0.03} fill={C.coral} opacity="0.15" />
      <path d={`M${cx},${cy - bR - s * 0.01} C${cx - s * 0.08},${cy - bR + s * 0.06} ${cx - s * 0.05},${cy - bR - s * 0.06} ${cx},${cy - bR - s * 0.14} C${cx + s * 0.05},${cy - bR - s * 0.06} ${cx + s * 0.08},${cy - bR + s * 0.06} ${cx},${cy - bR - s * 0.01}`} fill={C.coral} />
      <path d={`M${cx},${cy - bR - s * 0.01} C${cx - s * 0.04},${cy - bR + s * 0.03} ${cx - s * 0.025},${cy - bR - s * 0.03} ${cx},${cy - bR - s * 0.08} C${cx + s * 0.025},${cy - bR - s * 0.03} ${cx + s * 0.04},${cy - bR + s * 0.03} ${cx},${cy - bR - s * 0.01}`} fill={C.gold} />
    </>
  );

  const teardrop = () => (
    <path d={`M${cx + s * 0.15},${cy - s * 0.01} Q${cx + s * 0.17},${cy + s * 0.04} ${cx + s * 0.15},${cy + s * 0.06} Q${cx + s * 0.13},${cy + s * 0.04} ${cx + s * 0.15},${cy - s * 0.01}`}
      fill={C.blue} opacity="0.45" />
  );

  const sweatDrop = () => (
    <path d={`M${cx + s * 0.2},${cy - s * 0.1} Q${cx + s * 0.22},${cy - s * 0.04} ${cx + s * 0.2},${cy + s * 0.02} Q${cx + s * 0.18},${cy - s * 0.04} ${cx + s * 0.2},${cy - s * 0.1}`}
      fill={C.blue} opacity="0.35" />
  );

  const blushCheeks = () => (
    <>
      <ellipse cx={cx - s * 0.16} cy={cy + s * 0.04} rx={s * 0.035} ry={s * 0.025} fill={C.pink} opacity="0.35" />
      <ellipse cx={cx + s * 0.16} cy={cy + s * 0.04} rx={s * 0.035} ry={s * 0.025} fill={C.pink} opacity="0.35" />
    </>
  );

  const thinkDots = () => (
    <>
      <circle cx={cx + s * 0.26} cy={cy - s * 0.16} r={sw(1.5, 0.018)} fill={C.accentL} opacity="0.55" />
      <circle cx={cx + s * 0.31} cy={cy - s * 0.23} r={sw(1, 0.014)} fill={C.accentL} opacity="0.45" />
      <circle cx={cx + s * 0.34} cy={cy - s * 0.29} r={sw(0.8, 0.01)} fill={C.accentL} opacity="0.3" />
    </>
  );

  const sleepZz = () => (
    <>
      <path d={`M${cx + s * 0.2},${cy - s * 0.18} L${cx + s * 0.28},${cy - s * 0.18} L${cx + s * 0.2},${cy - s * 0.12} L${cx + s * 0.28},${cy - s * 0.12}`}
        fill="none" stroke={C.accentL} strokeWidth={sw(0.8, 0.014)} strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d={`M${cx + s * 0.28},${cy - s * 0.26} L${cx + s * 0.33},${cy - s * 0.26} L${cx + s * 0.28},${cy - s * 0.22} L${cx + s * 0.33},${cy - s * 0.22}`}
        fill="none" stroke={C.accentL} strokeWidth={sw(0.6, 0.01)} strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
    </>
  );

  const closedEyes = () => (
    <>
      <path d={`M${cx - s * 0.15},${cy - s * 0.04} Q${cx - s * 0.1},${cy - s * 0.09} ${cx - s * 0.04},${cy - s * 0.04}`}
        fill="none" stroke={C.accentD} strokeWidth={sw(0.8, 0.02)} strokeLinecap="round" opacity="0.45" />
      <path d={`M${cx + s * 0.04},${cy - s * 0.04} Q${cx + s * 0.1},${cy - s * 0.09} ${cx + s * 0.15},${cy - s * 0.04}`}
        fill="none" stroke={C.accentD} strokeWidth={sw(0.8, 0.02)} strokeLinecap="round" opacity="0.45" />
    </>
  );

  // ═══ 12 EXPRESSIONS ═══
  const faces: Record<BlinkExpression, React.ReactNode> = {
    normal: <>{eyes({})}{smile(0.04, 0.04)}</>,

    memorise: (
      <>
        {eyes({ pc: C.accent, sy: 1.25, pr: s * 0.05 })}
        <line x1={cx - s * 0.22} y1={cy - s * 0.22} x2={cx - s * 0.18} y2={cy - s * 0.18} stroke={C.gold} strokeWidth={sw(0.8, 0.015)} strokeLinecap="round" />
        <line x1={cx + s * 0.2} y1={cy - s * 0.24} x2={cx + s * 0.17} y2={cy - s * 0.2} stroke={C.gold} strokeWidth={sw(0.8, 0.015)} strokeLinecap="round" />
        <line x1={cx - s * 0.24} y1={cy - s * 0.17} x2={cx - s * 0.18} y2={cy - s * 0.19} stroke={C.gold} strokeWidth={sw(0.6, 0.012)} strokeLinecap="round" />
      </>
    ),

    blank: <>{blankArmsAndHands()}{frown(0.04)}</>,

    thinking: (
      <>
        {eyes({ lx: s * 0.02, ly: -s * 0.02, sy: 0.9 })}
        <path d={`M${cx + s * 0.05},${cy - s * 0.17} Q${cx + s * 0.1},${cy - s * 0.22} ${cx + s * 0.17},${cy - s * 0.17}`}
          fill="none" stroke={C.accentD} strokeWidth={sw(0.8, 0.018)} strokeLinecap="round" opacity="0.55" />
        {thinkDots()}
      </>
    ),

    correct: <>{eyes({ pc: C.green, pr: s * 0.05 })}{bigSmile()}{smallStars()}</>,

    wrong: (
      <>
        {eyes({ pc: C.coral, sx: 0.9, sy: 0.85, pr: s * 0.038, sp: false })}
        {frown()}
        {sweatDrop()}
      </>
    ),

    celebrate: <>{eyes({ pc: C.accent, sy: 1.3, pr: s * 0.055 })}{bigSmile()}{bigStarsAndConfetti()}</>,

    streak: <>{eyes({ pc: C.coral, pr: s * 0.048 })}{smile(0.05, 0.05)}{fireWithGlow()}</>,

    sad: (
      <>
        {eyes({ pc: C.textM, sy: 0.8, ly: s * 0.015, sp: false })}
        {frown(0.05)}
        {teardrop()}
      </>
    ),

    sleeping: <>{closedEyes()}{smile(0.03, 0.03)}{sleepZz()}</>,

    surprised: (
      <>
        {eyes({ sx: 1.2, sy: 1.35, pr: s * 0.035 })}
        {openMouth()}
        <path d={`M${cx - s * 0.16},${cy - s * 0.18} Q${cx - s * 0.1},${cy - s * 0.24} ${cx - s * 0.03},${cy - s * 0.18}`}
          fill="none" stroke={C.accentD} strokeWidth={sw(0.8, 0.016)} strokeLinecap="round" opacity="0.55" />
        <path d={`M${cx + s * 0.03},${cy - s * 0.18} Q${cx + s * 0.1},${cy - s * 0.24} ${cx + s * 0.16},${cy - s * 0.18}`}
          fill="none" stroke={C.accentD} strokeWidth={sw(0.8, 0.016)} strokeLinecap="round" opacity="0.55" />
      </>
    ),

    love: (
      <>
        <ellipse cx={cx - s * 0.1} cy={cy - s * 0.05} rx={s * 0.085} ry={s * 0.11} fill="white" />
        <ellipse cx={cx + s * 0.1} cy={cy - s * 0.05} rx={s * 0.085} ry={s * 0.11} fill="white" />
        <path d={heartPath(cx - s * 0.1, cy - s * 0.04, s * 0.08)} fill={C.coral} />
        <path d={heartPath(cx + s * 0.1, cy - s * 0.04, s * 0.08)} fill={C.coral} />
        {smile(0.06, 0.07)}
        {blushCheeks()}
      </>
    ),
  };

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden="true" style={style}>
      {body}
      {faces[expression]}
      <defs>
        <radialGradient id={`bb-${s}`} cx="38%" cy="32%">
          <stop offset="0%" stopColor={C.accentL} />
          <stop offset="100%" stopColor={C.accent} />
        </radialGradient>
      </defs>
    </svg>
  );
}
