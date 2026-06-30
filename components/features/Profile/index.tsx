import Image from 'next/image';
import Link from 'next/link';

import { CircleUserRound, Pencil } from 'lucide-react';

import { BorderPanel } from '@/components/common';
import { TProfile } from '@/types';
import { ROUTER_PATH } from '@/constants';
import { normalizeUrl } from '@/utils/helpers';
import { BackgroundUpload } from './components';

type ProfileProps = {
  profile: TProfile;
};

export const Profile = ({ profile }: ProfileProps) => {
  return (
    <BorderPanel>
      <BackgroundUpload currentBackground={profile.background_url} userId={profile.id} />
      <div className="relative flex items-center gap-[25px] px-[25px]">
        {profile.avatar_url ? (
          <Image
            className="w-[150px] rounded-[50%]"
            src={normalizeUrl(profile.avatar_url)}
            alt="avatar"
            width={150}
            height={150}
          />
        ) : (
          <CircleUserRound size={150} />
        )}
        <Link
          className="absolute top-0 right-0 rounded-xl border border-border bg-background-info p-[15px] duration-300 hover:border-primary"
          href={ROUTER_PATH.SETTINGS}
        >
          <Pencil />
        </Link>
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[36px]">{profile.username}</h1>
          <p className="text-accent">{profile.description ?? 'description'}</p>
        </div>
      </div>
    </BorderPanel>
  );
};
