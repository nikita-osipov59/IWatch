'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useInView } from 'react-intersection-observer';

import { ROUTER_PATH } from '@/constants';
import { Loading } from '@/components/common';
import { useInfiniteMovieListQuery } from '@/components/features/InfiniteMovieList/mutations';

export const InfiniteMovieList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMovieListQuery();
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-[30px]">
      <ul className="flex flex-wrap gap-[15px]">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.docs.map((movie) => (
              <li className="w-[200px]" key={movie.id}>
                <Link className="flex flex-col gap-1.5" href={`${ROUTER_PATH.MOVIE}/${movie.id}`}>
                  <Image
                    className="h-[300px] rounded-xl"
                    src={
                      movie.poster?.url ||
                      'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg'
                    }
                    alt={movie.name}
                    width={200}
                    height={300}
                  />
                  {movie.name}
                </Link>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      {hasNextPage && (
        <div ref={ref} className="flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};
