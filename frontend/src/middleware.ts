import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';
import { isAdminRoute, isProtectedRoute } from './shared/data/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  const token = req.cookies.get('token')?.value;

  const [, locale, ...rest] = req.nextUrl.pathname.split('/');
  const pathWithoutLocale = '/' + rest.join('/');
  const isProtected = isProtectedRoute(pathWithoutLocale);

  if (!isProtected) return response;

  if (!token) {
    const notFoundUrl = new URL(`/${locale}/not-found`, req.url);
    return NextResponse.rewrite(notFoundUrl);
  }

  const isAdmin = isAdminRoute(pathWithoutLocale);

  if (isAdmin) {
    
  }

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

