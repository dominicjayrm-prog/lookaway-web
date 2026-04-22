import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/supabase';

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{
      display: 'block', background: 'white', borderRadius: 18, overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)',
      textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s, box-shadow 0.2s',
    }}>
      {post.banner_url && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1200/630', background: '#EEEDE8' }}>
          <Image
            src={post.banner_url}
            alt={post.banner_alt ?? ''}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 350px"
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div style={{ padding: '20px 22px 22px' }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1A1A18', margin: '0 0 8px', lineHeight: 1.3 }}>
          {post.title}
        </h3>
        {post.meta_description && (
          <p style={{ fontSize: 14, color: '#636E72', lineHeight: 1.5, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.meta_description}
          </p>
        )}
        <div style={{ display: 'flex', gap: 10, fontSize: 12, color: '#B2BEC3' }}>
          <span>{formatDate(post.published_at)}</span>
          <span>·</span>
          <span>{post.reading_time_minutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
