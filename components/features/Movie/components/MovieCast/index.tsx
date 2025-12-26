import Image from 'next/image';

import { BorderPanel } from '@/components/common';
import { useMoviemByIdStore } from '@/components/features/Movie/store';

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
          {data?.persons.map((item, index) => {
            return (
              <li className="flex flex-col gap-[5px]" key={index}>
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
              </li>
            );
          })}
        </ul>
      </div>
    </BorderPanel>
  );
};
