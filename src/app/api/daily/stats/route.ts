import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * Aggregate stats for a given day's challenge: how many played, what
 * share cleared all five rounds, and the average rounds cleared.
 * Public, read-only, no user data involved.
 */
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date') ?? '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Bad date' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin()
    .from('daily_results')
    .select('cleared')
    .eq('day', date)
    .limit(50000);

  if (error) {
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }

  const plays = data?.length ?? 0;
  const perfect = data?.filter((r) => r.cleared === 5).length ?? 0;
  const avg = plays > 0 ? data!.reduce((s, r) => s + r.cleared, 0) / plays : 0;

  return NextResponse.json(
    {
      plays,
      perfectPct: plays > 0 ? Math.round((perfect / plays) * 100) : 0,
      avgCleared: Math.round(avg * 10) / 10,
    },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
  );
}
