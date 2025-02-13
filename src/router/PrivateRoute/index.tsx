import { Navigate, Outlet } from "react-router-dom";

import { ROUTER_PATH } from "@/router/PATH";

import {
  AsidePanel,
  Container,
  NotificationPanel,
  Search,
} from "@/components/ui";

import { getAuthStore } from "@/store";

import { UserPanel } from "@/components";

import style from "./style.module.scss";

export const PrivateRoute = () => {
  const { isAuth } = getAuthStore();

  if (!isAuth) {
    return <Navigate to={ROUTER_PATH.REGISTRATION} />;
  }

  return (
    isAuth && (
      <Container>
        <AsidePanel />
        <div className={style.box}>
          <div className={style.bar}>
            <div className={style.content}>
              <Search />
              <NotificationPanel />
            </div>
            <UserPanel />
          </div>
          <Outlet />
        </div>
      </Container>
    )
  );
};
