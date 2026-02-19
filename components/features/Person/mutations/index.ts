import { useSuspenseQuery } from '@tanstack/react-query';

import { PERSON_QUERY_KEY } from '@/components/features/Person/constants';
import { PersonService } from '@/app/service';

export const useGetQueryPersonById = (id: string) => {
  return useSuspenseQuery({
    queryKey: [PERSON_QUERY_KEY, id],
    queryFn: () => PersonService().getPersonById(id),
    refetchOnWindowFocus: false,
  });
};
