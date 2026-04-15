/**
 * BlinkAppIcon — the face-only Blink on a dark purple rounded-square
 * background. Matches the actual iOS app icon and the browser favicon.
 */

interface Props {
  size?: number;
  style?: React.CSSProperties;
}

export default function BlinkAppIcon({ size = 96, style }: Props) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2 + s * 0.04;
  const pr = s * 0.065;
  const gradId = `blink-app-icon-bg-${s}`;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={style} aria-label="Blanked app icon">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5B4BC7" />
          <stop offset="100%" stopColor="#7E6EE8" />
        </linearGradient>
      </defs>
      {/* Rounded purple square */}
      <rect width={s} height={s} rx={s * 0.22} fill={`url(#${gradId})`} />
      {/* Subtle top-left shine */}
      <ellipse cx={cx - s * 0.1} cy={cy - s * 0.12} rx={s * 0.25} ry={s * 0.15} fill="rgba(255,255,255,0.06)" />
      {/* Left eye */}
      <ellipse cx={cx - s * 0.14} cy={cy} rx={s * 0.12} ry={s * 0.155} fill="white" />
      <circle cx={cx - s * 0.12} cy={cy + s * 0.015} r={pr} fill="#1A1A18" />
      <circle cx={cx - s * 0.1} cy={cy - s * 0.015} r={s * 0.024} fill="white" />
      {/* Right eye */}
      <ellipse cx={cx + s * 0.14} cy={cy} rx={s * 0.12} ry={s * 0.155} fill="white" />
      <circle cx={cx + s * 0.16} cy={cy + s * 0.015} r={pr} fill="#1A1A18" />
      <circle cx={cx + s * 0.18} cy={cy - s * 0.015} r={s * 0.024} fill="white" />
      {/* Smile */}
      <path
        d={`M${cx - s * 0.06},${cy + s * 0.2} Q${cx},${cy + s * 0.27} ${cx + s * 0.06},${cy + s * 0.2}`}
        fill="none"
        stroke="#1A1A18"
        strokeWidth={Math.max(1.2, s * 0.022)}
        strokeLinecap="round"
      />
    </svg>
  );
}
