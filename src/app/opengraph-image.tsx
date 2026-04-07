import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blanked — Visual Memory Game';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: '#FAFAF7', fontFamily: '-apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative shapes */}
        <div style={{ position: 'absolute', top: 60, left: 80, width: 50, height: 50, borderRadius: '50%', background: '#FF6B6B18', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 120, right: 140, width: 40, height: 40, borderRadius: 8, background: '#0984E315', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 100, left: 160, width: 35, height: 35, borderRadius: '50%', background: '#00B89415', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 80, right: 120, width: 45, height: 45, borderRadius: 8, background: '#6C5CE712', display: 'flex' }} />

        {/* Left side */}
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: 80, maxWidth: 500 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="30" height="20" viewBox="0 0 36 24">
                <path d="M2 12Q18 2 34 12Q18 22 2 12Z" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.2" />
                <circle cx="18" cy="12" r="4" fill="white" />
              </svg>
            </div>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#6C5CE7' }}>Blanked</span>
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#1A1A18', lineHeight: 1.15, marginBottom: 16, display: 'flex', flexWrap: 'wrap' }}>
            Your memory is more powerful than you think
          </div>
          <div style={{ fontSize: 20, color: '#636E72', display: 'flex' }}>
            Train your brain in 2 minutes a day
          </div>
        </div>

        {/* Right side - mini phone */}
        <div style={{
          width: 160, height: 320, borderRadius: 24, background: '#1A1A18',
          padding: 5, display: 'flex', flexDirection: 'column',
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
        }}>
          <div style={{
            flex: 1, borderRadius: 20, background: '#FAFAF7',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 8, padding: 16,
          }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FF6B6B', display: 'flex' }} />
            <div style={{ width: 24, height: 24, borderRadius: 6, background: '#0984E3', display: 'flex' }} />
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#D4A012', display: 'flex' }} />
          </div>
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 24, fontSize: 16, color: '#B2BEC3', display: 'flex' }}>
          playblanked.com
        </div>
      </div>
    ),
    { ...size }
  );
}
