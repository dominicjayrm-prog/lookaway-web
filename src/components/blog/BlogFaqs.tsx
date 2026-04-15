import type { BlogFaq } from '@/lib/supabase';

interface Props {
  faqs: BlogFaq[];
}

/**
 * Renders an accordion of FAQ entries at the bottom of a blog post. The
 * matching FAQPage JSON-LD is emitted separately in the page component.
 *
 * Uses native <details>/<summary> so there's no JS requirement and it
 * remains crawlable by Google even with JS disabled.
 */
export default function BlogFaqs({ faqs }: Props) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section aria-labelledby="post-faq-heading" style={{ marginTop: 48 }}>
      <h2
        id="post-faq-heading"
        style={{
          fontSize: 28, fontWeight: 800, color: '#1A1A18',
          margin: '0 0 18px', letterSpacing: -0.4,
        }}
      >
        Frequently asked questions
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {faqs.map((f, i) => (
          <details
            key={i}
            style={{
              background: 'white',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: 12,
              padding: '14px 18px',
            }}
          >
            <summary style={{
              fontSize: 16, fontWeight: 700, color: '#1A1A18',
              cursor: 'pointer', listStyle: 'none',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              gap: 14,
            }}>
              <span>{f.q}</span>
              <span aria-hidden="true" style={{ color: '#6C5CE7', fontSize: 18, lineHeight: 1 }}>+</span>
            </summary>
            <div style={{
              fontSize: 15, lineHeight: 1.65, color: '#1A1A18',
              marginTop: 10, whiteSpace: 'pre-wrap',
            }}>
              {f.a}
            </div>
          </details>
        ))}
      </div>
      <style>{`
        details[open] > summary > span[aria-hidden] { transform: rotate(45deg); }
        summary::-webkit-details-marker { display: none; }
      `}</style>
    </section>
  );
}
