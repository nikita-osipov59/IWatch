import { Navigate, Outlet, useLocation } from "react-router-dom";

import { SettingsPanel } from "@/components";

import { ROUTER_PATH } from "@/router/PATH";

import style from "./style.module.scss";

const SettingsPage = () => {
  const location = useLocation();

  if (location.pathname === ROUTER_PATH.SETTINGS) {
    return <Navigate to={ROUTER_PATH.SETTINGS_PROFILE} />;
  }

  return (
    <section>
      <div className={style.box}>
        <SettingsPanel />
        <Outlet />
      </div>
    </section>
  );
};

export default SettingsPage;
