'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { navLinks } from './constants';
import { Logo } from '@/components/common';
import { signOut } from '@/actions/auth';

const linkClasses = twMerge(
  clsx(
    'flex w-fit items-center gap-3 rounded p-2 transition-all duration-300',
    'hover:text-foreground',
  ),
);

export const Header = () => {
  const router = usePathname();

  return (
    <header className="fixed h-screen w-[150px] border-r border-border py-6">
      <nav className="h-full" aria-label="Главное меню">
        <ul className="flex h-full flex-col justify-between gap-[30px] text-accent">
          <li>
            <Logo />
          </li>
          <div>
            {navLinks.map(({ name, link, icon }) => (
              <li key={link}>
                <Link className={`${linkClasses} ${router === link ? 'active' : ''}`} href={link}>
                  {icon}
                  {name}
                </Link>
              </li>
            ))}
          </div>
          <li>
            <button onClick={() => signOut()} className={`${linkClasses} cursor-pointer`}>
              <LogOut />
              <h1>Logout</h1>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
