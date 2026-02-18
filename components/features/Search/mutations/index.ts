import { useSuspenseQuery } from '@tanstack/react-query';

import { MOVIE_SEARCH_QUERY_KEY } from '@/components/features/Search/constants';
import { MovieService } from '@/app/service';

export const useGetQueryMovieBySearch = (query: string, pageNum: number) => {
  return useSuspenseQuery({
    queryKey: [MOVIE_SEARCH_QUERY_KEY, query, pageNum],
    queryFn: () => MovieService().getMovieSearch(query, pageNum),
    refetchOnWindowFocus: false,
  });
};
