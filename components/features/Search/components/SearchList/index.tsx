'use client';

import Link from 'next/link';
import Image from 'next/image';

import { ROUTER_PATH } from '@/constants';
import { useGetQueryMovieBySearch } from '@/components/features/Search/mutations';
import { Pagination, Rating } from '@/components/common';
import { normalizeUrl } from '@/utils/helpers';

type SearchListProps = {
  slug: string;
  pageNum: number;
};

export const SearchList = ({ slug, pageNum }: SearchListProps) => {
  const { data } = useGetQueryMovieBySearch(slug, pageNum);

  return (
    <div className="flex flex-col gap-[30px]">
      <ul className="flex flex-wrap gap-[15px]">
        {data.docs.map((item) => (
          <li className="w-[200px]" key={item.id}>
            <Link
              className="relative flex flex-col gap-1.5"
              href={`${ROUTER_PATH.MOVIE}/${item.id}`}
            >
              <Image
                className="h-[300px] rounded-xl"
                src={
                  normalizeUrl(item.poster?.url) ||
                  'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg'
                }
                alt={item.name}
                width={200}
                height={300}
              />
              {item.rating && <Rating data={item.rating} />}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <Pagination totalPages={data.total} currentPage={data.page} />
    </div>
  );
};
