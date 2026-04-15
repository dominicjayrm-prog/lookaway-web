'use client';

import { useState } from 'react';

interface Props {
  /** Where this form lives — 'footer', 'blog:<slug>', 'home', etc. */
  source: string;
  /** Optional override for the heading. */
  heading?: string;
  /** Optional override for the subhead. */
  subhead?: string;
  /** Visual treatment. `compact` hides the heading/subhead and renders a single-row form. */
  variant?: 'card' | 'compact';
}

export default function EmailCapture({
  source,
  heading = 'Get memory tips in your inbox',
  subhead = 'Occasional emails on memory science, product updates, and new blog posts. No spam, unsubscribe any time.',
  variant = 'card',
}: Props) {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter an email.');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source, hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setMessage(data?.error || 'Something went wrong. Try again.');
        return;
      }
      setStatus('ok');
      setMessage('Thanks — you\'re in. Keep an eye on your inbox.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Try again in a bit.');
    }
  }

  const isCompact = variant === 'compact';

  return (
    <form
      onSubmit={onSubmit}
      aria-labelledby={isCompact ? undefined : `ec-${source}-heading`}
      style={{
        background: isCompact ? 'transparent' : 'white',
        border: isCompact ? 'none' : '1px solid rgba(0,0,0,0.06)',
        borderRadius: 14,
        padding: isCompact ? 0 : '20px 22px',
      }}
    >
      {!isCompact && (
        <>
          <h3
            id={`ec-${source}-heading`}
            style={{
              fontSize: 20, fontWeight: 800, color: '#1A1A18',
              margin: '0 0 6px', letterSpacing: -0.3,
            }}
          >
            {heading}
          </h3>
          <p style={{ fontSize: 14, color: '#636E72', margin: '0 0 14px', lineHeight: 1.55 }}>
            {subhead}
          </p>
        </>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'ok'}
          aria-label="Email address"
          style={{
            flex: '1 1 220px',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1.5px solid #EEEDE8',
            background: 'white',
            fontSize: 14,
            fontFamily: 'inherit',
            color: '#1A1A18',
            outline: 'none',
            minWidth: 0,
          }}
        />
        {/* Honeypot — visually hidden, bots happily fill it. */}
        <input
          type="text"
          name="hp"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'ok'}
          style={{
            padding: '10px 18px',
            borderRadius: 10,
            background: status === 'ok' ? '#00B894' : '#6C5CE7',
            color: 'white',
            fontSize: 14,
            fontWeight: 700,
            border: 'none',
            cursor: status === 'loading' || status === 'ok' ? 'default' : 'pointer',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'loading' ? 'Subscribing…' : status === 'ok' ? '✓ Subscribed' : 'Subscribe'}
        </button>
      </div>

      {message && (
        <p
          role={status === 'error' ? 'alert' : 'status'}
          style={{
            marginTop: 10, fontSize: 13,
            color: status === 'error' ? '#FF6B6B' : '#00B894',
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
