import { apiBase } from '@/api/config';
import { IMovie, TMovieSearch } from '@/types/movie';

export const MovieService = () => {
  const getMovieSearch = (slug: string) =>
    apiBase.get<TMovieSearch>(`movie/search?page=1&limit=20&query=${slug}`).then((res) => res.data);

  const getMovie = (id: string) => apiBase.get<IMovie>(`movie/${id}`).then((res) => res.data);

  return { getMovieSearch, getMovie };
};
