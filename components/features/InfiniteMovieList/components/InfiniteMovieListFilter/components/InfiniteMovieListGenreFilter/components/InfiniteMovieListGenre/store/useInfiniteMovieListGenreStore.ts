import { create } from 'zustand';

interface FiltersState {
  isGenreOpen: boolean;

  setIsGenreOpen: (value: boolean) => void;
}

export const useInfiniteMovieListGenreStore = create<FiltersState>((set) => ({
  isGenreOpen: false,

  setIsGenreOpen: (value) => set({ isGenreOpen: value }),
}));
