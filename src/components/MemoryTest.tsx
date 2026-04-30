'use client';

import { useEffect, useMemo, useState } from 'react';
import { COLORS, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;
const GRID = 5;
const TOTAL_CELLS = GRID * GRID;
const START_LEVEL = 3;
const FLASH_MS = 1200;
const LIVES = 3;

type Phase = 'idle' | 'showing' | 'input' | 'result' | 'gameover';

function pickRandomCells(n: number): Set<number> {
  const set = new Set<number>();
  while (set.size < n) {
    set.add(Math.floor(Math.random() * TOTAL_CELLS));
  }
  return set;
}

function percentileLabel(level: number): string {
  if (level >= 11) return 'Elite. You are in roughly the top 5% of players. Most people max out around level 7.';
  if (level >= 9) return 'Excellent. Top ~15%. Strong working-memory capacity.';
  if (level >= 7) return 'Above average. Around the 75th percentile. Solid visual recall.';
  if (level >= 5) return 'About average for adults. The typical working-memory span tops out here for most people.';
  if (level >= 3) return 'Beginner range. Worth practising; most people improve fast in the first couple of weeks.';
  return 'Just getting started. The good news: visual memory is one of the most trainable cognitive skills.';
}

export default function MemoryTest() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(START_LEVEL);
  const [bestLevel, setBestLevel] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [target, setTarget] = useState<Set<number>>(new Set());
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<Set<number>>(new Set());

  // Start (or restart) a level: pick cells, flash them, then accept input.
  function startLevel(nextLevel: number) {
    const cells = pickRandomCells(Math.min(nextLevel, TOTAL_CELLS));
    setTarget(cells);
    setPicked(new Set());
    setWrong(new Set());
    setLevel(nextLevel);
    setPhase('showing');
  }

  function startGame() {
    setLives(LIVES);
    setBestLevel(0);
    startLevel(START_LEVEL);
  }

  // Flash timer: switch from 'showing' to 'input' after FLASH_MS.
  useEffect(() => {
    if (phase !== 'showing') return;
    const t = setTimeout(() => setPhase('input'), FLASH_MS);
    return () => clearTimeout(t);
  }, [phase]);

  function onTileClick(idx: number) {
    if (phase !== 'input') return;
    if (picked.has(idx) || wrong.has(idx)) return;

    if (target.has(idx)) {
      const nextPicked = new Set(picked);
      nextPicked.add(idx);
      setPicked(nextPicked);

      // All target cells found: level cleared.
      if (nextPicked.size === target.size) {
        setBestLevel((b) => Math.max(b, level));
        setPhase('result');
        // Brief pause then advance.
        setTimeout(() => startLevel(level + 1), 700);
      }
    } else {
      const nextWrong = new Set(wrong);
      nextWrong.add(idx);
      setWrong(nextWrong);
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        setBestLevel((b) => Math.max(b, level - 1));
        setPhase('gameover');
      }
    }
  }

  const showing = phase === 'showing';
  const finalLevel = phase === 'gameover' ? bestLevel : level;

  // Memo grid cells so React does not re-create the array each render
  // (also gives us deterministic keys for accessibility).
  const cells = useMemo(() => Array.from({ length: TOTAL_CELLS }, (_, i) => i), []);

  return (
    <div style={wrapper}>
      {/* Status bar */}
      <div style={statusBar}>
        <div>
          <div style={statusLabel}>Level</div>
          <div style={statusValue}>{phase === 'idle' ? '—' : level}</div>
        </div>
        <div>
          <div style={statusLabel}>Best</div>
          <div style={statusValue}>{bestLevel || '—'}</div>
        </div>
        <div>
          <div style={statusLabel}>Lives</div>
          <div style={statusValue}>{phase === 'idle' || phase === 'gameover' ? '—' : '♥'.repeat(lives)}</div>
        </div>
      </div>

      {/* Grid */}
      <div role="grid" aria-label="Memory test grid" style={grid}>
        {cells.map((i) => {
          const isTarget = target.has(i);
          const isPicked = picked.has(i);
          const isWrong = wrong.has(i);
          let bg = 'white';
          let border = '1px solid rgba(0,0,0,0.06)';
          if (showing && isTarget) {
            bg = P.accent;
            border = `1px solid ${P.accent}`;
          } else if (isPicked) {
            bg = P.green;
            border = `1px solid ${P.green}`;
          } else if (isWrong) {
            bg = P.coral;
            border = `1px solid ${P.coral}`;
          }
          const interactive = phase === 'input' && !isPicked && !isWrong;
          return (
            <button
              key={i}
              type="button"
              role="gridcell"
              aria-label={`Cell ${i + 1}`}
              aria-pressed={isPicked}
              disabled={!interactive}
              onClick={() => onTileClick(i)}
              style={{
                ...cell,
                background: bg,
                border,
                cursor: interactive ? 'pointer' : 'default',
              }}
            />
          );
        })}
      </div>

      {/* Footer / controls */}
      <div style={controls}>
        {phase === 'idle' && (
          <>
            <p style={controlLead}>Click <strong>Start</strong>. The grid will flash some tiles for just over a second. When the flash ends, click the same tiles in any order. Three lives.</p>
            <button type="button" onClick={startGame} style={btnPrimary}>Start the test</button>
          </>
        )}
        {phase === 'showing' && (
          <p style={controlLead}>Memorise the highlighted tiles…</p>
        )}
        {phase === 'input' && (
          <p style={controlLead}>Click the {target.size} tiles you saw flash.</p>
        )}
        {phase === 'result' && (
          <p style={controlLead}>Nice. Next level…</p>
        )}
        {phase === 'gameover' && (
          <>
            <p style={resultHeadline}>You reached level <span style={{ color: P.accent }}>{finalLevel}</span>.</p>
            <p style={resultBody}>{percentileLabel(finalLevel)}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={btnAccent}
              >
                Keep training, free on iOS
              </a>
              <button type="button" onClick={startGame} style={btnSecondary}>Try again</button>
            </div>
            <p style={resultFooter}>
              One score is a snapshot. Visual memory is built like a muscle: short, focused, daily practice. That is what Blanked is built for, two minutes a day.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

const wrapper: React.CSSProperties = {
  background: 'white',
  border: '1px solid rgba(0,0,0,0.05)',
  borderRadius: 18,
  padding: 24,
  boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
};

const statusBar: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 16,
  marginBottom: 20,
  textAlign: 'center',
};

const statusLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: COLORS.textD,
  letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4,
};

const statusValue: React.CSSProperties = {
  fontSize: 22, fontWeight: 800, color: COLORS.text,
};

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: `repeat(${GRID}, 1fr)`,
  gap: 8,
  aspectRatio: '1 / 1',
  width: '100%',
  maxWidth: 420,
  margin: '0 auto',
};

