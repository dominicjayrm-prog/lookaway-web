import { ImageResponse } from 'next/og';

// Browser tab favicon — Blink's face on the dark-purple rounded square,
// matching the BlinkAppIcon in the mascot reference sheet.
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        {/* Face-only Blink — two white eyes with dark pupils + smile */}
        <svg width="32" height="32" viewBox="0 0 32 32">
          {/* Left eye */}
          <ellipse cx="11.5" cy="17.3" rx="3.8" ry="5" fill="white" />
          <circle cx="12.2" cy="17.8" r="2.1" fill="#1A1A18" />
          <circle cx="12.8" cy="16.8" r="0.8" fill="white" />
          {/* Right eye */}
          <ellipse cx="20.5" cy="17.3" rx="3.8" ry="5" fill="white" />
          <circle cx="21.1" cy="17.8" r="2.1" fill="#1A1A18" />
          <circle cx="21.8" cy="16.8" r="0.8" fill="white" />
          {/* Smile */}
          <path
            d="M 14 23.7 Q 16 25.9 18 23.7"
            fill="none"
            stroke="#1A1A18"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
