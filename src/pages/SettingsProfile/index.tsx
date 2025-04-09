import { useState } from "react";
import { CircleUserRound, Image } from "lucide-react";

import { getAuthStore } from "@/store";

import { Button } from "@/components/ui";

import { AuthService } from "@/services";

import style from "./style.module.scss";

const SettingsProfile = () => {
  const { error, setError } =
    getAuthStore();

  const [formName, setFormName] = useState("");
  const [formPhotoURL, setFormPhotoURL] = useState("");

  const { handleUpdateProfile } = AuthService();

  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 30;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formName.length < MIN_NAME_LENGTH ||
      formName.length > MAX_NAME_LENGTH
    ) {
      setError(
        `Username must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters long.`
      );
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
    
    handleUpdateProfile(formName!, formPhotoURL!);
  };

  return (
    <div className={style.box}>
      <div className={style.titleBox}>
        <p className={style.title}>Edit profile</p>
        <p className={style.description}>
          Manage your profile settings
        </p>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
        <div className={style.content}>
          <div className={style.username}>
            <p>Username</p>
            <label htmlFor="username-input" className={style.username}>
              <CircleUserRound />
            </label>
            <input
              className={style.input}
              id="username-input"
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="username"
            />
          </div>
          <div className={style.photoURL}>
            <p>PhotoURL</p>
            <label htmlFor="photoURL-input" className={style.photoURL}>
              <Image />
            </label>
            <input
              className={style.input}
              id="photoURL-input"
              type="text"
              value={formPhotoURL}
              onChange={(e) => setFormPhotoURL(e.target.value)}
              placeholder="photoURL"
            />
          </div>
          {error && <span className="error">{error}</span>}
        </div>
        <Button variant="primary" width="100%" type="submit">
          Save changes
        </Button>
      </form>
    </div>
  );
};

export default SettingsProfile;
