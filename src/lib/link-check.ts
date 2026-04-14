export interface LinkCheckResult {
  url: string;
  status: number | null;
  ok: boolean;
  type: 'internal' | 'external';
  error?: string;
}

/** The set of known internal routes. Checked against when validating internal links. */
export const INTERNAL_ROUTES = ['/', '/privacy', '/terms', '/press', '/blog'];

/** Determine if a URL is internal (same-domain or relative). */
export function isInternalUrl(url: string, siteUrl: string): boolean {
  if (url.startsWith('/')) return true;
  try {
    const u = new URL(url);
    const s = new URL(siteUrl);
    return u.hostname === s.hostname;
  } catch {
    return false;
  }
}

/** Check an array of URLs concurrently via HEAD requests. */
export async function checkLinks(
  urls: string[],
  siteUrl: string,
  knownBlogSlugs: string[] = [],
  timeoutMs = 5000,
): Promise<LinkCheckResult[]> {
  const internalSlugPaths = new Set(knownBlogSlugs.map(s => `/blog/${s}`));
  const internalRouteSet = new Set(INTERNAL_ROUTES);

  return Promise.all(
    urls.map(async (url): Promise<LinkCheckResult> => {
      const internal = isInternalUrl(url, siteUrl);
      const type = internal ? ('internal' as const) : ('external' as const);

      // Internal check: validate against known routes
      if (internal) {
        let path = url;
        if (!url.startsWith('/')) {
          try {
            path = new URL(url).pathname;
          } catch {
            return { url, status: null, ok: false, type, error: 'Invalid URL' };
          }
        }
        // Strip trailing slash for consistency
        const normalizedPath = path.replace(/\/$/, '') || '/';
        const ok = internalRouteSet.has(normalizedPath) || internalSlugPaths.has(normalizedPath);
        return { url, status: ok ? 200 : 404, ok, type };
      }

      // External check: HEAD request with timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(url, {
          method: 'HEAD',
          signal: controller.signal,
          redirect: 'follow',
        });
        return { url, status: res.status, ok: res.ok, type };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Request failed';
        return { url, status: null, ok: false, type, error: message };
      } finally {
        clearTimeout(timeout);
      }
    }),
  );
}
