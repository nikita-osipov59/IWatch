import { Link } from "react-router-dom";

import { getAuthStore } from "@/store";

import { CircleUserRound } from "lucide-react";

import { ROUTER_PATH } from "@/router/PATH";

import style from "./style.module.scss";

export const UserPanel = () => {
  const { name, email, id } = getAuthStore();

  return (
    <div className={style.userPanel}>
      <Link to={ROUTER_PATH.PROFILE + `/${id}`} className={style.user}>
        <CircleUserRound size={32} />
        <p>{name ? name : email}</p>
      </Link>
    </div>
  );
};
