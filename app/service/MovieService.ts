import { apiBase, apiBaseNewVersion, apiBaseOld } from '@/api/config';
import { NotNullFields } from '@/constants';
import { RandomMovie, TopMovies } from '@/types';
import { Genre } from '@/types/genres';
import { IMovie, TMovieSearch } from '@/types/movie';

export const MovieService = () => {
  const getMovieSearch = async (query: string, pageNum: number): Promise<TMovieSearch> => {
    const { data } = await apiBase.get<TMovieSearch>(
      `movie/search?page=${pageNum}&limit=20&query=${query}`,
    );
    return data;
  };

  const getMovie = async (id: string): Promise<IMovie> => {
    const { data } = await apiBase.get<IMovie>(`movie/${id}`);
    return data;
  };

  const getTopMovies = async (): Promise<TopMovies> => {
    const { data } = await apiBaseNewVersion.get<TopMovies>('list/top250?limit=10');
    return data;
  };

  const getRandomMovie = async (): Promise<RandomMovie> => {
    const { data } = await apiBase.get<RandomMovie>(`movie/random?${NotNullFields}`);
    return data;
  };

  const getGenres = async (): Promise<Genre[]> => {
    const { data } = await apiBaseOld.get<Genre[]>(
      'movie/possible-values-by-field?field=genres.name',
    );
    return data;
  };

  return {
    getMovieSearch,
    getMovie,
    getTopMovies,
    getRandomMovie,
    getGenres,
  };
};
