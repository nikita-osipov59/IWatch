import { create } from 'zustand';

import { apiBaseOld } from '@/api/config';

export interface Genre {
  name: string;
  slug: string;
}

interface State {
  genres: Genre | null;
  getGenres: () => Promise<Genre[]>;
}

export const useGetGenresStore = create<State>()((set) => ({
  genres: null,
  getGenres: async () => {
    try {
      const response = await apiBaseOld.get('movie/possible-values-by-field?field=genres.name');

      set(() => ({ genres: response.data }));
      return response.data;
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  },
}));
