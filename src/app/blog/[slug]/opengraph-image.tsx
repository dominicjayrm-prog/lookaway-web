import { ImageResponse } from 'next/og';
import { getPublishedPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs';
export const alt = 'Blanked blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  const title = post?.title ?? 'Blanked';
  const subtitle = post?.subtitle ?? post?.meta_description ?? 'Train your memory in 2 minutes a day';

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', background: '#FAFAF7', padding: 80,
        fontFamily: '-apple-system, sans-serif',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="18" viewBox="0 0 36 24">
              <path d="M2 12Q18 2 34 12Q18 22 2 12Z" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.2" />
              <circle cx="18" cy="12" r="4" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: 28, fontWeight: 800, color: '#6C5CE7' }}>Blanked</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 60, fontWeight: 800, color: '#1A1A18', lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 20, display: 'flex', flexWrap: 'wrap' }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 24, color: '#636E72', lineHeight: 1.4, display: 'flex', flexWrap: 'wrap' }}>
              {subtitle.length > 120 ? subtitle.slice(0, 120) + '…' : subtitle}
            </div>
          )}
        </div>

        <div style={{ fontSize: 18, color: '#B2BEC3', display: 'flex' }}>
          playblanked.com/blog
        </div>
      </div>
    ),
    { ...size },
  );
}
