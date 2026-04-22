import Link from 'next/link';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS } from '@/lib/constants';

const P = COLORS;

/**
 * "Latest from the blog" section for the home page.
 * Renders the 3 most recent published posts with title + excerpt.
 * Adds internal links (big SEO signal) + extra text content
 * (fixes the "thin content" flag from the audit).
 */
export default async function LatestPosts() {
  const posts = await listPublishedPosts().catch(() => []);
  if (posts.length === 0) return null;
  const display = posts.slice(0, 3);

  return (
    <section
      id="blog"
      style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 20px' }}
      aria-label="Latest from the blog"
    >
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2,
          textTransform: 'uppercase', marginBottom: 8,
        }}>
          From the blog
        </div>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.3 }}>
          Memory science, tips &amp; brain training insights
        </h2>
        <p style={{ fontSize: 16, color: '#636E72', maxWidth: 520, margin: '12px auto 0', lineHeight: 1.6 }}>
          Practical articles on how memory works, how to improve it, and the science behind brain training games.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {display.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            style={{
              display: 'block', textDecoration: 'none',
              background: 'white', borderRadius: 14,
              border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
              padding: '22px 20px',
              transition: 'box-shadow 150ms, transform 150ms',
            }}
          >
            <h3 style={{
              fontSize: 16, fontWeight: 700, color: P.text,
              margin: '0 0 8px', lineHeight: 1.35,
            }}>
              {post.title}
            </h3>
            <p style={{
              fontSize: 14, color: '#636E72', lineHeight: 1.55,
              margin: 0,
              display: '-webkit-box', WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {post.subtitle || post.meta_description || ''}
            </p>
            <div style={{ fontSize: 12, color: P.accent, fontWeight: 600, marginTop: 12 }}>
              Read more →
            </div>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Link
          href="/blog"
          style={{
            fontSize: 14, fontWeight: 600, color: P.accent,
            textDecoration: 'none',
            padding: '10px 20px', borderRadius: 10,
            border: `1.5px solid ${P.accent}30`,
            display: 'inline-block',
          }}
        >
          View all posts →
        </Link>
      </div>
    </section>
  );
}
