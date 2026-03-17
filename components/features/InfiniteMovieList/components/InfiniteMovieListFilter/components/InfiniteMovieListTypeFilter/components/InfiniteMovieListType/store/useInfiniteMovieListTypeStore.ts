import { create } from 'zustand';

interface FiltersState {
  isTypeOpen: boolean;

  setIsTypeOpen: (value: boolean) => void;
}

export const useInfiniteMovieListTypeStore = create<FiltersState>((set) => ({
  isTypeOpen: false,

  setIsTypeOpen: (value) => set({ isTypeOpen: value }),
}));
