'use client';

import { useState } from 'react';

interface Subscriber {
  id: string;
  email: string;
  source: string | null;
  user_agent: string | null;
  created_at: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    + ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export default function SubscribersTable({ subscribers }: { subscribers: Subscriber[] }) {
  const [copied, setCopied] = useState(false);

  async function copyAll() {
    const emails = subscribers.map(s => s.email).join(', ');
    try {
      await navigator.clipboard.writeText(emails);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  if (subscribers.length === 0) {
    return (
      <div style={{
        padding: 60, textAlign: 'center', background: 'white',
        borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.03)',
      }}>
        <div style={{ fontSize: 15, color: '#636E72', marginBottom: 10 }}>No subscribers yet.</div>
        <div style={{ fontSize: 13, color: '#B2BEC3' }}>
          Emails captured from the footer form, blog posts, and anywhere else will show up here.
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
      <div style={{
        padding: '10px 16px', background: '#FAFAF7',
        borderBottom: '1px solid #EEEDE8',
        display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
      }}>
        <button
          type="button"
          onClick={copyAll}
          style={{
            padding: '6px 12px', borderRadius: 8,
            border: '1px solid #EEEDE8', background: 'white',
            fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            color: copied ? '#00B894' : '#1A1A18',
          }}
        >
          {copied ? '✓ All emails copied' : 'Copy all emails'}
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#FAFAF7', borderBottom: '1px solid #EEEDE8' }}>
            <th style={th}>Email</th>
            <th style={th}>Source</th>
            <th style={th}>Subscribed</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #F5F4F0' }}>
              <td style={td}>
                <a href={`mailto:${s.email}`} style={{ fontWeight: 600, color: '#1A1A18', textDecoration: 'none' }}>
                  {s.email}
                </a>
              </td>
              <td style={{ ...td, color: '#636E72', fontSize: 13 }}>
                {s.source || <span style={{ color: '#B2BEC3' }}>—</span>}
              </td>
              <td style={{ ...td, color: '#636E72', fontSize: 13 }}>
                {formatDate(s.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700,
  color: '#636E72', letterSpacing: 0.5, textTransform: 'uppercase',
};
const td: React.CSSProperties = { padding: '14px 16px', fontSize: 14 };
