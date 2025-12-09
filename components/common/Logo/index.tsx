import Link from 'next/link';

import { Film } from 'lucide-react';

import { ROUTER_PATH } from '@/constants';

export const Logo = () => {
  return (
    <Link className="flex items-center gap-3 text-primary" href={ROUTER_PATH.HOME}>
      <Film size={32} />
      <div>IWatch</div>
    </Link>
  );
};
