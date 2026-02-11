import { useSuspenseQuery } from '@tanstack/react-query';

import { useGetGenresStore } from '@/components/features/Genres/store';
import { GENRES_QUERY_KEY } from '@/components/features/Genres/constants/keys';

export const useGetQueryGenres = () => {
  const { getGenres } = useGetGenresStore();

  return useSuspenseQuery({
    queryKey: GENRES_QUERY_KEY,
    queryFn: () => getGenres(),
    refetchOnWindowFocus: false,
  });
};
