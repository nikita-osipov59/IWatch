import { NextRequest, NextResponse } from 'next/server';
import { createServer } from './utils/supabase/server';
import { ROUTER_PATH } from './constants';

const PUBLIC_PATHS = [
  ROUTER_PATH.SIGNIN,
  ROUTER_PATH.SIGNUP,
  ROUTER_PATH.RECOVERYPASSWORD,
  ROUTER_PATH.UPDATEPASSWORD,
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Неавторизован → signin (кроме public)
  if (!user && !PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(ROUTER_PATH.SIGNIN, request.url));
  }

  // Авторизован → home с public страниц
  if (user && PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(ROUTER_PATH.HOME, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
