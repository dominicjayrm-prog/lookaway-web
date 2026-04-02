import { COLORS } from '@/lib/constants';

interface WorldCardProps {
  number: number;
  name: string;
  desc: string;
  objects: string;
  color: string;
  hint: string;
}

export default function WorldCard({ number, name, desc, objects, color, hint }: WorldCardProps) {
  return (
    <div style={{
      minWidth: 210, padding: "20px 22px", borderRadius: 18, background: "white",
      boxShadow: "0 2px 16px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.03)", flexShrink: 0
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 8, background: `${color}10` }}>
          <span style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 0.5 }}>WORLD {number}</span>
        </div>
        <div style={{ fontSize: 16 }}>{hint}</div>
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 12, color: COLORS.textD, lineHeight: 1.4, marginBottom: 10 }}>{desc}</div>
      <div style={{ fontSize: 11, color: COLORS.textM, fontWeight: 600 }}>{objects}</div>
    </div>
  );
}
