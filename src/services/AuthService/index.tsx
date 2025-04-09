import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { ROUTER_PATH } from "@/router/PATH";

import { getAuthStore } from "@/store";

export const AuthService = () => {
  const navigate = useNavigate();

  const user = auth.currentUser;

  const {
    email,
    setUser,
    setError,
    photoURL,
    setName,
    setPhotoURL,
    removeUser,
  } = getAuthStore();

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser({
          email: user.email!,
          id: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
        });
        navigate(ROUTER_PATH.HOME);
      })
      .catch((error) => {
        setError(error.code);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  const handleRegistration = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser({
          email: user.email!,
          id: user.uid,
        });
        navigate(ROUTER_PATH.AUTH);
      })
      .catch((error) => {
        setError(error.code);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Смена пароля отправлена на почту");
      })
      .catch((error) => {
        setError(error.code);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  const handleUpdateProfile = (formName: string, formPhotoURL: string) => {
    updateProfile(user!, {
      displayName: formName,
      photoURL: formPhotoURL.length > 0 ? formPhotoURL: photoURL!,
    })
      .then(() => {
        setName(user!.displayName!);
        setPhotoURL(user!.photoURL!);
      })
      .catch((error) => {
        setError(error.code);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    } else {
      console.log("Статус: пользователь не авторизован");
    }
  });

  const handleSignOut = () => {
    signOut(auth);
    removeUser();
    console.log("Выход");
  };

  return {
    handleUpdateProfile,
    handleRegistration,
    handleLogin,
    handleSignOut,
    handleResetPassword,
  };
};
