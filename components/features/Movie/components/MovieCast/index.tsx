import Image from 'next/image';
import Link from 'next/link';

import { BorderPanel } from '@/components/common';
import { ROUTER_PATH } from '@/constants';
import { IMovie } from '@/types/movie';

type MovieCastProps = {
  data: IMovie;
};

export const MovieCast = ({ data }: MovieCastProps) => {
  return (
    <BorderPanel title="Cast">
      <div className="overflow-auto">
        <ul className="flex gap-[15px] pb-[15px]">
          {data.persons.map((item, index) => {
            return (
              <Link
                className="flex flex-col gap-[5px]"
                key={`person-${index}`}
                href={ROUTER_PATH.PERSON + `/${item.id}`}
              >
                <Image
                  className="h-[200px] min-w-[130px] rounded-xl"
                  width={130}
                  height={200}
                  src={
                    item.photo ||
                    'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg'
                  }
                  alt={item.name || 'img'}
                  loading="lazy"
                />
                <p className="text-[13px] text-accent">
                  {item.description ? item.description : item.profession}
                </p>
                <h3>{item.name}</h3>
              </Link>
            );
          })}
        </ul>
      </div>
    </BorderPanel>
  );
};
