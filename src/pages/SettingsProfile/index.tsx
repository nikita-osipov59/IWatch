import { useState } from "react";
import { CircleUserRound, Image } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui";

import { AuthService } from "@/services";

import style from "./style.module.scss";

const schema = z.object({
  username: z.string().min(2, "Минимальная длина: 2 символа"),
  photoURL: z.string(),
});

type SettingsProfileForm = z.infer<typeof schema>;

const SettingsProfile = () => {
  const [formName, setFormName] = useState("");
  const [formPhotoURL, setFormPhotoURL] = useState("");

  const { handleUpdateProfile } = AuthService();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsProfileForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SettingsProfileForm> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // TODO: Разделить обновление профиля на разные экшены
    handleUpdateProfile(data.username, data.photoURL!);
  };

  return (
    <div className={style.box}>
      <div className={style.titleBox}>
        <p className={style.title}>Edit profile</p>
        <p className={style.description}>Manage your profile settings</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.content}>
          <div className={style.username}>
            <p>Username</p>
            <label htmlFor="username-input" className={style.username}>
              <CircleUserRound />
            </label>
            <input
              className={style.input}
              {...register("username")}
              id="username-input"
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="username"
            />
          </div>
          {errors.username && (
            <span className="error">{errors.username?.message}</span>
          )}
          <div className={style.photoURL}>
            <p>PhotoURL</p>
            <label htmlFor="photoURL-input" className={style.photoURL}>
              <Image />
            </label>
            <input
              className={style.input}
              {...register("photoURL")}
              id="photoURL-input"
              type="text"
              value={formPhotoURL}
              onChange={(e) => setFormPhotoURL(e.target.value)}
              placeholder="photoURL"
            />
          </div>
          {errors.photoURL && (
            <span className="error">{errors.photoURL?.message}</span>
          )}
        </div>
        <Button variant="primary" width="100%" type="submit">
          {isSubmitting ? "Loading..." : "Save changes"}
        </Button>
      </form>
    </div>
  );
};

export default SettingsProfile;
