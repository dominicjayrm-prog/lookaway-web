import Link from 'next/link';
import { COLORS } from '@/lib/constants';

/**
 * Compact promo banner rendered under every blog post, pointing readers at
 * the playable daily challenge. Render-layer only: post content is never
 * modified. Doubles as a site-wide internal link into /daily.
 */
export default function DailyChallengeBanner() {
  return (
    <Link
      href="/daily"
      style={{
        display: 'block',
        marginTop: 36,
        padding: '20px 24px',
        borderRadius: 14,
        background: `${COLORS.accent}08`,
        border: `1px solid ${COLORS.accent}25`,
        textDecoration: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 28, lineHeight: 1 }} aria-hidden>🟪</div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, marginBottom: 2 }}>
            Put it into practice: today&rsquo;s memory challenge
          </div>
          <div style={{ fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            One puzzle a day, same for everyone, free in your browser. Five rounds, share your grid, keep your streak.
          </div>
        </div>
        <span
          style={{
            padding: '10px 18px',
            borderRadius: 10,
            background: COLORS.accent,
            color: 'white',
            fontSize: 13,
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          Play now
        </span>
      </div>
    </Link>
  );
}
