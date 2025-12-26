import { create } from 'zustand';

import { apiBase } from '@/api/config';

interface Country {
  name: string;
}

interface Genre {
  name: string;
}

interface Person {
  id: string;
  name: string;
  photo: string;
  description: string;
  profession: string;
}

interface SimilarMovie {
  id: string;
  name: string;
  poster: { url: string };
  length: number;
}

interface TrailersUrls {
  url: string;
}

interface Trailers {
  trailers: TrailersUrls[];
}

export interface IMovie {
  id: number;
  name: string;
  logo: { url: string };
  backdrop: { url: string };
  url: string;
  rating: { imdb: number };
  year: number;
  poster: { url: string };
  countries: Country[];
  description: string;
  genres: Genre[];
  persons: Person[];
  similarMovies?: SimilarMovie[];
  videos: Trailers;
}

export interface Data {
  data: IMovie;
}

interface State {
  getMovieById: (id: string) => Promise<IMovie>;
  data: IMovie | null;
}

export const useMoviemByIdStore = create<State>((set) => ({
  data: null,
  getMovieById: async (id) => {
    try {
      const response = await apiBase.get(`movie/${id}`);

      set(() => ({ data: response.data }));
      return response.data;
    } catch (error) {
      console.error('Error fetching movie by id:', error);
    }
  },
}));
