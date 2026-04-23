import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

// Forward the request pathname to server components via a custom header so
// the root layout can set <html lang> per-route (needed for /es/* pages).
function withPathname(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set('x-pathname', req.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

/**
 * Protects all /admin/* routes except /admin/login.
 * Redirects unauthenticated requests to the login page.
 * Also forwards x-pathname on every request.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin auth gate — only for /admin/* (but not /admin/login)
  const isAdmin = pathname.startsWith('/admin');
  const isAdminLogin = pathname === '/admin/login' || pathname.startsWith('/admin/login/');

  if (isAdmin && !isAdminLogin) {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const secret = process.env.SESSION_SECRET;

    if (!token || !secret) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
    } catch {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return withPathname(req);
}

export const config = {
  // Run on everything except static assets and Next internals so that every
  // rendered page gets x-pathname forwarded to server components.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|manifest.json|.*\\.(?:txt|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|otf)$).*)',
  ],
};
