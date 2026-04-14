'use client';

import { useState, useTransition } from 'react';
import Blink from '@/components/Blink';
import { loginAction } from '@/app/admin/login/actions';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={onSubmit} style={{
      width: '100%', maxWidth: 380, padding: '36px 32px', borderRadius: 20,
      background: 'white', boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <Blink size={36} expression="normal" />
        <span style={{ fontSize: 16, fontWeight: 700, color: '#6C5CE7' }}>Blanked Admin</span>
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A18', margin: 0 }}>Sign in</h1>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: '#1A1A18' }}>
        Email
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #EEEDE8', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: '#1A1A18' }}>
        Password
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          style={{ padding: '10px 12px', borderRadius: 10, border: '1.5px solid #EEEDE8', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
        />
      </label>

      {error && (
        <div style={{ fontSize: 13, color: '#FF6B6B', padding: '8px 12px', borderRadius: 8, background: '#FF6B6B15' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          padding: '12px 20px', borderRadius: 10, background: '#1A1A18', color: 'white',
          fontSize: 14, fontWeight: 600, border: 'none', cursor: pending ? 'wait' : 'pointer',
          marginTop: 4, opacity: pending ? 0.6 : 1,
        }}
      >
        {pending ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
