import { Github, Telegram } from '@/components/common';

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 rounded-xl border border-border p-[15px] text-center">
      <ul className="flex w-full items-center justify-center gap-[15px]">
        <li>
          <a href="https://t.me/nikita_osipov59" target="_blank">
            <Telegram />
          </a>
        </li>
        <li>
          <a href="https://github.com/nikita-osipov59/IWatch" target="_blank">
            <Github />
          </a>
        </li>
      </ul>
      <p>© IWatch {new Date().getFullYear()}</p>
    </footer>
  );
};
