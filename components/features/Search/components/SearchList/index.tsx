import Link from 'next/link';
import Image from 'next/image';

import { TMovieSearch } from '@/types/movie';
import { ROUTER_PATH } from '@/constants';

interface ListProps {
  data: TMovieSearch;
}

export const SearchList = ({ data }: ListProps) => {
  return (
    <>
      {data.docs && (
        <ul className="flex flex-wrap gap-[15px]">
          {data.docs.map((item) => (
            <li className="w-[200px]" key={item.id}>
              <Link className="flex flex-col gap-1.5" href={ROUTER_PATH.MOVIE + `/${item.id}`}>
                <Image
                  className="h-[300px] rounded-xl"
                  src={
                    item.poster?.url ||
                    'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg'
                  }
                  alt={item.name}
                  width={200}
                  height={300}
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
