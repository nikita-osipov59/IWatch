'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';

import { useGetQueryPersonById } from './mutations';
import { BorderPanel, Loading } from '@/components/common';
import { PersonMovie } from './components';

type Params = {
  id: string;
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const Person = () => {
  const params = useParams<Params>();
  const { data, isPending, isError } = useGetQueryPersonById(params.id);

  if (isPending) {
    return <Loading position="center" />;
  }

  if (!data || isError) {
    return (
      <BorderPanel>
        <div>Увы, мы ничего не нашли, попробуйте перезагрузить страницу.</div>
      </BorderPanel>
    );
  }

  return (
    <>
      <BorderPanel>
        <div className="flex gap-[15px]">
          <Image
            className="rounded-xl"
            src={
              data.photo ||
              'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg'
            }
            alt={data.name}
            width={300}
            height={400}
          />
          <div className="flex flex-col gap-[15px]">
            <div className="flex items-center gap-[5px]">
              {data.name && <div className="text-[30px]">{data.name}</div>}
              {data.enName && <div className="text-accent">{data.enName}</div>}
            </div>
            {data.profession.length > 0 && (
              <div className="flex flex-wrap">
                <p className="mr-[5px] text-accent">Карьера:</p>
                {data.profession.slice(0, 7).map((item, index) => (
                  <div className="text-main" key={index}>
                    {(index ? ', ' : '') + item.value}
                  </div>
                ))}
              </div>
            )}
            {data.birthday && (
              <div className="flex gap-[5px] text-accent">
                Дата рождения: <p className="text-main">{formatDate(data.birthday)}</p>
              </div>
            )}

            {data.death && (
              <div className="flex gap-[5px] text-accent">
                Дата смерти: <p className="text-main">{formatDate(data.death)}</p>
              </div>
            )}
            {data.birthPlace.length > 0 && (
              <div className="flex">
                <p className="mr-[5px] text-accent">Место рождения:</p>
                {data.birthPlace.slice(0, 4).map((item, index) => {
                  return (
                    <div className="text-main" key={index}>
                      {(index ? ', ' : '') + item.value}
                    </div>
                  );
                })}
              </div>
            )}
            {data.age && (
              <div className="flex gap-[5px] text-accent">
                Возраст: <p className="text-main">{data.age} лет</p>
              </div>
            )}
            {data.growth && (
              <div className="flex gap-[5px] text-accent">
                Рост: <p className="text-main">{data.growth} см</p>
              </div>
            )}
            {data.movies.length > 0 && (
              <div className="flex gap-[5px] text-accent">
                Участие в фильмах: <p className="text-main">{data.movies.length}</p>
              </div>
            )}
          </div>
        </div>
      </BorderPanel>
      <PersonMovie />
    </>
  );
};
