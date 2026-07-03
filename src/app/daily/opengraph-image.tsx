import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blanked Daily Memory Challenge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
// Re-render hourly so the challenge number stays current when the link
// is shared. (File-convention OG images are cached by default.)
export const revalidate = 3600;

const EPOCH = '2026-07-03';

function challengeNumber(): number {
  const today = new Date().toISOString().slice(0, 10);
  const ms = new Date(today + 'T12:00:00Z').getTime() - new Date(EPOCH + 'T12:00:00Z').getTime();
  return Math.max(1, Math.round(ms / 86400000) + 1);
}

// A fixed, on-brand mini result grid for the card (purple = hit).
const MINI_ROWS = [
  [1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1],
];

export default async function Image() {
  const num = challengeNumber();
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
        <div style={{ position: 'absolute', top: 60, left: 80, width: 50, height: 50, borderRadius: '50%', background: '#6C5CE718', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 120, right: 140, width: 40, height: 40, borderRadius: 8, background: '#6C5CE712', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 100, left: 160, width: 35, height: 35, borderRadius: '50%', background: '#00B89415', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 80, right: 120, width: 45, height: 45, borderRadius: 8, background: '#FF6B6B15', display: 'flex' }} />

        {/* Left side */}
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: 70, maxWidth: 560 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
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
            <span style={{ fontSize: 28, fontWeight: 800, color: '#6C5CE7' }}>Blanked Daily</span>
          </div>
          <div style={{ fontSize: 56, fontWeight: 800, color: '#1A1A18', lineHeight: 1.12, marginBottom: 16, display: 'flex' }}>
            Challenge #{num}
          </div>
          <div style={{ fontSize: 22, color: '#636E72', lineHeight: 1.4, display: 'flex' }}>
            One memory puzzle a day. Same for everyone. Free in your browser.
          </div>
        </div>

        {/* Right side: emoji-style result rows */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          padding: '28px 30px', borderRadius: 20, background: 'white',
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
        }}>
          {MINI_ROWS.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 8 }}>
              {row.map((hit, ci) => (
                <div
                  key={ci}
                  style={{
                    width: 34, height: 34, borderRadius: 8, display: 'flex',
                    background: hit ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : '#E9E9E4',
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 24, fontSize: 16, color: '#B2BEC3', display: 'flex' }}>
          playblanked.com/daily
        </div>
      </div>
    ),
    { ...size }
  );
}
