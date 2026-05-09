import { SITE_URL } from './constants';

const SITE_HOST = new URL(SITE_URL).hostname;

const EXTERNAL_REL = 'noopener noreferrer nofollow';
const EXTERNAL_TARGET = '_blank';

/**
 * Rewrites <a> tags in already-sanitized blog HTML so that any link pointing
 * at a different domain gets `rel="noopener noreferrer nofollow"` and
 * `target="_blank"`. Internal links (relative paths, fragment IDs, mailto,
 * tel, and anything pointing at SITE_URL or its www variant) are left alone.
 *
 * Why noopener noreferrer + nofollow:
 *   - noopener: prevents the new tab from messing with window.opener
 *   - noreferrer: stops Referer header leak to third parties
 *   - nofollow: tells search engines not to pass PageRank through this link
 *
 * Operates on already-sanitized HTML (post.content_html runs through
 * mdToHtml -> sanitize-html before storage), so a regex pass is safe; we are
 * not parsing arbitrary user input.
 */
export function rewriteExternalLinks(html: string): string {
  if (!html) return html;

  return html.replace(/<a\b([^>]*)>/gi, (match, attrs: string) => {
    const hrefMatch = attrs.match(/\bhref\s*=\s*"([^"]*)"/i);
    if (!hrefMatch) return match;
    const href = hrefMatch[1].trim();
    if (!href) return match;

    // Definitely internal-ish targets: skip.
    if (
      href.startsWith('/') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return match;
    }

    let url: URL;
    try {
      url = new URL(href);
    } catch {
      // Unparseable href — leave alone rather than mangle.
      return match;
    }

    if (url.hostname === SITE_HOST || url.hostname === `www.${SITE_HOST}`) {
      return match;
    }

    let nextAttrs = attrs;
    nextAttrs = /\brel\s*=\s*"[^"]*"/i.test(nextAttrs)
      ? nextAttrs.replace(/\brel\s*=\s*"[^"]*"/i, `rel="${EXTERNAL_REL}"`)
      : `${nextAttrs} rel="${EXTERNAL_REL}"`;
    nextAttrs = /\btarget\s*=\s*"[^"]*"/i.test(nextAttrs)
      ? nextAttrs.replace(/\btarget\s*=\s*"[^"]*"/i, `target="${EXTERNAL_TARGET}"`)
      : `${nextAttrs} target="${EXTERNAL_TARGET}"`;

    return `<a${nextAttrs}>`;
  });
}
