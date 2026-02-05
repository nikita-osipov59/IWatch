import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { apiBaseNewVersion } from '@/api/config';

export interface ImageUrls {
  url: string;
  previewUrl?: string; // Может отсутствовать
}

export interface MovieRating {
  kp?: number;
  imdb?: number;
  rating?: number; // Общий рейтинг
}

export interface MovieData {
  id: number;
  name: string;
  enName?: string;
  alternativeName?: string;
  year: number;
  movieLength?: number;
  poster: ImageUrls;
  rating?: MovieRating;
  genres?: string[];
  countries?: string[];
}

export interface MovieDoc {
  position: number;
  positionDiff?: number;
  rating: number;
  votes: number;
  movie: MovieData;
}

export interface MoviesResponse {
  docs: MovieDoc[];
  total?: number;
  limit?: number;
  next?: string;
  hasNext?: boolean;
}

export interface TopMovies {
  category: string;
  name: string;
  slug: string;
  moviesCount: number;
  cover: ImageUrls;
  movies: MoviesResponse;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface State {
  topMovie: TopMovies | null;
  getTopMovie: () => Promise<TopMovies>;
}

export const useTopMoviesStore = create<State>()(
  persist(
    (set) => ({
      topMovie: null,
      getTopMovie: async () => {
        try {
          const response = await apiBaseNewVersion.get('list/top250?limit=10');

          set(() => ({ topMovie: response.data }));
          return response.data;
        } catch (error) {
          console.error('Error fetching top 250 Movies:', error);
        }
      },
    }),
    { name: 'top250Movies' },
  ),
);
