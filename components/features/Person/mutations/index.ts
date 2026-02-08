import { useQuery } from '@tanstack/react-query';

import { useGetPersonByIdStore } from '@/components/features/Person/store';
import { PERSON_QUERY_KEY } from '@/components/features/Person/constants';

export const useGetQueryPersonById = (id: string) => {
  const { getPersonById } = useGetPersonByIdStore();

  return useQuery({
    queryKey: [...PERSON_QUERY_KEY, id],
    queryFn: () => getPersonById(id),
    refetchOnWindowFocus: false,
  });
};
