import { Settings2 } from 'lucide-react';
import Link from 'next/link';

import { ROUTER_PATH } from '@/constants';

type LogOutTypes = {
  size?: number;
};

export const Settings = ({ size }: LogOutTypes) => {
  return (
    <Link
      href={ROUTER_PATH.SETTINGS}
      className="flex w-fit cursor-pointer items-center gap-3 rounded transition-all duration-300 hover:text-foreground"
    >
      <Settings2 size={size} />
      <p>Settings</p>
    </Link>
  );
};
