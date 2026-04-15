import type { BlogFaq } from './supabase';

/**
 * Accept whatever the client sent for `faqs`, drop anything that doesn't
 * match { q: string, a: string } with non-empty trimmed values, and cap
 * the length + size so one post can't blow up the JSON-LD block.
 */
export function sanitizeFaqs(raw: unknown): BlogFaq[] {
  if (!Array.isArray(raw)) return [];
  const out: BlogFaq[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const rec = item as Record<string, unknown>;
    const q = typeof rec.q === 'string' ? rec.q.trim() : '';
    const a = typeof rec.a === 'string' ? rec.a.trim() : '';
    if (!q || !a) continue;
    out.push({
      q: q.slice(0, 300),
      a: a.slice(0, 2000),
    });
    if (out.length >= 30) break;
  }
  return out;
}

/** Build the FAQPage JSON-LD payload consumed by Google Search. */
export function buildFaqJsonLd(faqs: BlogFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}
