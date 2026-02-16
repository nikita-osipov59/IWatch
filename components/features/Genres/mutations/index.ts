import { useSuspenseQuery } from '@tanstack/react-query';

import { GENRES_QUERY_KEY } from '@/components/features/Genres/constants/keys';
import { MovieService } from '@/app/service';

export const useGetQueryGenres = () => {
  return useSuspenseQuery({
    queryKey: [GENRES_QUERY_KEY],
    queryFn: () => MovieService().getGenres(),
    refetchOnWindowFocus: false,
  });
};
