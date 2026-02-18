'use client';

import Link from 'next/link';
import Image from 'next/image';

import { ROUTER_PATH } from '@/constants';
import { useGetQueryMovieBySearch } from '../../mutations';
import { Pagination } from '@/components/common';

type SearchListProps = {
  slug: string;
  pageNum: number;
};

export const SearchList = ({ slug, pageNum }: SearchListProps) => {
  const { data } = useGetQueryMovieBySearch(slug, pageNum);

  const sortedByRating = data.docs.sort((a, b) => (b.rating.kp || 0) - (a.rating.kp || 0));

  return (
    <div className="flex flex-col gap-[30px]">
      {data.docs && (
        <ul className="flex flex-wrap gap-[15px]">
          {sortedByRating.map((item) => (
            <li className="w-[200px]" key={item.id}>
              <Link className="flex flex-col gap-1.5" href={ROUTER_PATH.MOVIE + `/${item.id}`}>
                <Image
                  className="h-[300px] rounded-xl"
                  src={
                    item.poster?.url ||
                    'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg'
                  }
                  alt={item.name}
                  width={200}
                  height={300}
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Pagination totalPages={data.total} currentPage={data.page} />
    </div>
  );
};
