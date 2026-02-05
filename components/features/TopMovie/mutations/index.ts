import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { useTopMoviesStore } from '@/components/features/TopMovie/store';
import { queryClient } from '@/api';
import {
  MOVIE_TOP250_MUTATION_KEY,
  MOVIE_TOP250_QUERY_KEY,
} from '@/components/features/TopMovie/constants/keys';

export const useGetQueryTopMovie = () => {
  const { getTopMovie } = useTopMoviesStore();

  return useSuspenseQuery({
    queryKey: MOVIE_TOP250_QUERY_KEY,
    queryFn: () => getTopMovie(),
    refetchOnWindowFocus: false,
  });
};

export const useGetMutationTopMovie = () => {
  const { getTopMovie } = useTopMoviesStore();

  return useMutation({
    mutationKey: MOVIE_TOP250_MUTATION_KEY,
    mutationFn: () => getTopMovie(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MOVIE_TOP250_QUERY_KEY,
      });
    },
  });
};
