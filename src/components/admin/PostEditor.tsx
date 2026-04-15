'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Editor from './Editor';
import BannerUploader from './BannerUploader';
import SeoPanel from './SeoPanel';
import { runSeoChecks, summarizeChecks } from '@/lib/seo-check';
import { mdWordCount, mdReadingTime, mdExtractLinks, mdExtractImages } from '@/lib/markdown';
import { slugify, isValidSlug } from '@/lib/slug';
import type { BlogPost } from '@/lib/supabase';
import type { LinkCheckResult } from '@/lib/link-check';

interface Props {
  post?: BlogPost | null;
  existingSlugs: string[];
}

/**
 * Read markdown source out of the stored `content` field.
 * New posts store `{ type: 'markdown', source: string }` in the JSONB column.
 * Legacy TipTap posts have a ProseMirror doc — we fall back to empty so the
 * author can paste the markdown in fresh. Public display still works because
 * the rendered HTML is in `content_html`.
 */
function readMarkdown(content: unknown): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (typeof content === 'object' && content !== null) {
    const c = content as { type?: string; source?: unknown };
    if (c.type === 'markdown' && typeof c.source === 'string') return c.source;
  }
  return '';
}

export default function PostEditor({ post, existingSlugs }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(post?.slug));
  const [subtitle, setSubtitle] = useState(post?.subtitle ?? '');
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? '');
  const [keywords, setKeywords] = useState<string[]>(post?.keywords ?? []);
  const [keywordInput, setKeywordInput] = useState('');
  const [bannerUrl, setBannerUrl] = useState<string | null>(post?.banner_url ?? null);
  const [bannerAlt, setBannerAlt] = useState<string | null>(post?.banner_alt ?? null);
  const [content, setContent] = useState<string>(readMarkdown(post?.content));
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(post ? new Date(post.updated_at) : null);
  const [lastSaveFailed, setLastSaveFailed] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [linkResults, setLinkResults] = useState<LinkCheckResult[]>([]);
  const [checkingLinks, setCheckingLinks] = useState(false);

  // Mark dirty whenever any post field changes. Cleared on successful save.
  useEffect(() => {
    setDirty(true);
  }, [title, slug, subtitle, metaDescription, keywords, bannerUrl, bannerAlt, content]);

  // Warn before closing the tab if there are unsaved changes.
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;
  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (!dirtyRef.current) return;
      e.preventDefault();
      // Spec: setting returnValue triggers the browser's generic prompt.
      e.returnValue = '';
    }
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  // Auto-slug from title unless user edited the slug
  useEffect(() => {
    if (!slugManuallyEdited && title) setSlug(slugify(title));
  }, [title, slugManuallyEdited]);

  const wordCount = useMemo(() => mdWordCount(content), [content]);
  const minutes = useMemo(() => mdReadingTime(wordCount), [wordCount]);
  const missingAltImages = useMemo(
    () => mdExtractImages(content).filter(img => !img.alt).map(img => img.src),
    [content],
  );

  const checks = useMemo(() => runSeoChecks({
    title, slug, subtitle, meta_description: metaDescription, keywords,
    banner_url: bannerUrl, banner_alt: bannerAlt, content, existingSlugs,
  }), [title, slug, subtitle, metaDescription, keywords, bannerUrl, bannerAlt, content, existingSlugs]);

  const { canPublish } = summarizeChecks(checks);
  const linkBlockers = linkResults.some(l => !l.ok && l.type === 'internal');
  const finalCanPublish = canPublish && !linkBlockers;

  const recheckLinks = useCallback(async () => {
    const urls = mdExtractLinks(content);
    if (urls.length === 0) { setLinkResults([]); return; }
    setCheckingLinks(true);
    try {
      const res = await fetch('/api/admin/link-check', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls }),
      });
      if (res.ok) {
        const { results } = await res.json();
        setLinkResults(results);
      }
    } finally {
      setCheckingLinks(false);
    }
  }, [content]);

  // Check links whenever content stops changing for 2s
  const linkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const urls = mdExtractLinks(content);
    if (urls.length === 0) { setLinkResults([]); return; }
    if (linkTimeoutRef.current) clearTimeout(linkTimeoutRef.current);
    linkTimeoutRef.current = setTimeout(() => {
      void recheckLinks();
    }, 2000);
    return () => { if (linkTimeoutRef.current) clearTimeout(linkTimeoutRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  function buildBody(publishedOverride?: boolean) {
    return {
      title, slug, subtitle: subtitle || null, meta_description: metaDescription || null,
      keywords, banner_url: bannerUrl, banner_alt: bannerAlt,
      // Send the markdown source; the API renders HTML server-side.
      content,
      ...(publishedOverride !== undefined ? { published: publishedOverride } : {}),
    };
  }

  async function save(publishedOverride?: boolean, silent = false) {
    if (!slug || !isValidSlug(slug)) {
      if (!silent) alert('Please set a valid slug');
      return null;
    }
    if (!title.trim()) {
      if (!silent) alert('Title is required');
      return null;
    }
    setSaving(true);
    try {
      const method = post ? 'PATCH' : 'POST';
      const url = post ? `/api/admin/posts/${post.id}` : '/api/admin/posts';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildBody(publishedOverride)),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Save failed' }));
        setLastSaveFailed(true);
        if (!silent) alert(error || 'Save failed');
        return null;
      }
      const data = await res.json();
      setLastSavedAt(new Date());
      setLastSaveFailed(false);
      setDirty(false);
      if (!post && data.id) {
        router.replace(`/admin/posts/${data.id}`);
      }
      return data;
    } catch (err) {
      setLastSaveFailed(true);
      if (!silent) alert(err instanceof Error ? err.message : 'Save failed');
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    if (!finalCanPublish) {
      alert('Fix the errors before publishing');
      return;
    }
    setPublishing(true);
    const result = await save(true);
    setPublishing(false);
    if (result) {
      alert('Published!');
      router.refresh();
    }
  }

  async function unpublish() {
    if (!confirm('Unpublish this post? It will no longer be visible on the blog.')) return;
    await save(false);
    router.refresh();
  }

  // Auto-save every 3s if there are unsaved changes. Uses refs so the interval
  // doesn't reset on every keystroke and can read the latest flags each tick.
  const saveRef = useRef<(() => Promise<unknown>) | null>(null);
  saveRef.current = () => save(undefined, true);
  const savingRef = useRef(saving);
  savingRef.current = saving;
  useEffect(() => {
    if (!post) return; // only for existing posts
    const iv = setInterval(() => {
      if (dirtyRef.current && !savingRef.current) void saveRef.current?.();
    }, 3000);
    return () => clearInterval(iv);
  }, [post]);

  function addKeyword() {
    const k = keywordInput.trim().toLowerCase();
    if (!k) return;
    if (keywords.includes(k)) return;
    setKeywords([...keywords, k]);
    setKeywordInput('');
  }

  return (
    <div>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          style={{
            flex: 1, minWidth: 280, fontSize: 24, fontWeight: 800, color: '#1A1A18',
            border: 'none', background: 'transparent', outline: 'none', fontFamily: 'inherit', letterSpacing: -0.5,
          }}
        />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: lastSaveFailed ? '#FF6B6B' : '#636E72', fontWeight: lastSaveFailed ? 600 : 400 }}>
            {saving
              ? 'Saving…'
              : lastSaveFailed
                ? '⚠ Save failed'
                : dirty
                  ? 'Unsaved changes'
                  : lastSavedAt
                    ? `Saved ${lastSavedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
                    : 'Unsaved'}
          </div>
          {post && (
            <a
              href={`/admin/posts/${post.id}/preview`}
              target="_blank"
              rel="noopener"
              style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid #EEEDE8', background: 'white', fontSize: 13, fontWeight: 600, color: '#1A1A18', textDecoration: 'none', fontFamily: 'inherit' }}
            >
              Preview ↗
            </a>
          )}
          <button
            type="button"
            onClick={() => save()}
            disabled={saving}
            style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid #EEEDE8', background: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Save draft
          </button>
          {post?.published ? (
            <button
              type="button"
              onClick={unpublish}
              style={{ padding: '8px 16px', borderRadius: 8, background: '#D4A012', color: 'white', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Unpublish
            </button>
          ) : (
            <button
              type="button"
              onClick={publish}
              disabled={!finalCanPublish || publishing}
              title={finalCanPublish ? 'Publish now' : 'Fix errors to publish'}
              style={{
                padding: '8px 18px', borderRadius: 8, color: 'white', fontSize: 13, fontWeight: 600, border: 'none',
                background: finalCanPublish ? '#00B894' : '#B2BEC3',
                cursor: finalCanPublish ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
              }}
            >
              {publishing ? 'Publishing…' : 'Publish'}
            </button>
          )}
        </div>
      </div>

      {/* Body: editor + sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }} className="editor-grid">
        <Editor value={content} onChange={setContent} />

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'white', border: '1.5px solid #EEEDE8', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 0.5 }}>METADATA</div>

            <Field label="Slug" hint="URL path - /blog/your-slug">
              <input
                type="text"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
                placeholder="my-post-slug"
                style={input}
              />
            </Field>

            <Field label="Subtitle" hint="Optional - shown below title on post page">
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                style={input}
              />
            </Field>

            <Field label="Meta description" hint={`${metaDescription.length} / 160 chars`}>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                style={{ ...input, fontFamily: 'inherit', resize: 'vertical' }}
                placeholder="120-160 char summary for Google and social previews"
              />
            </Field>

            <Field label="Keywords" hint="Used for related-posts matching">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
                {keywords.map(k => (
                  <span key={k} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: '#6C5CE715', color: '#6C5CE7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {k}
                    <button type="button" onClick={() => setKeywords(keywords.filter(x => x !== k))} style={{ background: 'none', border: 'none', color: '#6C5CE7', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addKeyword(); } }}
                onBlur={addKeyword}
                placeholder="Add keyword + Enter"
                style={input}
              />
            </Field>
          </div>

          <div style={{ background: 'white', border: '1.5px solid #EEEDE8', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 0.5, marginBottom: 10 }}>BANNER IMAGE</div>
            <BannerUploader bannerUrl={bannerUrl} bannerAlt={bannerAlt} onChange={(u, a) => { setBannerUrl(u); setBannerAlt(a); }} />
          </div>

          <SeoPanel
            checks={checks}
            linkResults={linkResults}
            checkingLinks={checkingLinks}
            wordCount={wordCount}
            readingTime={minutes}
            onRecheckLinks={recheckLinks}
            missingAltImages={missingAltImages}
          />
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .editor-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: '#1A1A18', letterSpacing: 0.3 }}>{label}</label>
        {hint && <span style={{ fontSize: 10, color: '#B2BEC3' }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const input: React.CSSProperties = {
  padding: '8px 10px', borderRadius: 8, border: '1.5px solid #EEEDE8',
  fontSize: 13, outline: 'none', fontFamily: 'inherit', width: '100%',
};
