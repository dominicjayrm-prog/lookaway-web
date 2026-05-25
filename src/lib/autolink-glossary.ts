import { GLOSSARY } from './glossary';
import { SITE_URL } from './constants';

interface TermLink {
  name: string;
  href: string;
  /** Pre-compiled case-insensitive regex matching the term as a whole word. */
  pattern: RegExp;
}

// Build the term link table once at module load. Order matters: longest
// term first so "short-term memory" wins over "memory" on overlap.
const TERMS: TermLink[] = Object.values(GLOSSARY)
  .map((entry) => ({
    name: entry.name,
    href: `${SITE_URL}/glossary/${entry.slug}`,
    pattern: new RegExp(`\\b(${entry.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'i'),
  }))
  .sort((a, b) => b.name.length - a.name.length);

// Skip blocks we never want to touch:
//   - <a>...</a> so we never wrap an anchor in another anchor
//   - <h1>..</h1> through <h6>..</h6> so headings stay clean
const SKIP_RE = /(<a\b[^>]*>[\s\S]*?<\/a>|<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>)/gi;

/**
 * Auto-link the first mention of each glossary term in blog post body HTML
 * to its `/glossary/[slug]` entry. Runs at render time so every existing
 * post inherits the linking immediately without re-saving, and every
 * future post does too.
 *
 * Rules:
 *  - Only the FIRST occurrence of each term per post becomes a link.
 *  - Mentions already inside an <a> are skipped (no nested links).
 *  - Mentions inside headings are skipped (cleaner document outline).
 *  - Whole-word match only; case-insensitive but matched casing preserved.
 *
 * Operates on already-sanitized HTML so a regex pass is safe.
 */
export function autolinkGlossaryTerms(html: string): string {
  if (!html) return html;

  const linkedThisPost = new Set<string>();

  // Split keeps both the skip-blocks and the gaps between them. Odd-index
  // entries are the skip blocks; even-index entries are the linkable gaps.
  const parts = html.split(SKIP_RE);

  return parts
    .map((part, i) => {
      if (i % 2 === 1) return part; // skip block, emit verbatim
      let out = part;
      for (const term of TERMS) {
        if (linkedThisPost.has(term.name.toLowerCase())) continue;
        const match = out.match(term.pattern);
        if (!match) continue;
        const matched = match[1];
        const linkHtml = `<a href="${term.href}">${matched}</a>`;
        out = out.replace(term.pattern, linkHtml);
        linkedThisPost.add(term.name.toLowerCase());
      }
      return out;
    })
    .join('');
}
