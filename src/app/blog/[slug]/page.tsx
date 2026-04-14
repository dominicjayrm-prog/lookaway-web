import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPublishedPostBySlug, getRelatedPosts } from '@/lib/blog';
import PostBody from '@/components/blog/PostBody';
import BlogDownloadCTA from '@/components/blog/BlogDownloadCTA';
import RelatedPosts from '@/components/blog/RelatedPosts';
import Footer from '@/components/Footer';
import Blink from '@/components/Blink';
import { SITE_URL } from '@/lib/constants';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: 'Not found', robots: { index: false } };

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.subtitle || undefined;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const img = post.banner_url || '/opengraph-image';

  return {
    title,
    description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: [{ url: img, alt: post.banner_alt || post.title }],
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: ['Blanked'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [img],
    },
  };
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.subtitle || undefined,
    image: post.banner_url || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    keywords: post.keywords?.join(', '),
    wordCount: post.word_count,
  };

  return (
    <div style={{ background: '#FAFAF7', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: '#6C5CE7' }}>Blanked</span>
        </Link>
        <Link href="/blog" style={{ fontSize: 13, color: '#636E72', fontWeight: 600 }}>← Back to blog</Link>
      </header>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 80px' }}>
        <header style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, color: '#B2BEC3', marginBottom: 12 }}>
            {formatDate(post.published_at)} · {post.reading_time_minutes} min read
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: '#1A1A18', margin: 0, lineHeight: 1.15, letterSpacing: -0.8 }}>
            {post.title}
          </h1>
          {post.subtitle && (
            <p style={{ fontSize: 19, color: '#636E72', marginTop: 14, lineHeight: 1.5 }}>{post.subtitle}</p>
          )}
        </header>

        {post.banner_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.banner_url}
            alt={post.banner_alt ?? ''}
            style={{ width: '100%', aspectRatio: '1200/630', objectFit: 'cover', borderRadius: 16, marginBottom: 32 }}
          />
        )}

        <PostBody html={post.content_html} />

        <BlogDownloadCTA />

        <RelatedPosts posts={related} />
      </article>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>
    </div>
  );
}
