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
    limit: string,
    cursor?: string | null,
    genres: string[] = [],
    types?: string | null,
  ): Promise<IMovieListResponse> => {
    const query = new URLSearchParams({
      limit: limit,
    });

    if (cursor) {
      query.append('next', cursor);
    }

    if (genres.length > 0) {
      query.append('genres.name', genres.join(','));
    }

    if (types) {
      query.append('type', types);
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
