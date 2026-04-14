import { APP_STORE_URL } from '@/lib/constants';
import Blink from '@/components/Blink';

export default function BlogDownloadCTA() {
  return (
    <div style={{
      margin: '48px 0 24px', padding: '36px 32px', borderRadius: 20,
      background: 'linear-gradient(135deg, #6C5CE715, #A29BFE15)',
      border: '1px solid #6C5CE720', textAlign: 'center',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        <Blink size={56} expression="celebrate" />
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1A1A18', marginBottom: 8 }}>
        Train your memory. Play Blanked free.
      </h3>
      <p style={{ fontSize: 14, color: '#636E72', marginBottom: 20 }}>
        A visual memory game backed by science. 6 game modes, 380+ levels.
      </p>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Blanked on the App Store"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 28px', borderRadius: 12,
          background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
          color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none',
          boxShadow: '0 4px 16px #6C5CE730',
        }}
      >
        <svg width="14" height="16" viewBox="0 0 384 512" fill="white" aria-hidden="true">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        Download on the App Store
      </a>
    </div>
  );
}
