import { create } from 'zustand';

import { apiBase } from '@/api/config';

export interface Genre {
  name: string;
}

export interface Country {
  name: string;
}

export interface Name {
  name: string;
  language: string | null;
  type: string;
}

export interface Rating {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

export interface Votes {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

export interface Poster {
  url: string;
  previewUrl: string;
}

export interface Backdrop {
  url: string;
  previewUrl: string;
}

export interface ReleaseYears {
  start: number;
  end: number;
}

export interface Movie {
  id: number;
  name: string;
  alternativeName: string;
  type: 'movie' | 'tv-series';
  typeNumber: 1 | 2;
  year: number | null;
  description: string | null;
  shortDescription: string | null;
  status: string | null;
  rating: Rating;
  votes: Votes;
  movieLength: number | null;
  totalSeriesLength: number | null;
  seriesLength: number | null;
  ratingMpaa: string | null;
  ageRating: number | null;
  genres: Genre[];
  countries: Country[];
  isSeries: boolean;
  ticketsOnSale: boolean;
  poster?: Poster;
  backdrop?: Backdrop;
  names?: Name[];
  releaseYears?: ReleaseYears[];
}

export interface MovieByGenre {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

interface State {
  movieByGenre: MovieByGenre | null;
  getMovieByGenreGenres: (slug: string, pageNum: number) => Promise<MovieByGenre>;
}

export const useGetMovieByGenreStore = create<State>()((set) => ({
  movieByGenre: null,
  getMovieByGenreGenres: async (slug, pageNum) => {
    try {
      const response = await apiBase.get(
        `movie?page=${pageNum}&limit=15&notNullFields=name&genres.name=${slug}`,
      );

      set(() => ({ movieByGenre: response.data }));
      return response.data;
    } catch (error) {
      console.error('Error fetching movie by genre:', error);
    }
  },
}));
