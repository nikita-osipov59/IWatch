import { useInfiniteQuery } from '@tanstack/react-query';

import { MovieService } from '@/app/service';
import { IMovieListResponse } from '@/types';
import { MOVIE_LIST_QUERY_KEY } from '@/components/features/InfiniteMovieList/constants';

export const useInfiniteMovieListQuery = () => {
  return useInfiniteQuery<IMovieListResponse>({
    queryKey: [MOVIE_LIST_QUERY_KEY, 'infinite'],
    queryFn: async ({ pageParam = null }) => {
      return MovieService().getMovieList(20, pageParam as string | null);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.next,
  });
};
