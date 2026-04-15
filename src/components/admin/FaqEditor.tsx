'use client';

import type { BlogFaq } from '@/lib/supabase';

interface Props {
  faqs: BlogFaq[];
  onChange: (next: BlogFaq[]) => void;
}

export default function FaqEditor({ faqs, onChange }: Props) {
  function add() {
    onChange([...faqs, { q: '', a: '' }]);
  }

  function update(index: number, patch: Partial<BlogFaq>) {
    onChange(faqs.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function remove(index: number) {
    onChange(faqs.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= faqs.length) return;
    const next = faqs.slice();
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <section style={{
      marginTop: 24, background: 'white', border: '1.5px solid #EEEDE8',
      borderRadius: 12, padding: 20,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A18', margin: 0 }}>FAQ section</h2>
        <span style={{ fontSize: 11, color: '#B2BEC3' }}>{faqs.length} {faqs.length === 1 ? 'question' : 'questions'}</span>
      </div>
      <p style={{ fontSize: 12, color: '#636E72', margin: '0 0 14px', lineHeight: 1.5 }}>
        Optional questions and answers shown as an accordion at the bottom of the post. Also emitted as
        {' '}
        <a href="https://developers.google.com/search/docs/appearance/structured-data/faqpage" target="_blank" rel="noopener" style={{ color: '#6C5CE7' }}>FAQPage JSON-LD</a>
        {' '}
        so Google can show them as rich results.
      </p>

      {faqs.length === 0 && (
        <div style={{ padding: 16, textAlign: 'center', background: '#FAFAF7', borderRadius: 8, fontSize: 13, color: '#636E72' }}>
          No FAQ entries yet.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {faqs.map((item, i) => (
          <div key={i} style={{ border: '1px solid #EEEDE8', borderRadius: 10, padding: 14, background: '#FAFAF7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 0.4 }}>Q{i + 1}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <IconBtn title="Move up" disabled={i === 0} onClick={() => move(i, -1)}>↑</IconBtn>
                <IconBtn title="Move down" disabled={i === faqs.length - 1} onClick={() => move(i, 1)}>↓</IconBtn>
                <IconBtn title="Remove" onClick={() => remove(i)} danger>×</IconBtn>
              </div>
            </div>

            <input
              type="text"
              value={item.q}
              onChange={(e) => update(i, { q: e.target.value })}
              placeholder="Question (e.g. Is Blanked free?)"
              style={fieldStyle}
            />
            <textarea
              value={item.a}
              onChange={(e) => update(i, { a: e.target.value })}
              placeholder="Answer. Plain text works best for Google to pick up."
              rows={3}
              style={{ ...fieldStyle, marginTop: 6, fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        style={{
          marginTop: 14, width: '100%', padding: '10px 16px',
          borderRadius: 10, border: '1.5px dashed #B2BEC3',
          background: 'white', color: '#636E72',
          fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
        }}
      >
        + Add question
      </button>
    </section>
  );
}

function IconBtn({ title, onClick, disabled, danger, children }: {
  title: string; onClick: () => void; disabled?: boolean; danger?: boolean; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 26, height: 26, padding: 0, borderRadius: 6,
        border: '1px solid #EEEDE8', background: 'white',
        color: danger ? '#FF6B6B' : '#636E72',
        fontSize: 13, fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  );
}

const fieldStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px', borderRadius: 8,
  border: '1.5px solid #EEEDE8', background: 'white',
  fontSize: 13, outline: 'none', fontFamily: 'inherit',
};
