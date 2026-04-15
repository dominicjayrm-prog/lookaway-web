import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

marked.setOptions({ gfm: true, breaks: false });

/** Parse markdown to HTML. Synchronous.
 *
 *  Output is sanitized with DOMPurify so pasted content from AI tools
 *  (or anywhere else) can't inject scripts or event handlers into the
 *  published post. The admin is trusted but may unwittingly paste
 *  malicious HTML — this is defense in depth for stored-XSS.
 */
export function mdToHtml(md: string): string {
  if (!md?.trim()) return '';
  try {
    const raw = marked.parse(md, { async: false }) as string;
    return DOMPurify.sanitize(raw, {
      ADD_ATTR: ['target', 'rel'],
      FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit'],
    });
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
