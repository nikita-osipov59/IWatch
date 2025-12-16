import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { apiBase } from '@/api/config';

interface Country {
  name: string;
}

export interface RandomMovie {
  id: number;
  name: string;
  logo: { url: string };
  backdrop: { url: string };
  url: string;
  rating: { imdb: number };
  year: number;
  poster: { url: string };
  countries: Country[];
  isLoading: boolean;
  isError: boolean;
}

interface State {
  randomMovie: RandomMovie | null;
  getRandomMovie: () => Promise<RandomMovie>;
}

export const useRandomMovieStore = create<State>()(
  persist(
    (set) => ({
      randomMovie: null,
      getRandomMovie: async () => {
        try {
          const response = await apiBase.get(
            'movie/random?notNullFields=logo.url&notNullFields=votes.imdb&notNullFields=ageRating&notNullFields=countries.name&notNullFields=logo.url&notNullFields=backdrop.url',
          );

          set(() => ({ randomMovie: response.data }));
          return response.data;
        } catch (error) {
          console.error('Error fetching random Movie:', error);
        }
      },
    }),
    { name: 'randomMovie' },
  ),
);
