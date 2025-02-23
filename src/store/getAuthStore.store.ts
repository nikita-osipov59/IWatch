import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  setUser: (value: {
    id: string;
    email: string;
    name?: string | null;
    photoURL?: string | null;
  }) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPhotoURL: (photoURL: string) => void;
  setError: (error: string | null) => void;
  removeUser: () => void;
  isAuth: boolean;
  email: string;
  id: string | null;
  name: string | null;
  photoURL: string | null;
  error: string | null;
}

const clearStorage = () => {
  localStorage.removeItem("user");
};

export const getAuthStore = create<User>()(
  persist(
    (set) => ({
      isAuth: false,
      email: "",
      id: null,
      name: null,
      photoURL: null,
      error: null,
      setUser: ({ id, email, name, photoURL }) => {
        set(() => ({ id: id, email: email, name: name, photoURL: photoURL }));
        set(() => ({ isAuth: true }));
      },
      setEmail: (email) => {
        set(() => ({ email: email }));
      },
      setName: (name) => {
        set(() => ({ name: name }));
      },
      setPhotoURL: (photoURL) => {
        set(() => ({ photoURL: photoURL }));
      },
      setError: (error) => {
        set(() => ({ error: error }));
      },
      removeUser: () => {
        set(() => ({ id: null, email: "", isAuth: false }));
        clearStorage();
      },
    }),
    { name: "user" }
  )
);
