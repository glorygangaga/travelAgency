import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';
import { isAdminRoute, isModeratorRoute, isProtectedRoute } from './shared/data/routing';
import { EnumTokens } from './services/auth-token.service';
import { ROLE } from './shared/types/user.types';

const intlMiddleware = createMiddleware(routing);

async function checkRole(accessToken: string): Promise<ROLE | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/role`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: 'include',
      cache: 'no-store',
    });
    if (!res.ok) return null;
  
    const data = await res.json() as ROLE;
    return data;
  } catch(error) {
    console.error(error);
    return null;
  }
}

function returnNotFoundPage(locale: string, url: string): NextResponse<unknown> {
  const notFoundUrl = new URL(`/${locale}/not-found`, url);
  return NextResponse.rewrite(notFoundUrl);
}

export default async function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  const refreshToken = req.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const [, locale, ...rest] = req.nextUrl.pathname.split('/');
  const pathWithoutLocale = '/' + rest.join('/');
  const isProtected = isProtectedRoute(pathWithoutLocale);

  if (!isProtected) return response;

  if (!refreshToken) return returnNotFoundPage(locale, req.url);

  const isAdmin = isAdminRoute(pathWithoutLocale);
  if (isAdmin) {
    const accessToken = req.cookies.get(EnumTokens.ACCESS_TOKEN)?.value || '';
    const data = await checkRole(accessToken);
    if (data !== ROLE.ADMIN) return returnNotFoundPage(locale, req.url);
    return response;
  }

  const isModerator = isModeratorRoute(pathWithoutLocale);
  if (isModerator) {
    const accessToken = req.cookies.get(EnumTokens.ACCESS_TOKEN)?.value || '';
    const data = await checkRole(accessToken);
    if (data !== ROLE.MODERATOR) return returnNotFoundPage(locale, req.url);
    return response;
  }

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

