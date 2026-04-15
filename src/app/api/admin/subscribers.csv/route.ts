import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/** Escape a single CSV cell. Wraps strings with quotes and doubles any
 *  internal quotes per RFC 4180. Good enough for email-export use. */
function csvCell(v: unknown): string {
  if (v == null) return '';
  const s = String(v);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin()
    .from('subscribers')
    .select('email, source, created_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = data ?? [];
  const header = 'email,source,subscribed_at\n';
  const body = rows
    .map((r) => [r.email, r.source, r.created_at].map(csvCell).join(','))
    .join('\n');

  const filename = `blanked-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(header + body + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
