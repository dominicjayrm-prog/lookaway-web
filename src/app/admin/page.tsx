import Link from 'next/link';
import { adminListPosts } from '@/lib/blog';
import PostList from '@/components/admin/PostList';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const posts = await adminListPosts();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#1A1A18', margin: 0, letterSpacing: -0.5 }}>Posts</h1>
          <p style={{ fontSize: 14, color: '#636E72', margin: '4px 0 0' }}>
            {posts.length} total · {posts.filter(p => p.published).length} published
          </p>
        </div>
        <Link href="/admin/posts/new" style={{
          padding: '10px 18px', borderRadius: 10, background: '#6C5CE7', color: 'white',
          fontSize: 13, fontWeight: 600, textDecoration: 'none',
        }}>
          + New post
        </Link>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
