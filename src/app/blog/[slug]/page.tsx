import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPostBySlug, getRelatedPosts } from '@/lib/blog';
import { extractTocAndInjectIds } from '@/lib/toc';
import { buildFaqJsonLd } from '@/lib/faqs';
import PostBody from '@/components/blog/PostBody';
import BlogDownloadCTA from '@/components/blog/BlogDownloadCTA';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ReadingProgress from '@/components/blog/ReadingProgressLoader';
import Toc from '@/components/blog/Toc';
import BlogFaqs from '@/components/blog/BlogFaqs';
import ShareButtons from '@/components/blog/ShareButtons';
import BlogAuthorByline from '@/components/blog/BlogAuthorByline';
import BlogAuthorCard from '@/components/blog/BlogAuthorCard';
import EmailCapture from '@/components/EmailCapture';
import Footer from '@/components/Footer';
import Blink from '@/components/Blink';
import { SITE_URL, FOUNDER } from '@/lib/constants';

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
  const { html: processedHtml, items: tocItems } = extractTocAndInjectIds(post.content_html);
  const faqs = Array.isArray(post.faqs) ? post.faqs : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.subtitle || undefined,
    image: post.banner_url || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    // Author as a Person with sameAs so Google can merge the author entity
    // across profiles. Big E-E-A-T signal for a small-site founder blog.
    author: {
      '@type': 'Person',
      name: FOUNDER.fullName,
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}${FOUNDER.avatar}`,
      jobTitle: FOUNDER.role,
      worksFor: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
      sameAs: [FOUNDER.linkedin, FOUNDER.instagram],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Blanked',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    keywords: post.keywords?.join(', '),
    wordCount: post.word_count,
  };

  const faqJsonLd = faqs.length > 0 ? buildFaqJsonLd(faqs) : null;

  return (
    <div style={{ background: '#FAFAF7', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <ReadingProgress />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: '#6C5CE7' }}>Blanked</span>
        </Link>
        <Link href="/blog" style={{ fontSize: 13, color: '#636E72', fontWeight: 600 }}>← Back to blog</Link>
      </header>

      <div className="blog-layout">
        <article className="blog-article">
          <header style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 42, fontWeight: 800, color: '#1A1A18', margin: 0, lineHeight: 1.15, letterSpacing: -0.8 }}>
              {post.title}
            </h1>
            {post.subtitle && (
              <p style={{ fontSize: 19, color: '#636E72', marginTop: 14, lineHeight: 1.5 }}>{post.subtitle}</p>
            )}
            <div style={{ marginTop: 20 }}>
              <BlogAuthorByline
                publishedAt={formatDate(post.published_at)}
                readingTime={post.reading_time_minutes}
              />
            </div>
          </header>

          {post.banner_url && (
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1200/630', marginBottom: 32 }}>
              <Image
                src={post.banner_url}
                alt={post.banner_alt ?? ''}
                fill
                sizes="(max-width: 760px) 100vw, 760px"
                priority
                style={{ objectFit: 'cover', borderRadius: 16 }}
              />
            </div>
          )}

          {/* Mobile-only TOC (collapsed by default) */}
          {tocItems.length > 0 && (
            <details className="blog-toc-mobile">
              <summary style={{
                padding: '12px 16px', background: 'white', borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, color: '#1A1A18',
                listStyle: 'none', marginBottom: 24,
              }}>
                On this page ({tocItems.length})
              </summary>
              <div style={{ marginBottom: 24, padding: '0 10px' }}>
                <Toc items={tocItems} />
              </div>
            </details>
          )}

          <PostBody html={processedHtml} />

          <ShareButtons
            url={`${SITE_URL}/blog/${post.slug}`}
            title={post.title}
          />

          <BlogAuthorCard />

          <BlogFaqs faqs={faqs} />

          <div style={{ marginTop: 40 }}>
            <EmailCapture
              source={`blog:${post.slug}`}
              heading="Enjoyed this? Get more in your inbox."
              subhead="A short email when a new Blanked post goes up. Memory science, product stories, and the occasional tip. No spam."
            />
          </div>

          <BlogDownloadCTA />

          <RelatedPosts posts={related} />
        </article>

        <aside className="blog-sidebar" aria-hidden="false">
          <div style={{ position: 'sticky', top: 32 }}>
            <Toc items={tocItems} />
          </div>
        </aside>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>

      <style>{`
        .blog-layout {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 24px 80px;
          display: grid;
          grid-template-columns: minmax(0, 760px) 240px;
          gap: 48px;
          justify-content: center;
        }
        .blog-article { min-width: 0; }
        .blog-sidebar { display: block; }
        .blog-toc-mobile { display: none; }
        @media (max-width: 1023px) {
          .blog-layout { grid-template-columns: 1fr; max-width: 760px; }
          .blog-sidebar { display: none; }
          .blog-toc-mobile { display: block; }
        }
      `}</style>
    </div>
  );
}
