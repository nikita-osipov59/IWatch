import { Metadata } from 'next';
import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Movie } from '@/components/features';
import { MovieService } from '@/app/service';
import { MOVIE_QUERY_KEY } from '@/components/features/Movie/constants';
import { Loading } from '@/components/common';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const { name, description } = await MovieService().getMovie(id);

    return {
      title: name,
      description: description,
    };
  } catch (error) {
    console.error('Metadata error:', error);
    return {
      title: 'Movie not found',
    };
  }
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MOVIE_QUERY_KEY, id],
    queryFn: () => MovieService().getMovie(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading position="center" />}>
        <main>
          <Movie />
        </main>
      </Suspense>
    </HydrationBoundary>
  );
}
