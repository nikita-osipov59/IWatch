import { Metadata } from 'next';
import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { queryClient } from '@/api';
import { MovieService } from '@/app/service';
import { InfiniteMovieListFilter } from '@/components/features/InfiniteMovieList/components';
import { InfiniteMovieList } from '@/components/features';
import { MOVIE_LIST_QUERY_KEY } from '@/components/features/InfiniteMovieList/constants';
import { BorderPanel, Loading } from '@/components/common';
import { IMovieListResponse } from '@/types';
import { GENRES_QUERY_KEY } from '@/components/features/Genres/constants/keys';

export const metadata: Metadata = {
  title: 'Архив',
};

export default async function ArchivePage() {
  await queryClient.prefetchInfiniteQuery({
    queryKey: [MOVIE_LIST_QUERY_KEY, 'infinite'],
    queryFn: async ({ pageParam = null }) => {
      return MovieService().getMovieList('20', pageParam as string | null);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: IMovieListResponse) => lastPage.next,
  });

  await queryClient.prefetchQuery({
    queryKey: [GENRES_QUERY_KEY],
    queryFn: () => MovieService().getGenres(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading position="center" />}>
        <main className="flex flex-col gap-[15px]">
          <BorderPanel className="w-fit">
            <InfiniteMovieListFilter />
          </BorderPanel>
          <BorderPanel>
            <InfiniteMovieList />
          </BorderPanel>
        </main>
      </Suspense>
    </HydrationBoundary>
  );
}
