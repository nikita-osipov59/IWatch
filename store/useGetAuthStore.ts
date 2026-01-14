import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthStoreActions = {
  setEmail: (email: string) => void;

  email: string;
};

export const useGetAuthStore = create<AuthStoreActions>()(
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
