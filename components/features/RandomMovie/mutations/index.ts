import { useMutation, useQuery } from '@tanstack/react-query';

import { useRandomMovieStore } from '@/components/features/RandomMovie/store';
import {
  MOVIE_RANDOM_MUTATION_KEY,
  MOVIE_RANDOM_QUERY_KEY,
} from '@/components/features/RandomMovie/constants/keys';
import { queryClient } from '@/api';

export const useGetQueryRandomMovie = () => {
  const { getRandomMovie } = useRandomMovieStore();

  return useQuery({
    queryKey: MOVIE_RANDOM_QUERY_KEY,
    queryFn: () => getRandomMovie(),
    refetchOnWindowFocus: false,
  });
};

export const useGetMutationRandomMovie = () => {
  const { getRandomMovie } = useRandomMovieStore();

  return useMutation({
    mutationKey: MOVIE_RANDOM_MUTATION_KEY,
    mutationFn: () => getRandomMovie(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MOVIE_RANDOM_QUERY_KEY,
      });
    },
  });
};
