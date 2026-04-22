'use client';

import { COLORS } from '@/lib/constants';
import { HOME_FAQS } from '@/lib/home-faqs';

export default function HomeFaq() {
  const P = COLORS;
  return (
    <section
      id="faq"
      style={{
        maxWidth: 760, margin: '0 auto', padding: '60px 24px 20px',
      }}
      aria-label="Frequently asked questions"
    >
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div
          style={{
            fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2,
            textTransform: 'uppercase', marginBottom: 8,
          }}
        >
          Common questions
        </div>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.3 }}>
          Everything you might ask
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {HOME_FAQS.map((item, i) => (
          <details
            key={i}
            style={{
              background: 'white', borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)', overflow: 'hidden',
            }}
          >
            <summary
              style={{
                padding: '16px 20px', cursor: 'pointer', fontSize: 15,
                fontWeight: 600, color: P.text, listStyle: 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              {item.q}
              <span style={{ fontSize: 18, color: P.textD, marginLeft: 12 }} aria-hidden="true">+</span>
            </summary>
            {item.aHtml ? (
              <p
                style={{ padding: '0 20px 20px', fontSize: 15, color: '#636E72', lineHeight: 1.65, margin: 0 }}
                dangerouslySetInnerHTML={{ __html: item.aHtml }}
              />
            ) : (
              <p style={{ padding: '0 20px 20px', fontSize: 15, color: '#636E72', lineHeight: 1.65, margin: 0 }}>
                {item.a}
              </p>
            )}
          </details>
        ))}
      </div>
      <style>{`
        #faq a { color: ${P.accent}; text-decoration: underline; text-underline-offset: 3px; }
        #faq a:hover { color: ${P.accentL}; }
      `}</style>
    </section>
  );
}
