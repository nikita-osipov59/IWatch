import { useSuspenseQuery } from '@tanstack/react-query';

import { MovieService } from '@/app/service';
import { GENRES_QUERY_KEY } from '@/components/features/Genres/constants/keys';

export const useGetQueryMovieByGenre = (slug: string, pageNum: number) => {
  return useSuspenseQuery({
    queryKey: [GENRES_QUERY_KEY, slug, pageNum],
    queryFn: () => MovieService().getMovieByGenre(slug, pageNum),
    refetchOnWindowFocus: false,
  });
};
