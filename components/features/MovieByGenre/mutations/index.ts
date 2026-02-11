import { useSuspenseQuery } from '@tanstack/react-query';

import { GENRES_QUERY_KEY } from '@/components/features/Genres/constants/keys';
import { useGetMovieByGenreStore } from '@/components/features/MovieByGenre/store';

export const useGetQueryMovieByGenre = (slug: string, pageNum: number) => {
  const { getMovieByGenreGenres } = useGetMovieByGenreStore();

  return useSuspenseQuery({
    queryKey: [...GENRES_QUERY_KEY, slug, pageNum],
    queryFn: () => getMovieByGenreGenres(slug, pageNum),
    refetchOnWindowFocus: false,
  });
};
