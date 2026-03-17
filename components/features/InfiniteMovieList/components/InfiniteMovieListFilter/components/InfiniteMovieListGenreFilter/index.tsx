import { formatTitle } from '@/utils/helpers';
import { useInfiniteMovieListFilterStore } from '@/components/features/InfiniteMovieList/components/InfiniteMovieListFilter/store';
import { useGetQueryGenres } from '@/components/features/Genres/mutations';

export const InfiniteMovieListGenreFilter = () => {
  const { selectedGenres, selectGenre } = useInfiniteMovieListFilterStore();
  const { data } = useGetQueryGenres();

  return (
    <ul className="absolute z-50 mt-[15px] flex h-[379px] w-max flex-col flex-wrap gap-[13px] rounded-xl border border-border bg-background p-[15px] shadow-xl">
      {data.map((item) => (
        <li key={item.name} className="group flex cursor-pointer items-center">
          <input
            id={`genre-${item.name}`}
            className="peer"
            type="checkbox"
            value={item.name}
            checked={selectedGenres.includes(item.name)}
            onChange={() => selectGenre(item.name)}
          />
          <label
            htmlFor={`genre-${item.name}`}
            className="relative w-full cursor-pointer rounded py-1 pl-8"
          >
            {formatTitle(item.name)}
          </label>
        </li>
      ))}
    </ul>
  );
};
