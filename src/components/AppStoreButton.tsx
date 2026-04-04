import { COLORS, APP_STORE_URL } from '@/lib/constants';

export default function AppStoreButton({ style }: { style?: React.CSSProperties }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "12px 22px", borderRadius: 12, background: COLORS.text, color: "white",
        fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", ...style
      }}
    >
      <svg width="18" height="22" viewBox="0 0 384 512" fill="white" aria-hidden="true">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <div>
        <div style={{ fontSize: 9, fontWeight: 500, opacity: 0.8, lineHeight: 1 }}>Download on the</div>
        <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>App Store</div>
      </div>
    </a>
  );
}
