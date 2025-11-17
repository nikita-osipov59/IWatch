import { Github, Telegram } from "../icons";
import style from "./style.module.scss";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <ul className={style.list}>
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
      <p>© IMovie {new Date().getFullYear()}</p>
    </footer>
  );
};
