import { ChevronDown, CircleUserRound } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

import { ROUTER_PATH } from '@/constants';
import { Loading } from '@/components/common';
import { TProfile } from '@/types';
import Image from 'next/image';

export interface UserPanelProps {
  type: 'button' | 'link';
  user: User;
  profile: TProfile;
}

export const UserPanel = ({ user, profile, type }: UserPanelProps) => {
  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      {type === 'link' && (
        <Link
          className="flex w-fit cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-background-info p-2.5 text-main duration-300 hover:text-primary"
          href={ROUTER_PATH.PROFILE + `/${user.id}`}
        >
          {profile.avatar_url ? (
            <Image
              className="w-[30px] rounded-[50%]"
              src={profile.avatar_url}
              alt="avatar"
              width={30}
              height={30}
            />
          ) : (
            <CircleUserRound size={30} />
          )}
          <p>{profile.username ?? user.email}</p>
        </Link>
      )}
      {type === 'button' && (
        <button className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-background-info p-2.5 text-main duration-300 hover:text-primary">
          {profile.avatar_url ? (
            <Image
              className="w-[30px] rounded-[50%]"
              src={profile.avatar_url}
              alt="avatar"
              width={30}
              height={30}
            />
          ) : (
            <CircleUserRound size={30} />
          )}
          <p>{profile.username ?? user.email}</p>
          <ChevronDown />
        </button>
      )}
    </div>
  );
};
