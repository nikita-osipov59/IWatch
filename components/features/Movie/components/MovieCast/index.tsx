import Image from 'next/image';
import Link from 'next/link';

import { BorderPanel } from '@/components/common';
import { useMoviemByIdStore } from '@/components/features/Movie/store';
import { ROUTER_PATH } from '@/constants';

export const MovieCast = () => {
  const { data } = useMoviemByIdStore();

  if (!data) {
    return (
      <BorderPanel>
        <div>Увы, мы ничего не нашли, попробуйте перезагрузить страницу.</div>
      </BorderPanel>
    );
  }

  return (
    <BorderPanel title="Cast">
      <div className="overflow-auto">
        <ul className="flex gap-[15px] pb-[15px]">
          {data?.persons.map((item) => {
            return (
              <Link
                className="flex flex-col gap-[5px]"
                key={item.id}
                href={ROUTER_PATH.PERSON + `/${item.id}`}
              >
                <Image
                  className="h-[200px] min-w-[130px] rounded-xl"
                  width={130}
                  height={200}
                  src={item?.photo}
                  alt={item?.name}
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
