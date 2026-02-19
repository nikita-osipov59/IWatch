import Link from 'next/link';

import { BorderPanel } from '@/components/common';
import { useGetQueryGenres } from './mutations';
import { ROUTER_PATH } from '@/constants';
import { formatTitle } from '@/utils/helpers';

export const Genres = () => {
  const { data } = useGetQueryGenres();

  return (
    <BorderPanel title="Genres">
      <ul className="flex gap-[15px] overflow-auto">
        {data.map((item, index) => (
          <li className="mb-[15px]" key={index}>
            <Link
              className="flex h-full items-center rounded-xl bg-black p-[40px]"
              href={ROUTER_PATH.SELECTION + `/${item.name}`}
            >
              {formatTitle(item.name)}
            </Link>
          </li>
        ))}
      </ul>
    </BorderPanel>
  );
};
