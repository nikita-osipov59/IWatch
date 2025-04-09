import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTER_PATH } from "@/router/PATH/";

import { PrivateRoute } from "./PrivateRoute";

const AuthPage = lazy(() => import("@/pages/AuthPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const MoviePage = lazy(() => import("@/pages/MoviePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const RecoveryPasswordPage = lazy(() => import("@/pages/RecoveryPasswordPage"));
const RegistrationPage = lazy(() => import("@/pages/RegistrationPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const SettingsProfile = lazy(() => import("@/pages/SettingsProfile"));

export const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={ROUTER_PATH.HOME} element={<HomePage />} />
        <Route path={ROUTER_PATH.MOVIE + `/:id`} element={<MoviePage />} />
        <Route path={ROUTER_PATH.SEARCH + `/:query`} element={<SearchPage />} />
        <Route path={ROUTER_PATH.PROFILE + `/:id`} element={<ProfilePage />} />
        <Route path={ROUTER_PATH.SETTINGS} element={<SettingsPage />}>
          <Route
            path={ROUTER_PATH.SETTINGS_PROFILE}
            index
            element={<SettingsProfile />}
          />
        </Route>
      </Route>
      <Route path={ROUTER_PATH.REGISTRATION} element={<RegistrationPage />} />
      <Route path={ROUTER_PATH.AUTH} element={<AuthPage />} />
      <Route
        path={ROUTER_PATH.RECOVERYPASSWORD}
        element={<RecoveryPasswordPage />}
      />
      <Route path={ROUTER_PATH.NOTFOUNDPAGE} element={<NotFoundPage />} />
    </Routes>
  );
};
