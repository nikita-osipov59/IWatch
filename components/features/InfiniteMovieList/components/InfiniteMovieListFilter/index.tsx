'use client';

import { useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import { useInfiniteMovieListTypeStore } from './components/InfiniteMovieListTypeFilter/components/InfiniteMovieListType/store';
import { useInfiniteMovieListGenreStore } from './components/InfiniteMovieListGenreFilter/components/InfiniteMovieListGenre/store';
import { InfiniteMovieListType } from './components/InfiniteMovieListTypeFilter/components';
import { InfiniteMovieListGenre } from './components/InfiniteMovieListGenreFilter/components';
import { InfiniteMovieListGenreFilter, InfiniteMovieListTypeFilter } from './components';
import { useInfiniteMovieListFilterStore } from './store';

export const InfiniteMovieListFilter = () => {
  const { isTypeOpen, setIsTypeOpen } = useInfiniteMovieListTypeStore();
  const { isGenreOpen, setIsGenreOpen } = useInfiniteMovieListGenreStore();
  const { selectedGenres, selectedType, resetFilters } = useInfiniteMovieListFilterStore();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false);
        setIsGenreOpen(false);
      }
    },
    [setIsTypeOpen, setIsGenreOpen, menuRef],
  );

  const hasActiveFilters = selectedGenres.length > 0 || selectedType !== null;

  const handleReset = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-[15px]">
        <InfiniteMovieListType />
        <InfiniteMovieListGenre />
        {hasActiveFilters && (
          <button
            className="flex w-fit cursor-pointer items-center gap-1.5 rounded-xl border border-border p-2.5 duration-300 hover:border-primary"
            onClick={handleReset}
          >
            Сбросить <X />
          </button>
        )}
      </div>

      {isTypeOpen && <InfiniteMovieListTypeFilter />}
      {isGenreOpen && <InfiniteMovieListGenreFilter />}
    </div>
  );
};
