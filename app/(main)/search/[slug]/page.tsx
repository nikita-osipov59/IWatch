import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import { formatTitle } from '@/utils/helpers';
import { MovieService } from '@/app/service';
import { MOVIE_SEARCH_QUERY_KEY } from '@/components/features/Search/constants';
import { BorderPanel, Loading } from '@/components/common';
import { SearchList } from '@/components/features/Search/components';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: formatTitle(slug) };
}

export default async function SearchPage({ params }: Props) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MOVIE_SEARCH_QUERY_KEY, slug],
    queryFn: () => MovieService().getMovie(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading position="center" />}>
        <BorderPanel title={formatTitle(slug)}>
          <SearchList />
        </BorderPanel>
      </Suspense>
    </HydrationBoundary>
  );
}
