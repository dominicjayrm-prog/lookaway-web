'use client';

import { useEffect, useState } from 'react';
import { COLORS, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;
const START_LEN = 3;
const LIVES = 3;
// Display duration scales with sequence length so the test stays fair as
// the number gets longer. Caps so the longest sequences are still possible.
function showDurationMs(len: number): number {
  return Math.min(1000 + (len - 1) * 700, 8000);
}

type Phase = 'idle' | 'showing' | 'input' | 'gameover';

function makeNumber(len: number): string {
  let out = '';
  for (let i = 0; i < len; i++) out += String(Math.floor(Math.random() * 10));
  return out;
}

function levelLabel(level: number): string {
  if (level >= 12) return 'Outlier. Digit-span typically caps around 7-9; you have either practised or chunked unusually well.';
  if (level >= 10) return 'Excellent. Top ~10%. Strong working-memory span.';
  if (level >= 8) return 'Above average. Around the 75th percentile on digit-span tasks.';
  if (level >= 6) return 'About average for adults. Miller\'s "magical number seven, plus or minus two" puts most people here.';
  if (level >= 4) return 'Beginner range. Digit span responds well to chunking strategies and daily practice.';
  return 'Just getting started. The trick is to chunk the digits into groups of two or three rather than try to hold them as a list.';
}

export default function NumberMemoryTest() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(START_LEN);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [target, setTarget] = useState('');
  const [input, setInput] = useState('');

  function startGame() {
    setLives(LIVES);
    setBest(0);
    setLevel(START_LEN);
    startRound(START_LEN);
  }

  function startRound(len: number) {
    const n = makeNumber(len);
    setTarget(n);
    setInput('');
    setLevel(len);
    setPhase('showing');
  }

  useEffect(() => {
    if (phase !== 'showing') return;
    const ms = showDurationMs(level);
    const t = setTimeout(() => setPhase('input'), ms);
    return () => clearTimeout(t);
  }, [phase, level]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase !== 'input') return;
    if (input === target) {
      setBest((b) => Math.max(b, level));
      const nextLen = level + 1;
      setTimeout(() => startRound(nextLen), 300);
    } else {
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        setBest((b) => Math.max(b, level - 1));
        setPhase('gameover');
      } else {
        // Retry the same length
        setTimeout(() => startRound(level), 700);
      }
    }
  }

  return (
    <div style={wrapper}>
      <div style={statusBar}>
        <div><div style={statusLabel}>Level</div><div style={statusValue}>{phase === 'idle' ? '—' : level}</div></div>
        <div><div style={statusLabel}>Best</div><div style={statusValue}>{best || '—'}</div></div>
        <div><div style={statusLabel}>Lives</div><div style={statusValue}>{phase === 'idle' || phase === 'gameover' ? '—' : '♥'.repeat(lives)}</div></div>
      </div>

      <div style={display}>
        {phase === 'showing' && <span style={numberStyle}>{target}</span>}
        {phase === 'idle' && <span style={hintStyle}>Press Start</span>}
        {phase === 'input' && (
          <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: 300, margin: '0 auto' }}>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ''))}
              style={inputStyle}
              aria-label="Enter the number you saw"
            />
            <button type="submit" style={{ ...btnPrimary, marginTop: 12, width: '100%' }} disabled={input.length === 0}>Submit</button>
          </form>
        )}
        {phase === 'gameover' && (
          <div style={{ textAlign: 'center' }}>
            <p style={resultHeadline}>You reached <span style={{ color: P.accent }}>{best} digits</span>.</p>
            <p style={resultBody}>{levelLabel(best)}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={btnAccent}>Sharpen working memory in the app</a>
              <button type="button" onClick={startGame} style={btnSecondary}>Try again</button>
            </div>
            <p style={resultFooter}>The chunking trick (group digits into pairs or triples) is the single biggest practical improvement. Blanked\'s visual modes train the same working-memory machinery from a different angle.</p>
          </div>
        )}
      </div>

      <div style={controls}>
        {phase === 'idle' && (
          <>
            <p style={controlLead}>A number will appear for a few seconds. When it disappears, type it back. Each correct round adds one digit.</p>
            <button type="button" onClick={startGame} style={btnPrimary}>Start the test</button>
          </>
        )}
      </div>
    </div>
  );
}

const wrapper: React.CSSProperties = { background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 18, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.04)' };
const statusBar: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20, textAlign: 'center' };
const statusLabel: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: COLORS.textD, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 };
const statusValue: React.CSSProperties = { fontSize: 22, fontWeight: 800, color: COLORS.text };
const display: React.CSSProperties = { minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 0', borderRadius: 14, background: '#FAFAF7' };
const numberStyle: React.CSSProperties = { fontSize: 56, fontWeight: 800, color: COLORS.text, letterSpacing: 4, fontFamily: 'ui-monospace, SFMono-Regular, monospace' };
const hintStyle: React.CSSProperties = { fontSize: 14, color: COLORS.textD };
const inputStyle: React.CSSProperties = { width: '100%', padding: '14px 18px', fontSize: 24, textAlign: 'center', borderRadius: 12, border: `1.5px solid ${COLORS.text}20`, fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: 3, outline: 'none' };
const controls: React.CSSProperties = { marginTop: 22, textAlign: 'center' };
const controlLead: React.CSSProperties = { fontSize: 14, color: '#636E72', lineHeight: 1.6, margin: '0 0 12px' };
const resultHeadline: React.CSSProperties = { fontSize: 22, fontWeight: 800, color: COLORS.text, margin: '0 0 8px' };
const resultBody: React.CSSProperties = { fontSize: 14, color: '#636E72', lineHeight: 1.6, margin: '0 0 18px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' };
const resultFooter: React.CSSProperties = { fontSize: 13, color: COLORS.textD, lineHeight: 1.55, marginTop: 8, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' };
const btnPrimary: React.CSSProperties = { padding: '12px 28px', borderRadius: 12, background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', border: 'none', cursor: 'pointer' };
const btnAccent: React.CSSProperties = { display: 'inline-block', padding: '12px 24px', borderRadius: 12, background: COLORS.accent, color: 'white', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', border: 'none', cursor: 'pointer', textDecoration: 'none' };
const btnSecondary: React.CSSProperties = { padding: '12px 24px', borderRadius: 12, background: 'white', color: COLORS.text, fontSize: 15, fontWeight: 700, fontFamily: 'inherit', border: `1.5px solid ${COLORS.text}20`, cursor: 'pointer' };
