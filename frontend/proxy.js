import { NextResponse } from 'next/server';

export function middleware(request) {
  // Read the HTTP-only cookie securely
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname === '/login' || pathname === '/register';
  const isProtectedRoute = pathname.startsWith('/dashboard');

  // redirect authenticated users away from login/register
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// specify which routes this middleware should run on
export const config = {
  matcher: [
    '/',               
    '/dashboard/:path*', 
    '/login', 
    '/register'
  ],
};