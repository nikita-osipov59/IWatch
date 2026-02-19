import { Metadata } from 'next';
import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { apiBase } from '@/api/config';
import { Loading } from '@/components/common';
import { Person } from '@/components/features';
import { IPerson } from '@/types/person';
import { queryClient } from '@/api';
import { PersonService } from '@/app/service';
import { PERSON_QUERY_KEY } from '@/components/features/Person/constants';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const { data: person } = await apiBase.get<IPerson>(`person/${id}`);

    return {
      title: person.name,
    };
  } catch (error) {
    console.error('Metadata error:', error);
    return {
      title: 'Person not found',
    };
  }
}
export default async function PersonPage({ params }: Props) {
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: [PERSON_QUERY_KEY, id],
    queryFn: () => PersonService().getPersonById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading position="center" />}>
        <main className="flex flex-col gap-[15px]">
          <Person />
        </main>
      </Suspense>
    </HydrationBoundary>
  );
}
