import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTER_PATH } from "@/router/PATH";

import {
  AsidePanel,
  Container,
  Footer,
  Loading,
  NotificationPanel,
  Search,
} from "@/components/ui";

import { UserPanelExtended } from "@/components";

import { getAuthStore } from "@/store";

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
            <Search />
            <div className={style.content}>
              <NotificationPanel />
              <UserPanelExtended />
            </div>
          </div>
          <Suspense
            fallback={
              <div className={style.loader}>
                <Loading position="center" />
              </div>
            }
          >
            <main className={style.main}>
              <Outlet />
            </main>
          </Suspense>
          <Footer />
        </div>
      </Container>
    )
  );
};
