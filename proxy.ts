import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './utils/supabase/server';
import { ROUTER_PATH } from './constants';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (
    !user &&
    !pathname.startsWith(ROUTER_PATH.SIGNIN) &&
    !pathname.startsWith(ROUTER_PATH.SIGNUP)
  ) {
    return NextResponse.redirect(new URL(ROUTER_PATH.SIGNIN, request.url));
  }

  if (
    user &&
    (pathname.startsWith(ROUTER_PATH.SIGNIN) || pathname.startsWith(ROUTER_PATH.SIGNUP))
  ) {
    return NextResponse.redirect(new URL(ROUTER_PATH.HOME, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
