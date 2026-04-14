'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { JSONContent } from '@tiptap/core';
import Editor from './Editor';
import BannerUploader from './BannerUploader';
import SeoPanel from './SeoPanel';
import { runSeoChecks, summarizeChecks } from '@/lib/seo-check';
import { countWords, readingTime, extractLinks } from '@/lib/tiptap-html';
import { slugify, isValidSlug } from '@/lib/slug';
import type { BlogPost } from '@/lib/supabase';
import type { LinkCheckResult } from '@/lib/link-check';

interface Props {
  post?: BlogPost | null;
  existingSlugs: string[];
}

const EMPTY_DOC: JSONContent = { type: 'doc', content: [{ type: 'paragraph' }] };

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
  const [content, setContent] = useState<JSONContent>(
    (post?.content as JSONContent) ?? EMPTY_DOC,
  );
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(post ? new Date(post.updated_at) : null);
  const [linkResults, setLinkResults] = useState<LinkCheckResult[]>([]);
  const [checkingLinks, setCheckingLinks] = useState(false);

  // Auto-slug from title unless user edited the slug
  useEffect(() => {
    if (!slugManuallyEdited && title) setSlug(slugify(title));
  }, [title, slugManuallyEdited]);

  const wordCount = useMemo(() => countWords(content), [content]);
  const minutes = useMemo(() => readingTime(wordCount), [wordCount]);

  const checks = useMemo(() => runSeoChecks({
    title, slug, subtitle, meta_description: metaDescription, keywords,
    banner_url: bannerUrl, banner_alt: bannerAlt, content, existingSlugs,
  }), [title, slug, subtitle, metaDescription, keywords, bannerUrl, bannerAlt, content, existingSlugs]);

  const { canPublish } = summarizeChecks(checks);
  const linkBlockers = linkResults.some(l => !l.ok && l.type === 'internal');
  const finalCanPublish = canPublish && !linkBlockers;

  // Check links whenever content stops changing for 2s
  const linkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const urls = extractLinks(content);
    if (urls.length === 0) { setLinkResults([]); return; }
    if (linkTimeoutRef.current) clearTimeout(linkTimeoutRef.current);
    linkTimeoutRef.current = setTimeout(() => {
      void recheckLinks();
    }, 2000);
    return () => { if (linkTimeoutRef.current) clearTimeout(linkTimeoutRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const recheckLinks = useCallback(async () => {
    const urls = extractLinks(content);
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

  function buildBody(publishedOverride?: boolean) {
    return {
      title, slug, subtitle: subtitle || null, meta_description: metaDescription || null,
      keywords, banner_url: bannerUrl, banner_alt: bannerAlt, content,
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
        if (!silent) alert(error || 'Save failed');
        return null;
      }
      const data = await res.json();
      setLastSavedAt(new Date());
      if (!post && data.id) {
        router.replace(`/admin/posts/${data.id}`);
      }
      return data;
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

  // Auto-save every 10s if dirty (uses ref to avoid resetting the interval on every keystroke)
  const saveRef = useRef<(() => Promise<unknown>) | null>(null);
  saveRef.current = () => save(undefined, true);
  useEffect(() => {
    if (!post) return; // only for existing posts
    const iv = setInterval(() => { void saveRef.current?.(); }, 10000);
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
          <div style={{ fontSize: 12, color: '#636E72' }}>
            {saving ? 'Saving…' : lastSavedAt ? `Saved ${lastSavedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}` : 'Unsaved'}
          </div>
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
        <Editor content={content} onChange={setContent} />

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'white', border: '1.5px solid #EEEDE8', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 0.5 }}>METADATA</div>

            <Field label="Slug" hint="URL path — /blog/your-slug">
              <input
                type="text"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
                placeholder="my-post-slug"
                style={input}
              />
            </Field>

            <Field label="Subtitle" hint="Optional — shown below title on post page">
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
          />
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .editor-grid { grid-template-columns: 1fr !important; }
        }
        .tiptap-content .ProseMirror { outline: none; min-height: 400px; }
        .tiptap-content .ProseMirror h2 { font-size: 26px; font-weight: 800; margin: 24px 0 10px; color: #1A1A18; letter-spacing: -0.3px; }
        .tiptap-content .ProseMirror h3 { font-size: 20px; font-weight: 700; margin: 20px 0 8px; color: #1A1A18; }
        .tiptap-content .ProseMirror h4 { font-size: 16px; font-weight: 700; margin: 16px 0 6px; color: #1A1A18; }
        .tiptap-content .ProseMirror p { font-size: 16px; line-height: 1.7; margin: 0 0 12px; color: #1A1A18; }
        .tiptap-content .ProseMirror ul, .tiptap-content .ProseMirror ol { padding-left: 24px; margin: 0 0 12px; font-size: 16px; line-height: 1.7; }
        .tiptap-content .ProseMirror blockquote { border-left: 3px solid #6C5CE7; padding: 4px 16px; margin: 12px 0; color: #636E72; font-style: italic; }
        .tiptap-content .ProseMirror a { color: #6C5CE7; text-decoration: underline; }
        .tiptap-content .ProseMirror code { background: #F5F4F0; padding: 2px 6px; border-radius: 4px; font-size: 14px; font-family: ui-monospace, monospace; }
        .tiptap-content .ProseMirror pre { background: #1A1A18; color: #FAFAF7; padding: 14px 18px; border-radius: 10px; margin: 12px 0; overflow-x: auto; }
        .tiptap-content .ProseMirror pre code { background: transparent; color: inherit; padding: 0; }
        .tiptap-content .ProseMirror img { max-width: 100%; border-radius: 10px; margin: 12px 0; }
        .tiptap-content .ProseMirror hr { border: none; border-top: 1px solid #EEEDE8; margin: 24px 0; }
        .tiptap-content .ProseMirror p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #B2BEC3; float: left; pointer-events: none; height: 0; }
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
