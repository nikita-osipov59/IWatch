import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

import { House, LogOut } from 'lucide-react';

import { ROUTER_PATH } from '@/constants';
import { Logo } from '@/components/common';

const linkClasses = twMerge(
  clsx('flex items-center gap-3 rounded p-2 transition-all duration-300', 'hover:text-foreground'),
);

export const Header = () => {
  return (
    <header className="fixed h-screen w-[150px] border-r border-border py-6">
      <nav className="h-full" aria-label="Главное меню">
        <ul className="flex h-full flex-col justify-between gap-[30px] text-accent">
          <li>
            <Logo />
          </li>
          <div>
            <li>
              <Link className={linkClasses} href={ROUTER_PATH.HOME}>
                <House size={22} />
                <h1>Home</h1>
              </Link>
            </li>
          </div>
          <li>
            <Link className={linkClasses} href={ROUTER_PATH.HOME}>
              <LogOut />
              <h1>Logout</h1>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
