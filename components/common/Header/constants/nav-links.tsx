import { ROUTER_PATH } from '@/constants';
import { Archive, House } from 'lucide-react';

export const navLinks = [
  {
    name: 'Home',
    link: ROUTER_PATH.HOME,
    icon: <House />,
  },
  {
    name: 'Archive',
    link: ROUTER_PATH.ARCHIVE,
    icon: <Archive />,
  },
];
