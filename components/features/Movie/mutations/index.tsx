import { useSuspenseQuery } from '@tanstack/react-query';

import { MOVIE_QUERY_KEY } from '@/components/features/Movie/constants/keys';
import { MovieService } from '@/app/service';

export const useGetQueryMovieById = (id: string) => {
  return useSuspenseQuery({
    queryKey: [MOVIE_QUERY_KEY, id],
    queryFn: () => MovieService().getMovie(id),
    refetchOnWindowFocus: false,
  });
};
