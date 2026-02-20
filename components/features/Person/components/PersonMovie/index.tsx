'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';

import { BorderPanel } from '@/components/common';
import { ROUTER_PATH } from '@/constants';
import { useGetQueryPersonById } from '@/components/features/Person/mutations';

type Params = {
  id: string;
};

export const PersonMovie = () => {
  const params = useParams<Params>();
  const { data } = useGetQueryPersonById(params.id);

  const sortedByRating = useMemo(
    () => [...data.movies].sort((a, b) => (b.rating || 0) - (a.rating || 0)),
    [data.movies],
  );

  return (
    <BorderPanel title="Участие в фильмах">
      <ul className="flex flex-col gap-[15px]">
        {sortedByRating.map((item, index) => (
          <Link
            className="rounded-xl border border-border p-[15px] duration-300 hover:border-primary"
            href={ROUTER_PATH.MOVIE + `/${item.id}`}
            key={index}
          >
            <li className="flex items-center justify-between">
              <div className="flex w-[420px] flex-col gap-[5px]">
                {item.name && <span>{item.name}</span>}
                {item.alternativeName && (
                  <span className="text-accent">{item.alternativeName}</span>
                )}
              </div>
              {item.rating && <div>{`${item.rating.toFixed(1)}⭐`}</div>}
              {item.enProfession && (
                <div className="w-[200px] text-center">Роль: {item.enProfession}</div>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </BorderPanel>
  );
};
