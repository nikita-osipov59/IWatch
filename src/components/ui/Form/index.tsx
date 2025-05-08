import { SubmitHandler, useForm } from "react-hook-form";

import { useLocation } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import { ROUTER_PATH } from "@/router/PATH";

import { getAuthStore } from "@/store";

import { AuthService } from "@/services";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button, Reminder, NavLinkBtn } from "@/components/ui";

import style from "./style.module.scss";

const schema = z.object({
  email: z.string().email().min(2).max(40),
  password: z.string(),
});

type AuthForm = z.infer<typeof schema>;

export const Form = () => {
  const { email, setEmail } = getAuthStore();

  const { handleLogin, handleRegistration } = AuthService();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthForm>({
    resolver: zodResolver(schema),
  });

  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const location = useLocation();

  const onSubmit: SubmitHandler<AuthForm> = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (location.pathname === ROUTER_PATH.REGISTRATION) {
      handleRegistration(email, password);
    }
    if (location.pathname === ROUTER_PATH.AUTH) {
      handleLogin(email, password);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.welcomeBox}>
        <p className={style.welcomeTitle}>
          Welcome to <span>IWatch</span>you can do more
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.box}>
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
            <label htmlFor="mail-input" className={style.mail}>
              <Mail size={22} />
            </label>
            <input
              className={style.input}
              {...register("email")}
              id="mail-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.ru"
            />
          </div>
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <div className={style.password}>
            <p>Password</p>
            <label htmlFor="password-input" className={style.lock}>
              <Lock size={22} />
            </label>
            <input
              className={style.input}
              {...register("password")}
              id="password-input"
              type={isShow ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            {isShow ? (
              <label
                onClick={() => setIsShow(!isShow)}
                htmlFor="password-input"
                className={style.Eye}
              >
                <EyeOff size={22} />
              </label>
            ) : (
              <label
                onClick={() => setIsShow(!isShow)}
                htmlFor="password-input"
                className={style.EyeOff}
              >
                <Eye size={22} />
              </label>
            )}
          </div>
          {errors.password && (
            <span className="error">{errors.password?.message}</span>
          )}
        </div>
        {location.pathname === ROUTER_PATH.REGISTRATION && (
          <>
            <Button width="100%" variant="primary" type="submit">
              {isSubmitting ? "Loading..." : "Registration"}
            </Button>
            <Reminder view="Registration" />
          </>
        )}
        {location.pathname === ROUTER_PATH.AUTH && (
          <>
            <div className={style.forgotBox}>
              <Reminder view="Forgot" />
            </div>
            <Button width="100%" variant="primary" type="submit">
              {isSubmitting ? "Loading..." : "Login"}
            </Button>
            <Reminder view="Login" />
          </>
        )}
      </form>
    </div>
  );
};
