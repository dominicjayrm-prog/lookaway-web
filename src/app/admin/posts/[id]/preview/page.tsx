import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostBody from '@/components/blog/PostBody';
import { adminGetPost } from '@/lib/blog';
import { extractTocAndInjectIds } from '@/lib/toc';

export const dynamic = 'force-dynamic';

function formatDate(iso: string | null) {
  if (!iso) return 'Not published yet';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function PostPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await adminGetPost(id);
  if (!post) notFound();

  const { html: processedHtml } = extractTocAndInjectIds(post.content_html);

  return (
    <div>
      {/* Preview banner */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: '#D4A01215', border: '1.5px solid #D4A012', borderRadius: 12,
        padding: '12px 16px', marginBottom: 24, gap: 12, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6,
            background: '#D4A012', color: 'white', letterSpacing: 0.4,
          }}>
            {post.published ? 'PUBLISHED' : 'DRAFT'}
          </span>
          <div style={{ fontSize: 13, color: '#1A1A18', fontWeight: 600 }}>
            Preview — {post.published ? 'this is how the post looks publicly' : 'not visible on the public site'}
          </div>
        </div>
        <Link
          href={`/admin/posts/${post.id}`}
          style={{
            fontSize: 13, fontWeight: 600, color: '#6C5CE7', textDecoration: 'none',
            padding: '6px 12px', borderRadius: 8, border: '1.5px solid #6C5CE7',
          }}
        >
          ← Back to editor
        </Link>
      </div>

      {/* Post body, styled like the public /blog/[slug] page */}
      <article style={{
        background: 'white', borderRadius: 16, padding: '40px 48px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.03)', maxWidth: 760, margin: '0 auto',
      }}>
        <header style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, color: '#B2BEC3', marginBottom: 12 }}>
            {formatDate(post.published_at)} · {post.reading_time_minutes} min read
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#1A1A18', margin: 0, lineHeight: 1.15, letterSpacing: -0.8 }}>
            {post.title}
          </h1>
          {post.subtitle && (
            <p style={{ fontSize: 18, color: '#636E72', marginTop: 14, lineHeight: 1.5 }}>{post.subtitle}</p>
          )}
        </header>

        {post.banner_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.banner_url}
            alt={post.banner_alt ?? ''}
            style={{ width: '100%', aspectRatio: '1200/630', objectFit: 'cover', borderRadius: 14, marginBottom: 32 }}
          />
        )}

        <PostBody html={processedHtml} />
      </article>
    </div>
  );
}
