import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { checkLinks } from '@/lib/link-check';
import { listPublishedSlugs } from '@/lib/blog';
import { SITE_URL } from '@/lib/constants';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { urls } = await req.json();
  if (!Array.isArray(urls)) {
    return NextResponse.json({ error: 'urls must be an array' }, { status: 400 });
  }

  const knownSlugs = await listPublishedSlugs();
  const results = await checkLinks(urls, SITE_URL, knownSlugs);
  return NextResponse.json({ results });
}
