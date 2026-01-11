import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  setEmail: (email: string) => void;

  email: string;
};

export const useGetAuthStore = create<User>()(
  persist(
    (set) => ({
      email: '',
      setEmail: (email) => {
        set(() => ({ email: email }));
      },
    }),
    { name: 'user' },
  ),
);
