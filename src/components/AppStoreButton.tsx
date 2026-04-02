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
      <svg width="20" height="24" viewBox="0 0 170 200" fill="white">
        <path d="M150.4 172.2c-8.2 18.8-12.1 27.2-22.7 43.7-14.7 23-35.5 51.6-61.2 51.9-22.8.3-28.7-14.8-59.7-14.6-31 .2-37.5 15-60.3 14.7-25.5-.3-45.3-26.3-59-49.3C-49.3 158.2-53 86.8-30.7 48.9c15.9-27 41-42.8 64.6-42.8 27.3 0 44.5 14.9 67.1 14.9 21.9 0 35.2-14.9 66.8-14.9 21 0 43.6 11.4 59.5 31.1-52.3 25.3-65.6 74.6-42 135.0zM101.3-25.4c11.2-14.4 19.7-34.7 16.6-55.4-18.3 1.2-39.7 12.9-52.2 28.1-11.4 13.7-20.8 34.1-17.1 53.9 20 .6 40.7-11.3 52.7-26.6z" transform="translate(30,80) scale(0.7)" />
      </svg>
      <div>
        <div style={{ fontSize: 9, fontWeight: 500, opacity: 0.8, lineHeight: 1 }}>Download on the</div>
        <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>App Store</div>
      </div>
    </a>
  );
}
