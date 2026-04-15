import { ImageResponse } from 'next/og';
import { COMPARISONS } from '@/lib/comparisons';

export const alt = 'Blanked comparison';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return Object.keys(COMPARISONS).map((vs) => ({ vs }));
}

export default async function Image({ params }: { params: Promise<{ vs: string }> }) {
  const { vs } = await params;
  const c = COMPARISONS[vs];
  const name = c?.name ?? 'Blanked';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          background: '#FAFAF7', padding: 80,
          fontFamily: '-apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="28" height="18" viewBox="0 0 36 24">
              <path d="M2 12Q18 2 34 12Q18 22 2 12Z" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.2" />
              <circle cx="18" cy="12" r="4" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: 28, fontWeight: 800, color: '#6C5CE7' }}>Blanked</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 22, color: '#636E72', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, display: 'flex' }}>
            COMPARE
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, color: '#1A1A18', lineHeight: 1.05, letterSpacing: -2, display: 'flex', flexWrap: 'wrap' }}>
            Blanked vs&nbsp;<span style={{ color: '#6C5CE7' }}>{name}</span>
          </div>
          <div style={{ fontSize: 24, color: '#636E72', marginTop: 20, display: 'flex' }}>
            Which memory game is right for you?
          </div>
        </div>

        <div style={{ fontSize: 18, color: '#B2BEC3', display: 'flex' }}>
          playblanked.com/compare/{vs}
        </div>
      </div>
    ),
    { ...size },
  );
}
