import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useSearchStore } from '@/components/features/Search/store';
import {
  MOVIE_SEARCH_MUTATION_KEY,
  MOVIE_SEARCH_QUERY_KEY,
} from '@/components/features/Search/constants';
import { ROUTER_PATH } from '@/constants';
import { queryClient } from '@/api';

export const useGetQueryMovieBySearch = () => {
  const { getMovieBySearch, inputValue } = useSearchStore();
  return useQuery({
    queryKey: [MOVIE_SEARCH_QUERY_KEY, inputValue],
    queryFn: () => getMovieBySearch(inputValue),
    refetchOnWindowFocus: false,
  });
};

export const useGetMutationMovieBySearch = () => {
  const { getMovieBySearch, inputValue } = useSearchStore();
  const { push } = useRouter();

  return useMutation({
    mutationKey: MOVIE_SEARCH_MUTATION_KEY,
    mutationFn: () => getMovieBySearch(inputValue),
    onSuccess: () => {
      push(`${ROUTER_PATH.SEARCH}/${inputValue}`);
      queryClient.invalidateQueries({
        queryKey: MOVIE_SEARCH_QUERY_KEY,
      });
    },
  });
};
