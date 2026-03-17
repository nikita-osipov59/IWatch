'use client';

import { ChevronDown } from 'lucide-react';

import { useInfiniteMovieListFilterStore } from '@/components/features/InfiniteMovieList/components/InfiniteMovieListFilter/store';
import { useInfiniteMovieListGenreStore } from './store';

export const InfiniteMovieListGenre = () => {
  const { isGenreOpen, setIsGenreOpen } = useInfiniteMovieListGenreStore();
  const { selectedGenres } = useInfiniteMovieListFilterStore();

  return (
    <div
      className="flex w-fit cursor-pointer items-center gap-1.5 rounded-xl border border-border p-2.5 duration-300 hover:border-primary"
      onClick={() => setIsGenreOpen(!isGenreOpen)}
    >
      Жанр {selectedGenres.length > 0 && `(${selectedGenres.length})`} <ChevronDown />
    </div>
  );
};
