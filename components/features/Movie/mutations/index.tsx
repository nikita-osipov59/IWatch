import { useQuery } from '@tanstack/react-query';

import { useMoviemByIdStore } from '@/components/features/Movie/store';
import { MOVIE_QUERY_KEY } from '@/components/features/Movie/constants/keys';

export const useGetQueryMovieById = (id: string) => {
  const { getMovieById } = useMoviemByIdStore();

  return useQuery({
    queryKey: [MOVIE_QUERY_KEY, id],
    queryFn: () => getMovieById(id),
    refetchOnWindowFocus: false,
  });
};
