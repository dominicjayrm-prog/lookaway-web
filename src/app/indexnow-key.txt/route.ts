/**
 * Serves the IndexNow ownership-verification key as plain text at
 * https://playblanked.com/indexnow-key.txt.
 *
 * IndexNow checks this URL when we ping their API: it must return
 * exactly the same string we sent in the `key` field. We read it from
 * the INDEXNOW_KEY env var so the value can be rotated by changing one
 * setting in Vercel, with no code change.
 *
 * If the env var is unset, returns 404 so we do not advertise a fake
 * verification endpoint.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return new Response('Not configured', { status: 404 });
  }
  return new Response(key, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
