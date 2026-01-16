import { ChevronDown, CircleUserRound } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

import { ROUTER_PATH } from '@/constants';
import { Loading } from '@/components/common';

export interface UserPanelProps {
  type: 'button' | 'link';
  user: User;
}

export const UserPanel = ({ user, type }: UserPanelProps) => {
  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      {type === 'link' && (
        <Link
          className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-background-info p-2.5 text-main duration-300 hover:text-primary"
          href={ROUTER_PATH.PROFILE + `/${user.id}`}
        >
          <CircleUserRound size={30} />
          <p>{user.email}</p>
        </Link>
      )}
      {type === 'button' && (
        <button className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-background-info p-2.5 text-main duration-300 hover:text-primary">
          <CircleUserRound size={32} />
          <p>{user.email}</p>
          <ChevronDown />
        </button>
      )}
    </div>
  );
};
