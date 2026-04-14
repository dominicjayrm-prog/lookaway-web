import { notFound } from 'next/navigation';
import PostEditor from '@/components/admin/PostEditor';
import { adminGetPost, adminListSlugs } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await adminGetPost(id);
  if (!post) notFound();
  const existingSlugs = await adminListSlugs(id);
  return <PostEditor post={post} existingSlugs={existingSlugs} />;
}
