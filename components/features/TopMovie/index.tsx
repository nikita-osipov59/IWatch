'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useGetQueryTopMovie } from './mutations';
import { BorderPanel } from '@/components/common';
import { ROUTER_PATH } from '@/constants';

export const TopMovie = () => {
  const { data } = useGetQueryTopMovie();

  return (
    <BorderPanel title="TOP 10 MOVIES">
      <ul className="flex gap-[15px] overflow-auto pb-[15px]">
        {data.movies.docs.map((item) => (
          <li className="duration-300 hover:opacity-50" key={item.movie.id}>
            <Link
              className="flex flex-col gap-[5px]"
              href={ROUTER_PATH.MOVIE + `/${item.movie.id}`}
            >
              <Image
                className="h-[300px] w-[200px] max-w-[200px] rounded-xl"
                width={200}
                height={300}
                src={item.movie.poster.url}
                alt={item.movie.name}
                loading="lazy"
              />
              {item.movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </BorderPanel>
  );
};
