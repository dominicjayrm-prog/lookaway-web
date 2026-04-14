import PostEditor from '@/components/admin/PostEditor';
import { adminListSlugs } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const existingSlugs = await adminListSlugs();
  return <PostEditor post={null} existingSlugs={existingSlugs} />;
}
