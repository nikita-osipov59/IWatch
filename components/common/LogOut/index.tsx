import { LogOutIcon } from 'lucide-react';

import { signOut } from '@/actions/auth';

type LogOutTypes = {
  size?: number;
};

export const LogOut = ({ size }: LogOutTypes) => {
  return (
    <button
      onClick={() => signOut()}
      className="flex w-fit cursor-pointer items-center gap-3 rounded transition-all duration-300 hover:text-foreground"
    >
      <LogOutIcon size={size} />
      <h1>Logout</h1>
    </button>
  );
};
