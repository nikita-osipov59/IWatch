import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import {
  MOVIE_RANDOM_MUTATION_KEY,
  MOVIE_RANDOM_QUERY_KEY,
} from '@/components/features/RandomMovie/constants/keys';
import { queryClient } from '@/api';
import { MovieService } from '@/app/service';

export const useGetQueryRandomMovie = () => {
  return useSuspenseQuery({
    queryKey: [MOVIE_RANDOM_QUERY_KEY],
    queryFn: () => MovieService().getRandomMovie(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useGetMutationRandomMovie = () => {
  return useMutation({
    mutationKey: [MOVIE_RANDOM_MUTATION_KEY],
    mutationFn: () => MovieService().getRandomMovie(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MOVIE_RANDOM_QUERY_KEY],
      });
    },
  });
};
