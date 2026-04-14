'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '@/lib/constants';
import Blink from './Blink';

type Phase = 'memorise' | 'goBlank' | 'question' | 'complete';
type QuestionState = 'idle' | 'selected' | 'correct';

export default function PhoneMockup() {
  const [phase, setPhase] = useState<Phase>('memorise');
  const [timerWidth, setTimerWidth] = useState(85);
  const [questionState, setQuestionState] = useState<QuestionState>('idle');
  const [starsShown, setStarsShown] = useState(0);

  useEffect(() => {
    const ts: ReturnType<typeof setTimeout>[] = [];
    let timerIv: ReturnType<typeof setInterval>;

    const loop = () => {
      setPhase('memorise');
      setTimerWidth(85);
      setQuestionState('idle');
      setStarsShown(0);

      timerIv = setInterval(() => setTimerWidth(w => Math.max(3, w - 0.41)), 50);

      // Phase 1: Go Blank at 4s
      ts.push(setTimeout(() => {
        clearInterval(timerIv);
        setPhase('goBlank');
      }, 4000));

      // Phase 2: Question at 5s
      ts.push(setTimeout(() => {
        setPhase('question');
        setQuestionState('idle');
      }, 5000));

      ts.push(setTimeout(() => setQuestionState('selected'), 6200));
      ts.push(setTimeout(() => setQuestionState('correct'), 7200));

      // Phase 3: Complete at 9.5s
      ts.push(setTimeout(() => {
        setPhase('complete');
        setStarsShown(0);
      }, 9500));

      ts.push(setTimeout(() => setStarsShown(1), 10000));
      ts.push(setTimeout(() => setStarsShown(2), 10300));
      ts.push(setTimeout(() => setStarsShown(3), 10600));

      // Loop at 13.5s
      ts.push(setTimeout(loop, 13500));
    };

    loop();
    return () => {
      ts.forEach(clearTimeout);
      clearInterval(timerIv);
    };
  }, []);

  const timerColor = timerWidth > 40 ? COLORS.green : timerWidth > 20 ? COLORS.gold : COLORS.coral;

  const options = [
    { letter: 'A', label: 'Circle' },
    { letter: 'B', label: 'Square' },
    { letter: 'C', label: 'Diamond' },
    { letter: 'D', label: 'Star' },
  ];

  const renderMemoriseScreen = () => (
    <div style={{ padding: '34px 14px 14px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: COLORS.textD, fontWeight: 300 }}>&#x2715;</span>
        <div style={{ padding: '2px 10px', borderRadius: 8, background: `${COLORS.green}10`, border: `1px solid ${COLORS.green}18` }}>
          <span style={{ fontSize: 8, fontWeight: 700, color: COLORS.green, letterSpacing: 0.5 }}>LEVEL 11</span>
        </div>
        <div style={{ width: 12 }} />
      </div>

      {/* Timer bar */}
      <div style={{ height: 4, borderRadius: 2, background: '#E8E6E1', margin: '4px 0 8px' }}>
        <div style={{
          width: `${timerWidth}%`, height: '100%', borderRadius: 2,
          background: timerColor,
          transition: 'width 0.06s linear, background 0.3s',
        }} />
      </div>

      {/* Instruction */}
      <div style={{ fontSize: 11, textAlign: 'center', color: COLORS.textD, marginBottom: 8, fontWeight: 500 }}>
        Memorise this scene!
      </div>

      {/* Canvas with shapes */}
      <div style={{
        width: '100%', aspectRatio: '1', background: 'white', borderRadius: 14,
        position: 'relative', boxShadow: '0 1px 8px rgba(0,0,0,0.03)',
      }}>
        {/* Coral circle */}
        <div style={{ position: 'absolute', left: '14%', top: '14%', width: 38, height: 38, borderRadius: '50%', background: COLORS.coral }} />
        {/* Blue square */}
        <div style={{ position: 'absolute', right: '14%', top: '13%', width: 38, height: 38, borderRadius: 8, background: COLORS.blue }} />
        {/* Purple star */}
        <svg aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translateX(-50%)' }} width="36" height="36" viewBox="0 0 100 100">
          <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill={COLORS.accent} />
        </svg>
        {/* Green triangle */}
        <svg aria-hidden="true" style={{ position: 'absolute', left: '12%', bottom: '12%' }} width="40" height="40" viewBox="0 0 100 100">
          <polygon points="50,8 95,88 5,88" fill={COLORS.green} />
        </svg>
        {/* Gold diamond */}
        <svg aria-hidden="true" style={{ position: 'absolute', right: '14%', bottom: '14%' }} width="34" height="34" viewBox="0 0 100 100">
          <polygon points="50,5 95,50 50,95 5,50" fill={COLORS.gold} />
        </svg>
      </div>
    </div>
  );

  const renderQuestionScreen = () => (
    <div style={{ padding: '34px 14px 14px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: COLORS.textD, fontWeight: 300 }}>&#x2715;</span>
        <div style={{ padding: '2px 10px', borderRadius: 8, background: `${COLORS.green}10`, border: `1px solid ${COLORS.green}18` }}>
          <span style={{ fontSize: 8, fontWeight: 700, color: COLORS.green, letterSpacing: 0.5 }}>LEVEL 11</span>
        </div>
        <div style={{ width: 12 }} />
      </div>

      {/* Static progress bar at 55% */}
      <div style={{ height: 4, borderRadius: 2, background: '#E8E6E1', margin: '4px 0 8px' }}>
        <div style={{ width: '55%', height: '100%', borderRadius: 2, background: COLORS.green }} />
      </div>

      {/* Question label */}
      <div style={{ fontSize: 7, color: COLORS.textD, letterSpacing: 0.5, textAlign: 'center', marginBottom: 6, fontWeight: 600 }}>
        QUESTION 1 OF 5
      </div>

      {/* Question text */}
      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, textAlign: 'center', marginBottom: 12 }}>
        What shape was in the centre?
      </div>

      {/* Answer options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        {options.map((opt, i) => {
          const isD = i === 3;
          const isSelected = isD && questionState === 'selected';
          const isCorrect = isD && questionState === 'correct';
          const isDimmed = questionState === 'correct' && !isD;

          let bg = '#F5F4F0';
          let color = '#636E72';
          let border = 'none';
          let transform = 'scale(1)';

          if (isSelected) {
            bg = `${COLORS.accent}08`;
            border = `1.5px solid ${COLORS.accent}`;
            color = COLORS.accent;
          } else if (isCorrect) {
            bg = `${COLORS.green}10`;
            border = `1.5px solid ${COLORS.green}`;
            color = COLORS.green;
            transform = 'scale(1.02)';
          }

          return (
            <div key={i} style={{
              padding: 9, borderRadius: 9, fontSize: 10, fontWeight: 600,
              background: bg, color, border,
              opacity: isDimmed ? 0.35 : 1,
              transform,
              transition: 'all 0.3s ease',
            }}>
              {opt.letter}  {opt.label}{isCorrect ? ' \u2713' : ''}
            </div>
          );
        })}
      </div>

      {/* Power-ups bar */}
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 4px' }}>
        {/* Peek */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.4 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#E8E6E1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24"><path d="M12,4 C4,4 1,12 1,12 C1,12 4,20 12,20 C20,20 23,12 23,12 C23,12 20,4 12,4Z" fill="none" stroke="#00CEC9" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="#00CEC9"/></svg>
          </div>
          <span style={{ fontSize: 7, color: COLORS.textD, fontWeight: 600 }}>x0</span>
          <span style={{ fontSize: 6.5, color: COLORS.textD }}>Peek</span>
        </div>
        {/* 50/50 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `${COLORS.green}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: COLORS.green }}>50</span>
          </div>
          <span style={{ fontSize: 7, color: COLORS.text, fontWeight: 600 }}>x2</span>
          <span style={{ fontSize: 6.5, color: COLORS.textD }}>50/50</span>
        </div>
        {/* Skip */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.4 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#E8E6E1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24"><path d="M5,4 L15,12 L5,20Z" fill={COLORS.gold}/><line x1="18" y1="4" x2="18" y2="20" stroke={COLORS.gold} strokeWidth="2"/></svg>
          </div>
          <span style={{ fontSize: 7, color: COLORS.textD, fontWeight: 600 }}>x0</span>
          <span style={{ fontSize: 6.5, color: COLORS.textD }}>Skip</span>
        </div>
      </div>
    </div>
  );

  const renderCompleteScreen = () => (
    <div style={{
      padding: '34px 14px 14px', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Level label */}
      <div style={{ fontSize: 9, color: COLORS.textD, fontWeight: 600, letterSpacing: 0.5, marginBottom: 6 }}>
        LEVEL 11
      </div>

      {/* Level Complete text */}
      <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.green, marginBottom: 14 }}>
        Level Complete!
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[1, 2, 3].map(n => (
          <span key={n} style={{
            fontSize: 28, color: COLORS.gold, display: 'inline-block',
            animation: starsShown >= n ? 'starPop 0.4s ease-out forwards' : 'none',
            opacity: starsShown >= n ? 1 : 0,
            animationDelay: '0s',
          }}>
            &#x2605;
          </span>
        ))}
      </div>

      {/* Score */}
      <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.text, lineHeight: 1 }}>92%</div>
      <div style={{ fontSize: 11, color: COLORS.textD, marginTop: 4 }}>4/5 correct</div>

      {/* Gems pill */}
      <div style={{
        marginTop: 12, padding: '5px 14px', borderRadius: 12,
        background: `${COLORS.green}10`, display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <span style={{ fontSize: 11 }}>&#x1F48E;</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.green }}>+3 gems</span>
      </div>

      {/* Next Level button */}
      <div style={{
        marginTop: 20, width: '100%', padding: '10px 0', borderRadius: 10,
        background: COLORS.accent, textAlign: 'center',
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>Next Level</span>
      </div>
    </div>
  );

  const renderGoBlankScreen = () => (
    <div style={{ padding: '34px 14px 14px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Blink size={50} expression="blank" />
      <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.accent }}>Go blank!</div>
      <div style={{ fontSize: 11, color: '#636E72' }}>What do you remember?</div>
    </div>
  );

  const screens: Record<Phase, () => React.JSX.Element> = {
    memorise: renderMemoriseScreen,
    goBlank: renderGoBlankScreen,
    question: renderQuestionScreen,
    complete: renderCompleteScreen,
  };

  return (
    <>
      <style>{`
        @keyframes starPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="phone-bob">
          {/* Phone frame */}
          <div style={{
            width: 270, height: 555, borderRadius: 38, background: '#1A1A18',
            padding: 7, position: 'relative',
            boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1)',
          }}>
            {/* Notch */}
            <div style={{
              position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)',
              width: 85, height: 22, borderRadius: 11, background: '#1A1A18', zIndex: 10,
            }} />
            {/* Inner screen */}
            <div style={{
              width: '100%', height: '100%', borderRadius: 32, background: COLORS.bg,
              overflow: 'hidden', position: 'relative',
            }}>
              {/* Phase content with crossfade */}
              <div key={phase} style={{
                height: '100%',
                animation: 'screenFadeIn 0.35s ease-out',
              }}>
                {screens[phase]()}
              </div>
            </div>
            {/* Home indicator */}
            <div style={{
              position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
              width: 95, height: 4, borderRadius: 2, background: '#555',
            }} />
          </div>
        </div>
      </div>
    </>
  );
}
