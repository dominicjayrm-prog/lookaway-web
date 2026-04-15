'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Blink from '@/components/Blink';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#FAFAF7',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(250,250,247,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '12px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
        }}>
          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Blink size={28} expression="normal" />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#6C5CE7' }}>Blanked Admin</span>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link href="/admin" style={{ fontSize: 13, color: pathname === '/admin' ? '#1A1A18' : '#636E72', fontWeight: 600 }}>Posts</Link>
            <Link href="/admin/posts/new" style={{ fontSize: 13, color: pathname === '/admin/posts/new' ? '#1A1A18' : '#636E72', fontWeight: 600 }}>New post</Link>
            <Link href="/admin/subscribers" style={{ fontSize: 13, color: pathname === '/admin/subscribers' ? '#1A1A18' : '#636E72', fontWeight: 600 }}>Subscribers</Link>
            <Link href="/" target="_blank" rel="noopener" style={{ fontSize: 13, color: '#636E72', fontWeight: 600 }}>View site ↗</Link>
            <form action="/admin/logout" method="POST" style={{ display: 'inline' }}>
              <button type="submit" style={{
                padding: '6px 14px', borderRadius: 8, background: '#1A1A18', color: 'white',
                fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px 80px' }}>
        {children}
      </main>
    </div>
  );
}
