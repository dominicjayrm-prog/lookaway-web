export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#A29BFE" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#lg)" />
      <g transform="translate(14,20)">
        <path d="M2 12Q18 0 34 12Q18 24 2 12Z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5" />
        <circle cx="18" cy="12" r="6" fill="white" />
        <circle cx="18" cy="12" r="3" fill="#6C5CE7" />
      </g>
    </svg>
  );
}
