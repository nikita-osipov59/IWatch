import { create } from 'zustand';

import { MOVIE_LIST_QUERY_KEY } from '@/components/features/InfiniteMovieList/constants';

interface FiltersState {
  selectedGenres: string[];
  selectedType: string | null;
  queryKey: string[];

  selectGenre: (genre: string) => void;
  selectType: (type: string | null) => void;
  resetFilters: () => void;
}

export const useInfiniteMovieListFilterStore = create<FiltersState>((set) => ({
  selectedGenres: [],
  selectedType: null,
  queryKey: [MOVIE_LIST_QUERY_KEY],

  selectGenre: (genreName) =>
    set((state) => ({
      selectedGenres: state.selectedGenres.includes(genreName)
        ? state.selectedGenres.filter((g) => g !== genreName)
        : [...state.selectedGenres, genreName],
    })),
  selectType: (typeName) => set({ selectedType: typeName }),
  resetFilters: () => {
    set({ selectedGenres: [], selectedType: null });
  },
}));
