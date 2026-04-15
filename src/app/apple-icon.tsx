import { ImageResponse } from 'next/og';

// Apple touch icon — 180x180, used when Blanked is added to iOS home screen.
// Matches the BlinkAppIcon: face-only Blink on a dark purple gradient.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #5B4BC7 0%, #7E6EE8 100%)',
          borderRadius: 40,
        }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* Subtle top-left highlight for depth */}
          <ellipse cx="72" cy="64" rx="45" ry="27" fill="rgba(255,255,255,0.08)" />
          {/* Left eye */}
          <ellipse cx="65" cy="97" rx="21.6" ry="28" fill="white" />
          <circle cx="68.4" cy="100" r="11.7" fill="#1A1A18" />
          <circle cx="72" cy="95" r="4.3" fill="white" />
          {/* Right eye */}
          <ellipse cx="115" cy="97" rx="21.6" ry="28" fill="white" />
          <circle cx="118.8" cy="100" r="11.7" fill="#1A1A18" />
          <circle cx="122.4" cy="95" r="4.3" fill="white" />
          {/* Smile */}
          <path
            d="M 79 133 Q 90 145 101 133"
            fill="none"
            stroke="#1A1A18"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
