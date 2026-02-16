import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { queryClient } from '@/api';
import {
  MOVIE_TOP250_MUTATION_KEY,
  MOVIE_TOP250_QUERY_KEY,
} from '@/components/features/TopMovie/constants/keys';
import { MovieService } from '@/app/service';

export const useGetQueryTopMovie = () => {
  return useSuspenseQuery({
    queryKey: [MOVIE_TOP250_QUERY_KEY],
    queryFn: () => MovieService().getTopMovies(),
    refetchOnWindowFocus: false,
  });
};

export const useGetMutationTopMovie = () => {
  return useMutation({
    mutationKey: [MOVIE_TOP250_MUTATION_KEY],
    mutationFn: () => MovieService().getTopMovies(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MOVIE_TOP250_QUERY_KEY],
      });
    },
  });
};
