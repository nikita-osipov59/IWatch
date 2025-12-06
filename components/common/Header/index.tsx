import Link from "next/link";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

import { House, LogOut } from "lucide-react";

import { ROUTER_PATH } from "@/constants";
import { Logo } from "@/components/common";

const linkClasses = twMerge(
  clsx(
    "flex gap-3 items-center transition-all duration-300 p-2 rounded",
    "hover:text-foreground"
  )
);

export const Header = () => {
  return (
    <header className="h-screen w-[150px] py-6 border-r border-border fixed">
      <nav className="h-full " aria-label="Главное меню">
        <ul className="flex flex-col justify-between h-full gap-[30px] text-accent ">
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
