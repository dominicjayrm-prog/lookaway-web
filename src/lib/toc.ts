// Extract h2/h3 headings from rendered HTML and return them with slug IDs.
// Also returns the HTML with `id` attributes injected on each heading.

export interface TocItem {
  level: 2 | 3;
  id: string;
  text: string;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/<[^>]+>/g, '') // strip any inline HTML
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

/**
 * Walks the rendered HTML, adds `id="..."` to every <h2> / <h3> that doesn't
 * already have one, and returns both the modified HTML and the list of
 * headings for use in a table-of-contents.
 *
 * Pure-regex based (no DOM dependency) so it works in Node and Edge runtimes.
 */
export function extractTocAndInjectIds(html: string): { html: string; items: TocItem[] } {
  const items: TocItem[] = [];
  const usedIds = new Set<string>();

  const updated = html.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/g,
    (match, tagRaw: string, attrs: string, inner: string) => {
      const level = tagRaw === 'h2' ? 2 : 3;
      const text = inner.replace(/<[^>]+>/g, '').trim();
      if (!text) return match;

      // Reuse existing id if one was explicitly set in attrs; otherwise slugify.
      const existingId = /\sid\s*=\s*"([^"]+)"/.exec(attrs)?.[1];
      let id = existingId ?? slugifyHeading(text);
      if (!id) return match;

      // Ensure uniqueness
      let base = id;
      let counter = 2;
      while (usedIds.has(id)) {
        id = `${base}-${counter++}`;
      }
      usedIds.add(id);

      items.push({ level: level as 2 | 3, id, text });

      // Rebuild the opening tag with the id (replacing an existing id if present).
      const cleanedAttrs = attrs.replace(/\sid\s*=\s*"[^"]*"/, '');
      return `<${tagRaw}${cleanedAttrs} id="${id}">${inner}</${tagRaw}>`;
    },
  );

  return { html: updated, items };
}
