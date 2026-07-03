'use client';

import { useEffect, useMemo, useState } from 'react';
import { COLORS, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;
const GRID = 5;
const TOTAL_CELLS = GRID * GRID;
// Five rounds, one more tile each round. Everyone in the world gets the
// same five patterns on a given day (seeded by the local date).
const ROUND_SIZES = [3, 4, 5, 6, 7];
const FLASH_MS = 1200;
const LIVES = 3;
const STORAGE_KEY = 'blanked_daily_v1';
// Challenge #1 = launch day. Numbering is cosmetic but stable.
const EPOCH = '2026-07-03';

type Phase = 'loading' | 'idle' | 'showing' | 'input' | 'between' | 'done';

interface RoundRecord {
  hits: number;
  wrongs: number;
  total: number;
}

interface StoredResult {
  lastDate: string;
  streak: number;
  rows: string[];
  cleared: number;
}

/** Local calendar date as YYYY-MM-DD. The puzzle rolls over at the
 *  player's local midnight, same as Wordle. */
function localDateStr(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return localDateStr(d);
}

/** Days since the epoch date, so the challenge number is stable. */
function challengeNumber(dateStr: string): number {
  const ms = new Date(dateStr + 'T12:00:00').getTime() - new Date(EPOCH + 'T12:00:00').getTime();
  return Math.max(1, Math.round(ms / 86400000) + 1);
}

/** Deterministic PRNG (mulberry32) seeded from the date string, so every
 *  player sees the same daily patterns. */
function seededRandom(seedStr: string): () => number {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The five target patterns for a given date. */
function dailyPatterns(dateStr: string): Set<number>[] {
  const rand = seededRandom('blanked-' + dateStr);
  return ROUND_SIZES.map((n) => {
    const set = new Set<number>();
    while (set.size < n) {
      set.add(Math.floor(rand() * TOTAL_CELLS));
    }
    return set;
  });
}

function readStored(): StoredResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredResult;
  } catch {
    return null;
  }
}

function emojiRow(r: RoundRecord): string {
  return '🟪'.repeat(r.hits) + '🟥'.repeat(r.wrongs) + '⬜'.repeat(Math.max(0, r.total - r.hits));
}

function msToMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function fmtCountdown(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function DailyChallenge() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [today, setToday] = useState('');
  const [round, setRound] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [target, setTarget] = useState<Set<number>>(new Set());
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const [records, setRecords] = useState<RoundRecord[]>([]);
  const [streak, setStreak] = useState(0);
  const [rows, setRows] = useState<string[]>([]);
  const [cleared, setCleared] = useState(0);
  const [countdown, setCountdown] = useState('');
  const [copied, setCopied] = useState(false);

  // Everything date-dependent happens after mount so SSR output is stable.
  useEffect(() => {
    const date = localDateStr();
    setToday(date);
    const stored = readStored();
    if (stored && stored.lastDate === date) {
      // Already played today: show the result screen with stored data.
      setStreak(stored.streak);
      setRows(stored.rows);
      setCleared(stored.cleared);
      setPhase('done');
    } else {
      setPhase('idle');
    }
  }, []);

  // Countdown ticker on the result screen.
  useEffect(() => {
    if (phase !== 'done') return;
    setCountdown(fmtCountdown(msToMidnight()));
    const t = setInterval(() => setCountdown(fmtCountdown(msToMidnight())), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const patterns = useMemo(() => (today ? dailyPatterns(today) : []), [today]);
  const num = today ? challengeNumber(today) : 0;

  function startRound(r: number) {
    setRound(r);
    setTarget(patterns[r]);
    setPicked(new Set());
    setWrong(new Set());
    setPhase('showing');
  }

  function startGame() {
    setLives(LIVES);
    setRecords([]);
    startRound(0);
  }

  useEffect(() => {
    if (phase !== 'showing') return;
    const t = setTimeout(() => setPhase('input'), FLASH_MS);
    return () => clearTimeout(t);
  }, [phase]);

  function finishGame(allRecords: RoundRecord[]) {
    const clearedCount = allRecords.filter((r) => r.hits === r.total).length;
    const shareRows = allRecords.map(emojiRow);

    const stored = readStored();
    let nextStreak = 1;
    if (stored && stored.lastDate === yesterdayStr()) {
      nextStreak = stored.streak + 1;
    }
    const result: StoredResult = {
      lastDate: today,
      streak: nextStreak,
      rows: shareRows,
      cleared: clearedCount,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } catch {
      // Private browsing: results just will not persist.
    }
    setStreak(nextStreak);
    setRows(shareRows);
    setCleared(clearedCount);
    setPhase('done');
  }

  function endRound(rec: RoundRecord, remainingLives: number) {
    const nextRecords = [...records, rec];
    setRecords(nextRecords);
    if (remainingLives <= 0 || round === ROUND_SIZES.length - 1) {
      finishGame(nextRecords);
      return;
    }
    setPhase('between');
    setTimeout(() => startRound(round + 1), 800);
  }

  function onTileClick(idx: number) {
    if (phase !== 'input') return;
    if (picked.has(idx) || wrong.has(idx)) return;

    if (target.has(idx)) {
      const nextPicked = new Set(picked);
      nextPicked.add(idx);
      setPicked(nextPicked);
      if (nextPicked.size === target.size) {
        endRound({ hits: nextPicked.size, wrongs: wrong.size, total: target.size }, lives);
      }
    } else {
      const nextWrong = new Set(wrong);
      nextWrong.add(idx);
      setWrong(nextWrong);
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        endRound({ hits: picked.size, wrongs: nextWrong.size, total: target.size }, 0);
      }
    }
  }

  function shareText(): string {
    const lines = [
      `Blanked Daily #${num}`,
      `${cleared}/${ROUND_SIZES.length} rounds · 🔥 ${streak} day streak`,
      ...rows,
      'playblanked.com/daily',
    ];
    return lines.join('\n');
  }

  async function onShare() {
    const text = shareText();
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked; nothing sensible to do
    }
  }

  const showing = phase === 'showing';
  const cells = useMemo(() => Array.from({ length: TOTAL_CELLS }, (_, i) => i), []);

  return (
    <div style={wrapper}>
      {/* Status bar */}
      <div style={statusBar}>
        <div>
          <div style={statusLabel}>Challenge</div>
          <div style={statusValue}>{num ? `#${num}` : '—'}</div>
        </div>
        <div>
          <div style={statusLabel}>Round</div>
          <div style={statusValue}>{phase === 'idle' || phase === 'loading' || phase === 'done' ? '—' : `${round + 1}/${ROUND_SIZES.length}`}</div>
        </div>
        <div>
          <div style={statusLabel}>Lives</div>
          <div style={statusValue}>{phase === 'showing' || phase === 'input' || phase === 'between' ? '♥'.repeat(lives) : '—'}</div>
        </div>
      </div>

      {phase !== 'done' && (
        <div role="grid" aria-label="Daily challenge grid" style={grid}>
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
                style={{ ...cell, background: bg, border, cursor: interactive ? 'pointer' : 'default' }}
              />
            );
          })}
        </div>
      )}

      <div style={controls}>
        {phase === 'loading' && <p style={controlLead}>Loading today&rsquo;s challenge…</p>}
        {phase === 'idle' && (
          <>
            <p style={controlLead}>
              Five rounds, same puzzle for everyone today. Tiles flash for just over a second; click the ones you saw. Three lives for the whole run. One attempt per day.
            </p>
            <button type="button" onClick={startGame} style={btnPrimary}>Play today&rsquo;s challenge</button>
          </>
        )}
        {phase === 'showing' && <p style={controlLead}>Memorise the highlighted tiles…</p>}
        {phase === 'input' && <p style={controlLead}>Click the {target.size} tiles you saw flash.</p>}
        {phase === 'between' && <p style={controlLead}>Round {round + 1} done. Next round…</p>}
        {phase === 'done' && (
          <>
            <p style={resultHeadline}>
              Blanked Daily #{num}: <span style={{ color: P.accent }}>{cleared}/{ROUND_SIZES.length} rounds</span>
            </p>
            <div style={emojiBox} aria-label="Your result grid">
              {rows.map((r, i) => (
                <div key={i} style={{ fontSize: 18, lineHeight: 1.5, letterSpacing: 1 }}>{r}</div>
              ))}
            </div>
            <p style={streakLine}>
              🔥 {streak}-day streak · Next challenge in <span style={{ fontVariantNumeric: 'tabular-nums' }}>{countdown}</span>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
              <button type="button" onClick={onShare} style={btnPrimary}>
                {copied ? 'Copied!' : 'Share your result'}
              </button>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={btnAccent}>
                Keep your streak in the app
              </a>
            </div>
            <p style={resultFooter}>
              The web challenge is one puzzle a day. The app has six modes, 400+ levels, and tracks your streak properly, free on iOS.
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
  fontSize: 22, fontWeight: 800, color: COLORS.text, margin: '0 0 12px',
};

const emojiBox: React.CSSProperties = {
  display: 'inline-block',
  padding: '12px 20px',
  borderRadius: 12,
  background: '#FAFAF7',
  border: '1px solid rgba(0,0,0,0.05)',
  marginBottom: 12,
};

const streakLine: React.CSSProperties = {
  fontSize: 14, color: '#636E72', margin: '0 0 16px',
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

const resultFooter: React.CSSProperties = {
  fontSize: 13, color: COLORS.textD, lineHeight: 1.55, marginTop: 8,
  maxWidth: 460, marginLeft: 'auto', marginRight: 'auto',
};
