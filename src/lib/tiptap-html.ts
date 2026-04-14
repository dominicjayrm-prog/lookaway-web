import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import type { JSONContent } from '@tiptap/core';

// Must match the extensions in components/admin/Editor.tsx
const EXTENSIONS = [
  StarterKit.configure({
    heading: { levels: [2, 3, 4] },
    link: {
      openOnClick: false,
      HTMLAttributes: { rel: 'noopener noreferrer nofollow' },
    },
  }),
  Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
];

/** Render TipTap JSON to HTML string for SSR. */
export function renderTiptapToHtml(doc: JSONContent): string {
  if (!doc || !doc.type) return '';
  try {
    return generateHTML(doc, EXTENSIONS);
  } catch (e) {
    console.error('tiptap-html render failed', e);
    return '';
  }
}

/** Extract plain text from a TipTap document for word counting. */
export function extractText(doc: JSONContent): string {
  if (!doc) return '';
  const parts: string[] = [];
  const walk = (node: JSONContent) => {
    if (node.type === 'text' && typeof node.text === 'string') parts.push(node.text);
    if (Array.isArray(node.content)) node.content.forEach(walk);
  };
  walk(doc);
  return parts.join(' ');
}

/** Count words in a TipTap document. */
export function countWords(doc: JSONContent): number {
  const text = extractText(doc);
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

/** Estimate reading time in minutes (200 wpm). */
export function readingTime(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / 200));
}

/** Extract all URLs from links in a TipTap document. */
export function extractLinks(doc: JSONContent): string[] {
  if (!doc) return [];
  const urls = new Set<string>();
  const walk = (node: JSONContent) => {
    if (node.marks) {
      for (const mark of node.marks) {
        if (mark.type === 'link' && typeof mark.attrs?.href === 'string') {
          urls.add(mark.attrs.href);
        }
      }
    }
    if (Array.isArray(node.content)) node.content.forEach(walk);
  };
  walk(doc);
  return Array.from(urls);
}

/** Extract all images (and their alt attributes) from a TipTap document. */
export function extractImages(doc: JSONContent): Array<{ src: string; alt: string | null }> {
  if (!doc) return [];
  const images: Array<{ src: string; alt: string | null }> = [];
  const walk = (node: JSONContent) => {
    if (node.type === 'image' && typeof node.attrs?.src === 'string') {
      images.push({
        src: node.attrs.src,
        alt: typeof node.attrs.alt === 'string' && node.attrs.alt.length > 0 ? node.attrs.alt : null,
      });
    }
    if (Array.isArray(node.content)) node.content.forEach(walk);
  };
  walk(doc);
  return images;
}

/** Count H1s in the document (should be 0 — title is the h1 on public page). */
export function countH1s(doc: JSONContent): number {
  if (!doc) return 0;
  let count = 0;
  const walk = (node: JSONContent) => {
    if (node.type === 'heading' && node.attrs?.level === 1) count++;
    if (Array.isArray(node.content)) node.content.forEach(walk);
  };
  walk(doc);
  return count;
}

/** Check heading hierarchy — returns true if valid (no H3 without preceding H2, etc.). */
export function checkHeadingHierarchy(doc: JSONContent): { valid: boolean; issue?: string } {
  if (!doc) return { valid: true };
  let lastLevel = 1; // title is H1, so content should start at H2
  let valid = true;
  let issue: string | undefined;
  const walk = (node: JSONContent) => {
    if (!valid) return;
    if (node.type === 'heading' && typeof node.attrs?.level === 'number') {
      const level = node.attrs.level;
      if (level > lastLevel + 1) {
        valid = false;
        issue = `Heading level skipped: H${lastLevel} → H${level}`;
        return;
      }
      lastLevel = level;
    }
    if (Array.isArray(node.content)) node.content.forEach(walk);
  };
  walk(doc);
  return { valid, issue };
}
