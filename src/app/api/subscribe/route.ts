import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * Public email capture endpoint. Intentionally simple:
 *
 * - Accepts { email, source, hp } where `hp` is a honeypot field (must be empty).
 * - Trims + lowercases the email, runs a cheap regex validation.
 * - Inserts into `subscribers`. On conflict (duplicate email), returns
 *   success anyway — we don't want to leak whether an email is already
 *   subscribed, and the user's intent has been met either way.
 * - No rate limiting yet. If abuse hits, add Upstash/Redis bucket here.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: unknown; source?: unknown; hp?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  // Honeypot — bots will fill this; humans won't see it.
  if (typeof body.hp === 'string' && body.hp.length > 0) {
    // Pretend it worked; bot goes on its way.
    return NextResponse.json({ ok: true });
  }

  const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!rawEmail || !EMAIL_RE.test(rawEmail) || rawEmail.length > 254) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const source = typeof body.source === 'string' ? body.source.slice(0, 80) : null;
  const userAgent = req.headers.get('user-agent')?.slice(0, 300) ?? null;

  const { error } = await supabaseAdmin()
    .from('subscribers')
    .insert({ email: rawEmail, source, user_agent: userAgent });

  if (error && error.code !== '23505') {
    // Only surface non-duplicate errors.
    return NextResponse.json({ error: 'Something went wrong — try again in a bit.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
