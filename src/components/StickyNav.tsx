'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import { COLORS, APP_STORE_URL } from '@/lib/constants';

export default function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(250,250,247,0.85)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      animation: 'navSlideIn 0.3s ease-out',
    }} aria-label="Main navigation">
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '10px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo size={28} id="sticky-nav" />
          <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.accent }}>Blanked</span>
        </div>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Blanked"
          style={{
            padding: '7px 16px', borderRadius: 10, background: COLORS.text,
            color: 'white', fontSize: 12, fontWeight: 600, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          <svg width="12" height="14" viewBox="0 0 384 512" fill="white" aria-hidden="true">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          Download
        </a>
      </div>
    </nav>
  );
}
