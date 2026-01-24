import { CircleUserRound } from 'lucide-react';

import { BorderPanel } from '@/components/common';
import { TProfile } from '@/types';
import Image from 'next/image';

type ProfileProps = {
  profile: TProfile;
};

export const Profile = ({ profile }: ProfileProps) => {
  return (
    <BorderPanel>
      <div className="flex items-center gap-[25px]">
        <div className="ml-[25px]">
          {profile.avatar_url ? (
            <Image
              className="w-[150px] rounded-[50%]"
              src={profile.avatar_url}
              alt="avatar"
              width={150}
              height={150}
            />
          ) : (
            <CircleUserRound size={150} />
          )}
        </div>
        <div className="flex flex-col gap-2.5">
          <h1 className="text-[36px]">{profile.username}</h1>
          <p className="text-accent">{profile.description ?? 'description'}</p>
        </div>
      </div>
    </BorderPanel>
  );
};
