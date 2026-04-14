import type { BlogPost } from '@/lib/supabase';
import PostCard from './PostCard';

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section style={{ marginTop: 40 }} aria-label="Related posts">
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A18', marginBottom: 20 }}>Keep reading</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {posts.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </section>
  );
}
