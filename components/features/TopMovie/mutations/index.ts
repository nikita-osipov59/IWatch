import { useSuspenseQuery } from '@tanstack/react-query';

import { MOVIE_TOP250_QUERY_KEY } from '@/components/features/TopMovie/constants/keys';
import { MovieService } from '@/app/service';

export const useGetQueryTopMovie = () => {
  return useSuspenseQuery({
    queryKey: [MOVIE_TOP250_QUERY_KEY],
    queryFn: () => MovieService().getTopMovies(),
    refetchOnWindowFocus: false,
  });
};
