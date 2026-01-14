import { CircleUserRound } from 'lucide-react';
import Link from 'next/link';

import { ROUTER_PATH } from '@/constants';
import { Loading } from '@/components/common';
import { getUser } from '@/app/hooks';

export const UserPanelServer = async () => {
  const user = await getUser();

  if (!user) {
    return <Loading />;
  }

  return (
    <Link
      className="flex items-center gap-2.5 rounded-xl border border-border bg-background-info p-2.5 duration-300 hover:text-primary"
      href={ROUTER_PATH.PROFILE + `/${user.id}`}
    >
      <CircleUserRound size={30} />
      <p>{user.email}</p>
    </Link>
  );
};
