import Link from 'next/link';
import Image from 'next/image';
import { FOUNDER } from '@/lib/constants';

/**
 * "About the author" card placed after the post body. Gives Google a clear
 * author entity on every post and gives readers a one-click path to follow
 * along on LinkedIn / Instagram / email.
 */
export default function BlogAuthorCard() {
  return (
    <aside
      aria-label="About the author"
      style={{
        marginTop: 40, padding: '20px 22px',
        background: 'white', border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: 14, display: 'grid',
        gridTemplateColumns: '72px 1fr', gap: 18, alignItems: 'start',
      }}
      className="author-card"
    >
      <Image
        src={FOUNDER.avatar}
        alt={`${FOUNDER.name}, ${FOUNDER.role} of Blanked`}
        width={72}
        height={72}
        style={{
          width: 72, height: 72, borderRadius: '50%',
          objectFit: 'cover', background: '#EEEDE8',
        }}
      />
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 0.5, marginBottom: 4 }}>
          WRITTEN BY
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#1A1A18' }}>
          <Link href="/about" rel="author" style={{ color: 'inherit', textDecoration: 'none' }}>
            {FOUNDER.name}
          </Link>
          <span style={{ color: '#B2BEC3', fontWeight: 500, fontSize: 14 }}>  ·  {FOUNDER.role}, Blanked</span>
        </div>
        <p style={{ fontSize: 14, color: '#636E72', lineHeight: 1.55, margin: '6px 0 12px' }}>
          {FOUNDER.bio}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" style={chip}>LinkedIn ↗</a>
          <a href={FOUNDER.instagram} target="_blank" rel="noopener noreferrer" style={chip}>Instagram ↗</a>
          <a href={`mailto:${FOUNDER.email}`} style={chip}>Email ↗</a>
          <Link href="/about" style={chip}>About the team →</Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 520px) {
          .author-card { grid-template-columns: 1fr !important; text-align: left; }
          .author-card > img { width: 60px !important; height: 60px !important; }
        }
      `}</style>
    </aside>
  );
}

const chip: React.CSSProperties = {
  padding: '6px 12px', borderRadius: 8,
  border: '1px solid #EEEDE8', background: 'white',
  color: '#1A1A18', fontSize: 13, fontWeight: 600,
  textDecoration: 'none',
};
