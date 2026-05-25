import { SITE_URL } from './constants';

/**
 * Notify IndexNow (Bing / Yandex / Seznam / Naver) that one or more URLs
 * on the site have been published or updated, so they re-crawl quickly
 * instead of waiting for the next scheduled crawl.
 *
 * Configuration:
 *   - Set INDEXNOW_KEY in the environment (any 32+ char string of
 *     a-z, A-Z, 0-9, hyphen). The same string is served at
 *     https://playblanked.com/indexnow-key.txt by the route handler
 *     at src/app/indexnow-key.txt/route.ts so IndexNow can verify
 *     ownership.
 *   - If the env var is missing, this function is a silent no-op so
 *     the rest of the publish flow keeps working.
 *
 * Failure mode: best-effort. IndexNow rejections are logged but never
 * thrown, because we do not want a flaky third-party endpoint to break
 * the editor.
 */
export async function notifyIndexNow(urls: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return; // not configured; silent no-op

  if (urls.length === 0) return;

  const host = new URL(SITE_URL).host;
  const body = {
    host,
    key,
    keyLocation: `${SITE_URL}/indexnow-key.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      // Best-effort; do not block the request on a slow indexer.
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok && res.status !== 202) {
      console.warn(`[indexnow] non-OK response: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.warn('[indexnow] notify failed', err);
  }
}
