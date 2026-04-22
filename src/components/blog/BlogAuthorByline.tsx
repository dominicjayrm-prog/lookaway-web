import Link from 'next/link';
import Image from 'next/image';
import { FOUNDER } from '@/lib/constants';

/**
 * Small author strip shown near the post title. Avatar + name + role + date +
 * reading time. Name links to /about for SEO authorship signal.
 */
export default function BlogAuthorByline({
  publishedAt,
  readingTime,
}: {
  publishedAt: string;
  readingTime: number;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      fontSize: 13, color: '#636E72',
    }}>
      <Image
        src={FOUNDER.avatar}
        alt={`${FOUNDER.name}, ${FOUNDER.role} of Blanked`}
        width={36}
        height={36}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          objectFit: 'cover', background: '#EEEDE8',
          flexShrink: 0,
        }}
      />
      <div style={{ lineHeight: 1.35 }}>
        <div>
          <Link
            href="/about"
            rel="author"
            style={{ color: '#1A1A18', fontWeight: 700, textDecoration: 'none' }}
          >
            {FOUNDER.name}
          </Link>
          <span style={{ color: '#B2BEC3' }}> · {FOUNDER.role}</span>
        </div>
        <div style={{ color: '#B2BEC3', fontSize: 12 }}>
          {publishedAt} · {readingTime} min read
        </div>
      </div>
    </div>
  );
}
