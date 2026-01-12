import { LogOutIcon } from 'lucide-react';

import { signOut } from '@/actions/auth';

export const LogOut = () => {
  return (
    <button
      onClick={() => signOut()}
      className="flex w-fit cursor-pointer items-center gap-3 rounded p-2 transition-all duration-300 hover:text-foreground"
    >
      <LogOutIcon />
      <h1>Logout</h1>
    </button>
  );
};
