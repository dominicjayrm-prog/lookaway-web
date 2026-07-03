import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * Anonymous result reporting for the /daily challenge. Stores only the
 * date, challenge number, rounds cleared, and the emoji-free result rows
 * (hit/wrong/miss counts). No user identifiers, no cookies, no IP.
 *
 * Validation is strict because the endpoint is public:
 *   - date must be today +/- 1 day (covers timezones either side of UTC)
 *   - cleared must be an integer 0..5
 *   - rows must be at most 5 strings, each at most 16 chars
 */
const EPOCH = '2026-07-03';

function challengeNumber(dateStr: string): number {
  const ms = new Date(dateStr + 'T12:00:00Z').getTime() - new Date(EPOCH + 'T12:00:00Z').getTime();
  return Math.max(1, Math.round(ms / 86400000) + 1);
}

export async function POST(req: NextRequest) {
  let body: { date?: unknown; cleared?: unknown; rows?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const date = typeof body.date === 'string' ? body.date : '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Bad date' }, { status: 400 });
  }
  const submitted = new Date(date + 'T12:00:00Z').getTime();
  if (Number.isNaN(submitted) || Math.abs(submitted - Date.now()) > 2 * 86400000) {
    return NextResponse.json({ error: 'Date out of range' }, { status: 400 });
  }

  const cleared = body.cleared;
  if (typeof cleared !== 'number' || !Number.isInteger(cleared) || cleared < 0 || cleared > 5) {
    return NextResponse.json({ error: 'Bad cleared' }, { status: 400 });
  }

  let rows: string[] = [];
  if (Array.isArray(body.rows)) {
    rows = body.rows
      .filter((r): r is string => typeof r === 'string')
      .slice(0, 5)
      .map((r) => r.slice(0, 16));
  }

  const { error } = await supabaseAdmin()
    .from('daily_results')
    .insert({ day: date, challenge_num: challengeNumber(date), cleared, rows });

  if (error) {
    return NextResponse.json({ error: 'Store failed' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
