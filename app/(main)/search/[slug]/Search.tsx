'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';

import { Loading } from '@/components/common';
import { SearchList } from '@/components/features/Search/components';
import { useGetQueryMovieBySearch } from '@/components/features/Search/mutations';

export const SearchClient = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { data } = useGetQueryMovieBySearch(slug);

  return (
    <Suspense fallback={<Loading position="center" />}>
      <SearchList data={data} />
    </Suspense>
  );
};
