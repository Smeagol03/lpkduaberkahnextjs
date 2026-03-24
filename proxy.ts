import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Admin routes that require authentication
const adminRoutes = '/admin';

// Public routes that should redirect to dashboard if logged in
const publicAuthRoutes = ['/login'];

// API routes that should be ignored
const apiRoutes = '/api';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  // Get session from cookie
  const sessionCookie = request.cookies.get('adminSession');
  let hasValidSession = false;
  let isSessionExpired = false;

  if (sessionCookie) {
    try {
      const session = JSON.parse(decodeURIComponent(sessionCookie.value));
      const now = Date.now();

      // Check session expiration
      if (session.expiresAt && now > session.expiresAt) {
        isSessionExpired = true;
      } else {
        hasValidSession = true;
      }
    } catch (error) {
      // Invalid session format
      hasValidSession = false;
    }
  }

  // Handle login page
  if (pathname === '/login') {
    // If already has valid session, redirect to dashboard
    if (hasValidSession && !isSessionExpired) {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // If session expired, clear cookie but allow access to login
    if (isSessionExpired) {
      const response = NextResponse.next();
      response.cookies.delete('adminSession');
      return response;
    }

    return NextResponse.next();
  }

  // Handle admin routes
  if (pathname.startsWith(adminRoutes)) {
    // Check if accessing public admin routes (if any)
    // Currently no public routes within /admin

    // If no valid session, redirect to login
    if (!hasValidSession || isSessionExpired) {
      // Clear expired cookie if exists
      const response = NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathname + search)}`, request.url));
      if (isSessionExpired) {
        response.cookies.delete('adminSession');
      }
      return response;
    }

    return NextResponse.next();
  }

  // Handle other routes
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
