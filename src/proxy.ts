import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'es'] as const;
const defaultLocale = 'en';

function detectLocale(request: NextRequest): string {
  const accept = request.headers.get('accept-language') ?? '';
  const preferred = accept.split(',')[0]?.split('-')[0]?.toLowerCase();
  if (preferred && (locales as readonly string[]).includes(preferred)) return preferred;
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
