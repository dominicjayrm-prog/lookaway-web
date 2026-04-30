import { TESTIMONIALS } from '@/lib/testimonials';
import { COLORS } from '@/lib/constants';

const P = COLORS;

/**
 * Player testimonials section. Renders nothing while TESTIMONIALS is
 * empty so we never ship a "What players are saying" header above
 * thin air. Add real, verbatim quotes to src/lib/testimonials.ts to
 * switch the section on.
 */
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      id="testimonials"
      style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}
      aria-label="What players are saying"
    >
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
          Reviews
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: P.text, letterSpacing: -0.5 }}>
          What players are <span style={{ color: P.accent }}>saying</span>
        </h2>
      </div>

      <div
        className="testimonials-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}
      >
        {TESTIMONIALS.map((t, i) => (
          <article
            key={i}
            style={{
              padding: '22px 24px',
              borderRadius: 16,
              background: 'white',
              border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 2px 14px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {t.rating && (
              <div aria-label={`${t.rating} out of 5 stars`} style={{ color: P.gold, fontSize: 14, letterSpacing: 1 }}>
                {'★'.repeat(t.rating)}
                <span style={{ color: '#E0DFD9' }}>{'★'.repeat(5 - t.rating)}</span>
              </div>
            )}
            <blockquote style={{ margin: 0, fontSize: 15, color: P.text, lineHeight: 1.55 }}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div style={{ fontSize: 13, color: P.textD, marginTop: 'auto' }}>
              {t.author}
              <span style={{ color: '#B2BEC3' }}> · {t.source}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
