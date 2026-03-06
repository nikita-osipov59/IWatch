import { apiBase, apiBaseNewVersion, apiBaseOld } from '@/api/config';
import {
  IMovieByIdResponse,
  IMovieBySearchResponse,
  IMovieListResponse,
  IRandomMovieResponse,
  ITopMoviesResponse,
  IGenreResponse,
} from '@/types';
import { NotNullFields } from '@/constants';

export const MovieService = () => {
  const getMovieBySearch = async (
    query: string,
    pageNum: number,
  ): Promise<IMovieBySearchResponse> => {
    const { data } = await apiBase.get<IMovieBySearchResponse>(
      `movie/search?page=${pageNum}&limit=20&query=${query}`,
    );
    return data;
  };

  const getMovieById = async (id: string): Promise<IMovieByIdResponse> => {
    const { data } = await apiBase.get<IMovieByIdResponse>(`movie/${id}`);
    return data;
  };

  const getMovieList = async (
    limit?: number,
    cursor?: string | null,
  ): Promise<IMovieListResponse> => {
    const query = new URLSearchParams({
      limit: limit?.toString() || '20',
    });

    if (cursor) {
      query.append('next', cursor);
    }

    const { data } = await apiBaseNewVersion.get<IMovieListResponse>(
      `/movie?${query}&${NotNullFields}`,
    );
    return data;
  };

  const getTopMovies = async (): Promise<ITopMoviesResponse> => {
    const { data } = await apiBaseNewVersion.get<ITopMoviesResponse>('list/top250?limit=10');
    return data;
  };

  const getRandomMovie = async (): Promise<IRandomMovieResponse> => {
    const { data } = await apiBase.get<IRandomMovieResponse>(`movie/random?${NotNullFields}`);
    return data;
  };

  const getGenres = async (): Promise<IGenreResponse[]> => {
    const { data } = await apiBaseOld.get<IGenreResponse[]>(
      'movie/possible-values-by-field?field=genres.name',
    );
    return data;
  };

  return {
    getMovieBySearch,
    getMovieById,
    getMovieList,
    getTopMovies,
    getRandomMovie,
    getGenres,
  };
};
