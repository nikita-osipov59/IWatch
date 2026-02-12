import Image from 'next/image';
import Link from 'next/link';

import { BorderPanel } from '@/components/common';
import { ROUTER_PATH } from '@/constants';
import { IMovie } from '@/types/movie';

type MovieSimilarsProps = {
  data: IMovie;
};

export const MovieSimilars = ({ data }: MovieSimilarsProps) => {
  return (
    <>
      {data.similarMovies && data.similarMovies.length > 0 && (
        <BorderPanel title="Similar movies">
          <div className="overflow-auto">
            <ul className="flex gap-[15px] pb-[15px]">
              {data.similarMovies.map((item) => (
                <li className="duration-300 hover:opacity-50" key={`similar-${item.id}`}>
                  <Link
                    className="flex flex-col gap-[5px]"
                    href={ROUTER_PATH.MOVIE + `/${item.id}`}
                  >
                    <Image
                      className="h-[300px] w-[200px] max-w-[200px] rounded-xl"
                      width={200}
                      height={300}
                      src={item.poster.url}
                      alt={item.name}
                      loading="lazy"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </BorderPanel>
      )}
    </>
  );
};
