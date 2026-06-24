import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { ROUTER_PATH } from './constants';

const PUBLIC_PATHS = [
  ROUTER_PATH.SIGNIN,
  ROUTER_PATH.SIGNUP,
  ROUTER_PATH.RECOVERYPASSWORD,
  ROUTER_PATH.UPDATEPASSWORD,
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Создаём пустой ответ, который будем модифицировать (для установки кук)
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Создаём клиент Supabase с адаптером для middleware
  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        // Берём все куки из запроса
        return request.cookies.getAll().map((cookie) => ({
          name: cookie.name,
          value: cookie.value,
        }));
      },
      setAll(cookiesToSet) {
        // Устанавливаем куки в ответ
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

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

  // Возвращаем ответ с обновлёнными куками (если были изменения)
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
