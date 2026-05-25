'use client';

import { useEffect, useState } from 'react';
import { COLORS, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;
const GRID = 3; // 3x3 = 9 cells
const TOTAL_CELLS = GRID * GRID;
const START_LEN = 3;
const FLASH_ON_MS = 500;
const FLASH_OFF_MS = 250;
const PAUSE_BEFORE_INPUT_MS = 400;
const LIVES = 3;

type Phase = 'idle' | 'showing' | 'input' | 'wrong' | 'gameover';

function makeSequence(len: number): number[] {
  // Allow consecutive repeats; classical Corsi did not, but for a more
  // forgiving consumer test allowing repeats is fine and reduces visual
  // confusion when the same tile lights twice in a row.
  const out: number[] = [];
  for (let i = 0; i < len; i++) {
    out.push(Math.floor(Math.random() * TOTAL_CELLS));
  }
  return out;
}

function levelLabel(level: number): string {
  if (level >= 12) return 'Outlier. Top 1-2% on Corsi-style tasks; you have either practised before or you have an unusual visuospatial span.';
  if (level >= 10) return 'Excellent. Top ~10%. Strong working-memory span.';
  if (level >= 8) return 'Above average. Around the 75th percentile.';
  if (level >= 6) return 'About average for adults. Typical Corsi block-tapping span tops out here for most people.';
  if (level >= 4) return 'Beginner range. Sequence memory is one of the more trainable cognitive skills; most people improve fast.';
  return 'Just getting started. Take it again in a couple of weeks of daily practice and see the difference.';
}

export default function SequenceMemoryTest() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(START_LEN);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [sequence, setSequence] = useState<number[]>([]);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [position, setPosition] = useState(0); // how many correct so far in this round

  function startGame() {
    setLives(LIVES);
    setBest(0);
    setLevel(START_LEN);
    startRound(START_LEN);
  }

  function startRound(len: number) {
    const seq = makeSequence(len);
    setSequence(seq);
    setHighlighted(null);
    setPosition(0);
    setLevel(len);
    setPhase('showing');
  }

  // Play back the sequence with flashes.
  useEffect(() => {
    if (phase !== 'showing') return;
    if (sequence.length === 0) return;

    let i = 0;
    let mounted = true;

    function step() {
      if (!mounted) return;
      if (i >= sequence.length) {
        setHighlighted(null);
        // Brief settle pause, then accept input.
        setTimeout(() => {
          if (!mounted) return;
          setPhase('input');
        }, PAUSE_BEFORE_INPUT_MS);
        return;
      }
      setHighlighted(sequence[i]);
      setTimeout(() => {
        if (!mounted) return;
        setHighlighted(null);
        setTimeout(() => {
          if (!mounted) return;
          i += 1;
          step();
        }, FLASH_OFF_MS);
      }, FLASH_ON_MS);
    }
    step();

    return () => { mounted = false; };
  }, [phase, sequence]);

  function onTileClick(idx: number) {
    if (phase !== 'input') return;
    if (idx === sequence[position]) {
      const next = position + 1;
      // Brief flash to confirm the press
      setHighlighted(idx);
      setTimeout(() => setHighlighted(null), 150);
      if (next === sequence.length) {
        // Round cleared.
        setBest((b) => Math.max(b, level));
        const nextLen = level + 1;
        // Tiny pause then next round
        setTimeout(() => startRound(nextLen), 500);
      } else {
        setPosition(next);
      }
    } else {
      // Wrong tap
      setHighlighted(idx);
      setPhase('wrong');
      setTimeout(() => setHighlighted(null), 250);
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        setBest((b) => Math.max(b, level - 1));
        setTimeout(() => setPhase('gameover'), 600);
      } else {
        // Retry the same round at the same length
        setTimeout(() => startRound(level), 700);
      }
    }
  }

  const showingIdx = phase === 'showing' || phase === 'wrong' || phase === 'input' ? highlighted : null;

  return (
    <div style={wrapper}>
      <div style={statusBar}>
        <div><div style={statusLabel}>Level</div><div style={statusValue}>{phase === 'idle' ? '—' : level}</div></div>
        <div><div style={statusLabel}>Best</div><div style={statusValue}>{best || '—'}</div></div>
        <div><div style={statusLabel}>Lives</div><div style={statusValue}>{phase === 'idle' || phase === 'gameover' ? '—' : '♥'.repeat(lives)}</div></div>
      </div>

      <div role="grid" aria-label="Sequence memory test grid" style={grid}>
        {Array.from({ length: TOTAL_CELLS }, (_, i) => i).map((i) => {
          const lit = showingIdx === i;
          const interactive = phase === 'input';
          return (
            <button
              key={i}
              type="button"
              role="gridcell"
              aria-label={`Cell ${i + 1}`}
              disabled={!interactive}
              onClick={() => onTileClick(i)}
              style={{
                ...cell,
                background: lit ? P.accent : 'white',
                border: `1px solid ${lit ? P.accent : 'rgba(0,0,0,0.06)'}`,
                cursor: interactive ? 'pointer' : 'default',
              }}
            />
          );
        })}
      </div>

      <div style={controls}>
        {phase === 'idle' && (
          <>
            <p style={controlLead}>Press <strong>Start</strong>. Tiles will light up in a sequence; reproduce the sequence in the same order. Each cleared round adds one more tile.</p>
            <button type="button" onClick={startGame} style={btnPrimary}>Start the test</button>
          </>
        )}
        {phase === 'showing' && <p style={controlLead}>Watch the sequence…</p>}
        {phase === 'input' && <p style={controlLead}>Now tap the tiles in the same order. ({position}/{sequence.length} so far)</p>}
        {phase === 'wrong' && <p style={controlLead}>Not quite. {lives - 1} {lives - 1 === 1 ? 'life' : 'lives'} left.</p>}
        {phase === 'gameover' && (
          <>
            <p style={resultHeadline}>You reached level <span style={{ color: P.accent }}>{best}</span>.</p>
            <p style={resultBody}>{levelLabel(best)}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={btnAccent}>Train this in the app, free</a>
              <button type="button" onClick={startGame} style={btnSecondary}>Try again</button>
            </div>
            <p style={resultFooter}>Sequence memory is one of the more trainable cognitive skills. Two minutes a day of Blanked\'s Sequence mode produces measurable gains within a few weeks.</p>
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
const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: 10, aspectRatio: '1 / 1', width: '100%', maxWidth: 360, margin: '0 auto' };
const cell: React.CSSProperties = { width: '100%', aspectRatio: '1 / 1', borderRadius: 12, padding: 0, transition: 'background 0.1s ease' };
const controls: React.CSSProperties = { marginTop: 22, textAlign: 'center' };
const controlLead: React.CSSProperties = { fontSize: 14, color: '#636E72', lineHeight: 1.6, margin: '0 0 12px' };
const resultHeadline: React.CSSProperties = { fontSize: 22, fontWeight: 800, color: COLORS.text, margin: '0 0 8px' };
const resultBody: React.CSSProperties = { fontSize: 14, color: '#636E72', lineHeight: 1.6, margin: '0 0 18px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' };
const resultFooter: React.CSSProperties = { fontSize: 13, color: COLORS.textD, lineHeight: 1.55, marginTop: 8, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' };
const btnPrimary: React.CSSProperties = { padding: '12px 28px', borderRadius: 12, background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', border: 'none', cursor: 'pointer' };
const btnAccent: React.CSSProperties = { display: 'inline-block', padding: '12px 24px', borderRadius: 12, background: COLORS.accent, color: 'white', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', border: 'none', cursor: 'pointer', textDecoration: 'none' };
const btnSecondary: React.CSSProperties = { padding: '12px 24px', borderRadius: 12, background: 'white', color: COLORS.text, fontSize: 15, fontWeight: 700, fontFamily: 'inherit', border: `1.5px solid ${COLORS.text}20`, cursor: 'pointer' };
