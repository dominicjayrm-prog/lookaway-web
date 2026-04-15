import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import SubscribersTable from '@/components/admin/SubscribersTable';

export const dynamic = 'force-dynamic';

interface Subscriber {
  id: string;
  email: string;
  source: string | null;
  user_agent: string | null;
  created_at: string;
}

export default async function SubscribersPage() {
  const { data, error } = await supabaseAdmin()
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  const subscribers = (data ?? []) as Subscriber[];
  const last7 = subscribers.filter(s => {
    const ts = new Date(s.created_at).getTime();
    return ts > Date.now() - 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#1A1A18', margin: 0, letterSpacing: -0.5 }}>Subscribers</h1>
          <p style={{ fontSize: 14, color: '#636E72', margin: '4px 0 0' }}>
            {subscribers.length} total · {last7} in the last 7 days
          </p>
        </div>
        <Link
          href="/api/admin/subscribers.csv"
          style={{
            padding: '10px 18px', borderRadius: 10, background: '#1A1A18', color: 'white',
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}
        >
          Export CSV
        </Link>
      </div>

      {error && (
        <div style={{ padding: 16, background: '#FF6B6B15', border: '1px solid #FF6B6B', borderRadius: 10, marginBottom: 20, fontSize: 13, color: '#C0392B' }}>
          Could not load subscribers: {error.message}
        </div>
      )}

      <SubscribersTable subscribers={subscribers} />
    </div>
  );
}
