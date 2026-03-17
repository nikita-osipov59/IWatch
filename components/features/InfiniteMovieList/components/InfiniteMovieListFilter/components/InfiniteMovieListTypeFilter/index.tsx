import { formatTitle } from '@/utils/helpers';
import { useInfiniteMovieListFilterStore } from '@/components/features/InfiniteMovieList/components/InfiniteMovieListFilter/store';
import { listType } from './constants';

export const InfiniteMovieListTypeFilter = () => {
  const { selectType, selectedType } = useInfiniteMovieListFilterStore();

  return (
    <ul className="absolute z-50 mt-[15px] flex w-max flex-col flex-wrap gap-[13px] rounded-xl border border-border bg-background p-[15px] shadow-xl">
      {listType.map((item, index) => (
        <li key={index} className="group flex cursor-pointer items-center">
          <input
            id={`type-${index}`}
            className="peer sr-only"
            type="radio"
            value={item.name}
            checked={selectedType === item.type}
            onChange={() => selectType(item.type)}
          />
          <label
            htmlFor={`type-${index}`}
            className="relative w-full cursor-pointer rounded py-1 pl-8"
          >
            {formatTitle(item.name)}
          </label>
        </li>
      ))}
    </ul>
  );
};
