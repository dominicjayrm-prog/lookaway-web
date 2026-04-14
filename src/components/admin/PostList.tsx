'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { BlogPost } from '@/lib/supabase';

function formatDate(iso: string | null) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PostList({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function onDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    setDeletingId(null);
    if (res.ok) {
      router.refresh();
    } else {
      alert('Delete failed');
    }
  }

  if (posts.length === 0) {
    return (
      <div style={{ padding: 60, textAlign: 'center', background: 'white', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.03)' }}>
        <p style={{ fontSize: 15, color: '#636E72', marginBottom: 16 }}>No posts yet.</p>
        <Link href="/admin/posts/new" style={{
          padding: '10px 20px', borderRadius: 10, background: '#6C5CE7', color: 'white',
          fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-block',
        }}>
          Write your first post
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#FAFAF7', borderBottom: '1px solid #EEEDE8' }}>
            <th style={th}>Title</th>
            <th style={th}>Slug</th>
            <th style={th}>Status</th>
            <th style={th}>Updated</th>
            <th style={{ ...th, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #F5F4F0' }}>
              <td style={td}>
                <Link href={`/admin/posts/${p.id}`} style={{ fontWeight: 600, color: '#1A1A18' }}>
                  {p.title || '(untitled)'}
                </Link>
              </td>
              <td style={{ ...td, color: '#636E72', fontSize: 13 }}>/{p.slug}</td>
              <td style={td}>
                {p.published
                  ? <span style={badge('#00B89415', '#00B894')}>Published</span>
                  : <span style={badge('#D4A01215', '#D4A012')}>Draft</span>}
              </td>
              <td style={{ ...td, color: '#636E72', fontSize: 13 }}>{formatDate(p.updated_at)}</td>
              <td style={{ ...td, textAlign: 'right' }}>
                <Link href={`/admin/posts/${p.id}`} style={actionLink}>Edit</Link>
                {p.published && (
                  <Link href={`/blog/${p.slug}`} target="_blank" rel="noopener" style={actionLink}>View</Link>
                )}
                <button onClick={() => onDelete(p.id, p.title)} disabled={deletingId === p.id} style={{ ...actionLink, color: '#FF6B6B', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  {deletingId === p.id ? '…' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = { padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 0.5, textTransform: 'uppercase' };
const td: React.CSSProperties = { padding: '14px 16px', fontSize: 14 };
const actionLink: React.CSSProperties = { fontSize: 13, color: '#636E72', marginLeft: 12, fontWeight: 600, textDecoration: 'none', padding: 0 };
const badge = (bg: string, color: string): React.CSSProperties => ({ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6, background: bg, color });
