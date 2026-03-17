import { ChevronDown } from 'lucide-react';

import { useInfiniteMovieListTypeStore } from './store';

export const InfiniteMovieListType = () => {
  const { isTypeOpen, setIsTypeOpen } = useInfiniteMovieListTypeStore();
  return (
    <div
      className="flex w-fit cursor-pointer items-center gap-1.5 rounded-xl border border-border p-2.5 duration-300 hover:border-primary"
      onClick={() => setIsTypeOpen(!isTypeOpen)}
    >
      Тип <ChevronDown />
    </div>
  );
};
