import Link from 'next/link';

import { Github, Telegram } from '@/components/common';

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 rounded-xl border border-border p-[15px] text-center text-main">
      <ul className="flex w-full items-center justify-center gap-[15px]">
        <li>
          <Link href="https://t.me/nikita_osipov59" target="_blank">
            <Telegram />
          </Link>
        </li>
        <li>
          <Link href="https://github.com/nikita-osipov59/IWatch" target="_blank">
            <Github />
          </Link>
        </li>
      </ul>
      <p>© IWatch {new Date().getFullYear()}</p>
    </footer>
  );
};
