import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

marked.setOptions({ gfm: true, breaks: false });

// Tight whitelist of tags + attrs the blog editor may legitimately produce.
// Scripts, iframes, inline styles, on* handlers, etc. are stripped. Pure JS —
// no JSDOM — so this works unchanged in any Node runtime (Vercel serverless,
// edge, local dev).
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr', 'blockquote',
    'ul', 'ol', 'li',
    'strong', 'em', 'u', 's', 'del', 'ins', 'sub', 'sup', 'mark',
    'a', 'img',
    'code', 'pre',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel', 'id'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    h1: ['id'], h2: ['id'], h3: ['id'], h4: ['id'], h5: ['id'], h6: ['id'],
    code: ['class'],
    pre: ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: { img: ['http', 'https', 'data'] },
  disallowedTagsMode: 'discard',
  allowProtocolRelative: false,
};

/** Parse markdown to HTML. Synchronous.
 *
 *  Output is sanitized so pasted content from AI tools or anywhere else can't
 *  inject scripts or event handlers into the published post. Admin is trusted
 *  but may unwittingly paste malicious HTML — defense in depth for stored-XSS.
 */
export function mdToHtml(md: string): string {
  if (!md?.trim()) return '';
  try {
    const raw = marked.parse(md, { async: false }) as string;
    return sanitizeHtml(raw, SANITIZE_OPTIONS);
  } catch {
    return '';
  }
}

/** Plain-text from markdown, for word counting. */
export function mdToText(md: string): string {
  if (!md) return '';
  return md
    .replace(/```[\s\S]*?```/g, ' ')      // code blocks
    .replace(/`[^`]*`/g, ' ')              // inline code
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')  // images
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1') // links, keep text
    .replace(/^#{1,6}\s+/gm, '')           // heading markers
    .replace(/[*_~>]/g, ' ')               // formatting markers
    .replace(/^[-*+]\s+/gm, '')            // bullet markers
    .replace(/^\d+\.\s+/gm, '')            // ordered list markers
    .replace(/^-{3,}$/gm, ' ')             // horizontal rules
    .replace(/\s+/g, ' ')
    .trim();
}

export function mdWordCount(md: string): number {
  const text = mdToText(md);
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

export function mdReadingTime(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / 200));
}

/** All link URLs referenced in [text](url) or <url>. */
export function mdExtractLinks(md: string): string[] {
  if (!md) return [];
  const urls = new Set<string>();
  for (const m of md.matchAll(/\[[^\]]+]\(([^)]+)\)/g)) {
    const u = m[1].split(/\s+/)[0];
    if (u) urls.add(u);
  }
  for (const m of md.matchAll(/<((?:https?:\/\/|\/)[^>\s]+)>/g)) {
    urls.add(m[1]);
  }
  return Array.from(urls);
}

export function mdExtractImages(md: string): Array<{ src: string; alt: string }> {
  if (!md) return [];
  const imgs: Array<{ src: string; alt: string }> = [];
  for (const m of md.matchAll(/!\[([^\]]*)]\(([^)]+)\)/g)) {
    imgs.push({ alt: m[1].trim(), src: m[2].split(/\s+/)[0] });
  }
  return imgs;
}

/** Count `# Heading` lines (H1 only). Content should have 0 — the post title is the H1. */
export function mdCountH1s(md: string): number {
  if (!md) return 0;
  return (md.match(/^#\s+/gm) ?? []).length;
}

/** Checks H2 → H3 → H4 don't skip. Returns { valid, issue? }. */
export function mdCheckHeadingHierarchy(md: string): { valid: boolean; issue?: string } {
  if (!md) return { valid: true };
  let last = 1;
  for (const m of md.matchAll(/^(#{1,6})\s+/gm)) {
    const level = m[1].length;
    if (level > last + 1) {
      return { valid: false, issue: `Heading level skipped: H${last} → H${level}` };
    }
    last = level;
  }
  return { valid: true };
}
