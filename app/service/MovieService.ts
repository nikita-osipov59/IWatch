import { apiBase, apiBaseNewVersion, apiBaseOld } from '@/api/config';
import { RandomMovie, TopMovies } from '@/types';
import { Genre } from '@/types/genres';
import { IMovie, TMovieSearch } from '@/types/movie';

export const MovieService = () => {
  const getMovieSearch = (slug: string) =>
    apiBase.get<TMovieSearch>(`movie/search?page=1&limit=20&query=${slug}`).then((res) => res.data);

  const getMovie = (id: string) => apiBase.get<IMovie>(`movie/${id}`).then((res) => res.data);

  const getTopMovies = () =>
    apiBaseNewVersion.get<TopMovies>('list/top250?limit=10').then((res) => res.data);

  const getRandomMovie = () =>
    apiBase
      .get<RandomMovie>(
        'movie/random?notNullFields=votes.imdb&notNullFields=ageRating&notNullFields=countries.name&notNullFields=backdrop.url',
      )
      .then((res) => res.data);

  const getGenres = () =>
    apiBaseOld
      .get<Genre[]>('movie/possible-values-by-field?field=genres.name')
      .then((res) => res.data);

  return { getMovieSearch, getMovie, getTopMovies, getRandomMovie, getGenres };
};
