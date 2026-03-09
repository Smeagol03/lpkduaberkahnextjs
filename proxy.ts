import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Admin routes that require authentication
const adminRoutes = '/admin';

// Public routes that should redirect to dashboard if logged in
const publicAdminRoutes = ['/admin/login'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get session from cookie
  const sessionCookie = request.cookies.get('adminSession');
  const hasSession = !!sessionCookie;

  // Check if trying to access admin routes
  if (pathname.startsWith(adminRoutes)) {
    // If accessing login page and already has session, redirect to dashboard
    if (publicAdminRoutes.some(route => pathname.startsWith(route))) {
      if (hasSession) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // If accessing other admin routes without session, redirect to login
    if (!hasSession) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Validate session expiration
    if (hasSession) {
      try {
        const session = JSON.parse(decodeURIComponent(sessionCookie.value));
        const now = Date.now();
        const sessionAge = now - session.timestamp;
        const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

        if (sessionAge > SESSION_DURATION) {
          // Session expired, redirect to login
          const response = NextResponse.redirect(new URL('/admin/login', request.url));
          response.cookies.delete('adminSession');
          return response;
        }
      } catch (error) {
        // Invalid session, redirect to login
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('adminSession');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public/)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sitemap.xml|robots.txt).*)',
  ],
};
