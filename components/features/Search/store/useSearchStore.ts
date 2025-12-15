import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface Movie {
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
}

export interface DataDocs {
  docs: Movie[];
}

export interface State {
  getMovieBySearch: (value: string) => Promise<DataDocs>;
  setInputValue: (value: string) => void;
  inputValue: string;
  data: DataDocs | null;
}

export const useSearchStore = create<State>()(
  persist(
    (set, get) => ({
      data: null,
      inputValue: '',
      getMovieBySearch: async (value) => {
        const inputValue = value || get().inputValue;

        try {
          const response = await apiBase.get(
            `movie/search?page=1&limit=20&query=${value || inputValue}`,
          );
          set(() => ({ data: response.data }));
          return response.data;
        } catch (error) {
          console.error('Error fetching movie search:', error);
        }
      },
      setInputValue: (value) => set(() => ({ inputValue: value })),
    }),
    { name: 'Search' },
  ),
);
