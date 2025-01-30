import { useLocation } from "react-router-dom";

import { useState } from "react";

import { ROUTER_PATH } from "@/router/PATH";

import { Mail, Lock } from "@/components/ui/svg";

import { getAuthStore } from "@/store";

import { AuthService } from "@/services";

import { Button, Reminder } from "@/components/ui";

import { NavLinkBtn } from "@/components/ui";

import style from "./style.module.scss";

export const Form = () => {
  const { error, email, setEmail } = getAuthStore();

  const { handleLogin, handleRegistration } = AuthService();

  const [password, setPassword] = useState("");

  const location = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={style.wrapper}>
      <div className={style.welcomeBox}>
        <p className={style.welcomeTitle}>
          Welcome to <span>IWatch</span>you can do more
        </p>
      </div>
      <form onSubmit={handleSubmit} className={style.box}>
        <div className={style.title}>
          <NavLinkBtn to={ROUTER_PATH.REGISTRATION} variant="default">
            Registration
          </NavLinkBtn>
          <div>/</div>
          <NavLinkBtn to={ROUTER_PATH.AUTH} variant="default">
            Login
          </NavLinkBtn>
        </div>
        <div className={style.content}>
          <div className={style.mail}>
            <p>Email</p>
            <label htmlFor="mail-input">
              <Mail size={22} />
            </label>
            <input
              className={style.input}
              id="mail-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.ru"
            />
          </div>
          <div className={style.lock}>
            <p>Password</p>
            <label htmlFor="password-input">
              <Lock size={22} />
            </label>
            <input
              className={style.input}
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          {error && <span className="error">{error}</span>}
        </div>
        {location.pathname === ROUTER_PATH.REGISTRATION && (
          <>
            <Button
              onClick={() => handleRegistration(email, password)}
              width="100%"
              variant="primary"
              type="submit"
            >
              Registration
            </Button>
            <Reminder view="Registration" />
          </>
        )}
        {location.pathname === ROUTER_PATH.AUTH && (
          <>
            <div className={style.forgotBox}>
              <Reminder view="Forgot" />
            </div>
            <Button
              onClick={() => handleLogin(email, password)}
              width="100%"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
            <Reminder view="Login" />
          </>
        )}
      </form>
    </div>
  );
};
