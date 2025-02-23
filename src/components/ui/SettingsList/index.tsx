import { ROUTER_PATH } from "@/router/PATH";

import { NavLinkBtn } from "@/components/ui";

import style from "./style.module.scss";

export const SettingsList = () => {
  return (
    <ul className={style.list}>
      <li>
        <NavLinkBtn to={ROUTER_PATH.SETTINGS_PROFILE} variant="default">
          Edit Profile
        </NavLinkBtn>
      </li>
    </ul>
  );
};
