'use client';

import type { SeoCheck } from '@/lib/seo-check';
import type { LinkCheckResult } from '@/lib/link-check';

interface Props {
  checks: SeoCheck[];
  linkResults: LinkCheckResult[];
  checkingLinks: boolean;
  wordCount: number;
  readingTime: number;
  onRecheckLinks: () => void;
}

const dot = (color: string): React.CSSProperties => ({
  width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 5,
});

export default function SeoPanel({ checks, linkResults, checkingLinks, wordCount, readingTime, onRecheckLinks }: Props) {
  const errors = checks.filter(c => c.severity === 'error');
  const warnings = checks.filter(c => c.severity === 'warning');
  const infos = checks.filter(c => c.severity === 'info');

  const brokenLinks = linkResults.filter(l => !l.ok);
  const internalBroken = brokenLinks.filter(l => l.type === 'internal');
  const externalBroken = brokenLinks.filter(l => l.type === 'external');

  return (
    <div style={{ background: 'white', border: '1.5px solid #EEEDE8', borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 0.5, marginBottom: 10 }}>SEO CHECKS</div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14, fontSize: 12, fontWeight: 600 }}>
        <Badge color="#FF6B6B" count={errors.length + internalBroken.length} label="Errors" />
        <Badge color="#D4A012" count={warnings.length + externalBroken.length} label="Warnings" />
        <Badge color="#0984E3" count={infos.length} label="Info" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#636E72', paddingBottom: 12, borderBottom: '1px solid #F5F4F0', marginBottom: 12 }}>
        <span>{wordCount} words</span>
        <span>{readingTime} min read</span>
      </div>

      {checks.length === 0 && linkResults.length === 0 && (
        <div style={{ fontSize: 12, color: '#00B894', padding: '8px 0', fontWeight: 600 }}>✓ All SEO checks pass</div>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {checks.map(c => (
          <li key={c.id} style={{ display: 'flex', gap: 8, fontSize: 12, lineHeight: 1.45 }}>
            <span style={dot(c.severity === 'error' ? '#FF6B6B' : c.severity === 'warning' ? '#D4A012' : '#0984E3')} />
            <div>
              <div style={{ color: '#1A1A18', fontWeight: 600 }}>{c.message}</div>
              {c.fix && <div style={{ color: '#636E72', marginTop: 2 }}>{c.fix}</div>}
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #F5F4F0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 0.5 }}>LINK CHECK</div>
          <button
            type="button"
            onClick={onRecheckLinks}
            disabled={checkingLinks}
            style={{
              fontSize: 11, color: '#6C5CE7', background: 'none', border: 'none',
              cursor: checkingLinks ? 'wait' : 'pointer', fontWeight: 600, fontFamily: 'inherit',
            }}
          >
            {checkingLinks ? 'Checking…' : 'Re-check'}
          </button>
        </div>
        {linkResults.length === 0 ? (
          <div style={{ fontSize: 12, color: '#636E72' }}>No links yet</div>
        ) : brokenLinks.length === 0 ? (
          <div style={{ fontSize: 12, color: '#00B894', fontWeight: 600 }}>✓ All {linkResults.length} links valid</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {brokenLinks.map(l => (
              <li key={l.url} style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                <span style={dot(l.type === 'internal' ? '#FF6B6B' : '#D4A012')} />
                <div style={{ wordBreak: 'break-all' }}>
                  <div style={{ fontWeight: 600, color: '#1A1A18' }}>
                    {l.type === 'internal' ? 'Broken internal link' : 'Broken external link'} {l.status ? `(${l.status})` : ''}
                  </div>
                  <div style={{ color: '#636E72', fontSize: 11 }}>{l.url}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Badge({ color, count, label }: { color: string; count: number; label: string }) {
  return (
    <div style={{
      flex: 1, padding: '6px 8px', borderRadius: 8, textAlign: 'center',
      background: count > 0 ? `${color}15` : '#F5F4F0',
      color: count > 0 ? color : '#B2BEC3',
    }}>
      <div style={{ fontSize: 16, fontWeight: 800 }}>{count}</div>
      <div style={{ fontSize: 10, letterSpacing: 0.3 }}>{label}</div>
    </div>
  );
}
