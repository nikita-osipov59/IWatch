import { SubmitHandler, useForm } from "react-hook-form";

import { Mail } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getAuthStore } from "@/store";

import { AuthService } from "@/services";

import { Button, Reminder } from "@/components/ui";

import { NavLinkBtn } from "@/components/ui";

import style from "./style.module.scss";

const schema = z.object({
  email: z.string().email().min(2).max(40),
});

type RecoveryForm = z.infer<typeof schema>;

export const FormRecoveryPassword = () => {
  const { email, setEmail } = getAuthStore();

  const { handleResetPassword } = AuthService();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecoveryForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RecoveryForm> = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    handleResetPassword();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
      <div className={style.welcomeBox}>
        <p className={style.welcomeTitle}>
          Welcome to <span>IWatch</span>you can do more
        </p>
      </div>
      <div className={style.box}>
        <div className={style.title}>
          <NavLinkBtn to="#">Recovery password</NavLinkBtn>
        </div>
        <div className={style.content}>
          <div className={style.mail}>
            <p>Email</p>
            <label htmlFor="mail-input">
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
          {errors && <span className="error">{errors.email?.message}</span>}
        </div>
        <Button width="100%" variant="primary" type="submit">
          {isSubmitting ? "Loading..." : "Send email"}
        </Button>
        <Reminder view="Remember" />
      </div>
    </form>
  );
};
