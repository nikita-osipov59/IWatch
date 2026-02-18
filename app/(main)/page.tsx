import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { MOVIE_RANDOM_QUERY_KEY } from '@/components/features/RandomMovie/constants/keys';
import { MOVIE_TOP250_QUERY_KEY } from '@/components/features/TopMovie/constants/keys';
import { GENRES_QUERY_KEY } from '@/components/features/Genres/constants/keys';
import { MovieService } from '@/app/service';
import { Loading } from '@/components/common';
import { HomeClient } from './HomeClient';
import { queryClient } from '@/api';

export default async function HomePage() {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [MOVIE_RANDOM_QUERY_KEY],
      queryFn: MovieService().getRandomMovie,
      staleTime: Infinity,
    }),
    queryClient.prefetchQuery({
      queryKey: [MOVIE_TOP250_QUERY_KEY],
      queryFn: MovieService().getTopMovies,
    }),
    queryClient.prefetchQuery({
      queryKey: [GENRES_QUERY_KEY],
      queryFn: MovieService().getGenres,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading position="center" />}>
        <HomeClient />
      </Suspense>
    </HydrationBoundary>
  );
}