const cell: React.CSSProperties = {
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: 10,
  padding: 0,
  transition: 'background 0.15s ease, transform 0.1s ease',
};

const controls: React.CSSProperties = {
  marginTop: 22,
  textAlign: 'center',
};

const controlLead: React.CSSProperties = {
  fontSize: 14, color: '#636E72', lineHeight: 1.6, margin: '0 0 12px',
};

const resultHeadline: React.CSSProperties = {
  fontSize: 22, fontWeight: 800, color: COLORS.text, margin: '0 0 8px',
};

const resultBody: React.CSSProperties = {
  fontSize: 14, color: '#636E72', lineHeight: 1.6, margin: '0 0 18px',
  maxWidth: 480, marginLeft: 'auto', marginRight: 'auto',
};

const btnPrimary: React.CSSProperties = {
  padding: '12px 28px', borderRadius: 12,
  background: COLORS.text, color: 'white',
  fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
  border: 'none', cursor: 'pointer',
};

const btnAccent: React.CSSProperties = {
  display: 'inline-block',
  padding: '12px 24px', borderRadius: 12,
  background: COLORS.accent, color: 'white',
  fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
  border: 'none', cursor: 'pointer', textDecoration: 'none',
};

const btnSecondary: React.CSSProperties = {
  padding: '12px 24px', borderRadius: 12,
  background: 'white', color: COLORS.text,
  fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
  border: `1.5px solid ${COLORS.text}20`, cursor: 'pointer',
};

const resultFooter: React.CSSProperties = {
  fontSize: 13, color: COLORS.textD, lineHeight: 1.55, marginTop: 8,
  maxWidth: 460, marginLeft: 'auto', marginRight: 'auto',
};
