import { Github, Telegram } from "@/components/common";

export const Footer = () => {
  return (
    <footer className="text-center p-[15px] border border-border rounded-xl flex flex-col gap-2">
      <ul className="flex justify-center items-center w-full gap-[15px]">
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
