import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'LookAway — Visual Memory Game';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAFAF7',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          position: 'relative',
        }}
      >
        {/* Floating shapes */}
        <div style={{ position: 'absolute', top: 80, left: 120, width: 60, height: 60, borderRadius: '50%', background: '#FF6B6B20', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 140, right: 180, width: 50, height: 50, borderRadius: 10, background: '#0984E318', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 120, left: 200, width: 45, height: 45, borderRadius: '50%', background: '#00B89418', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 100, right: 150, width: 55, height: 55, borderRadius: 10, background: '#6C5CE715', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 200, left: 80, width: 35, height: 35, borderRadius: '50%', background: '#D4A01220', display: 'flex' }} />

        {/* Logo */}
        <div
          style={{
            width: 100, height: 100, borderRadius: 24,
            background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 32,
            boxShadow: '0 8px 32px rgba(108,92,231,0.25)',
          }}
        >
          <svg width="56" height="56" viewBox="0 0 64 64">
            <g transform="translate(14,20)">
              <path d="M2 12Q18 0 34 12Q18 24 2 12Z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5" />
              <circle cx="18" cy="12" r="6" fill="white" />
              <circle cx="18" cy="12" r="3" fill="#6C5CE7" />
            </g>
          </svg>
        </div>

        {/* Title */}
        <div style={{ fontSize: 64, fontWeight: 800, color: '#1A1A18', letterSpacing: -2, display: 'flex' }}>
          Look<span style={{ color: '#6C5CE7' }}>Away</span>
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 32, color: '#555555', marginTop: 12, display: 'flex' }}>
          How much can you remember?
        </div>

        {/* URL */}
        <div style={{ fontSize: 18, color: '#999999', marginTop: 32, display: 'flex' }}>
          playlookaway.app
        </div>
      </div>
    ),
    { ...size }
  );
}
