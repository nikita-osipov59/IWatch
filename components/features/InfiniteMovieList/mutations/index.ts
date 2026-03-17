import { useInfiniteQuery } from '@tanstack/react-query';

import { MovieService } from '@/app/service';
import { IMovieListResponse } from '@/types';
import { MOVIE_LIST_QUERY_KEY } from '@/components/features/InfiniteMovieList/constants';

export const useInfiniteMovieListQuery = (
  selectedGenres: string[],
  selectedTypes: string | null,
) => {
  return useInfiniteQuery<IMovieListResponse>({
    queryKey: [MOVIE_LIST_QUERY_KEY, 'infinite', selectedGenres, selectedTypes],
    queryFn: async ({ pageParam = null }) => {
      return MovieService().getMovieList(
        '20',
        pageParam as string | null,
        selectedGenres,
        selectedTypes,
      );
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.next,
  });
};
