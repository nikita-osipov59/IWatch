'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';

import { useGetQueryMovieById } from './mutations';
import { BorderPanel, Loading } from '@/components/common';
import { MovieCast, MovieInfoPanel, MovieSimilars, MovieTrailer } from './components';

type Params = {
  id: string;
};

export const Movie = () => {
  const params = useParams<Params>();

  const { data, isPending, isError } = useGetQueryMovieById(params.id);

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
    <div className="flex flex-col gap-[15px]">
      <BorderPanel>
        <Image
          className="rounded-xl"
          width={1068}
          height={600}
          src={data.backdrop.url}
          alt={data.name}
          loading="lazy"
        />
        <p className="mt-[13px] text-center text-[20px]">{data.name}</p>
      </BorderPanel>
      <div className="flex gap-[15px]">
        <div className="flex max-w-[829px] flex-col gap-[15px]">
          <BorderPanel title="Description">{data.description}</BorderPanel>
          <MovieCast />
          <MovieTrailer />
          <MovieSimilars />
        </div>
        <MovieInfoPanel />
      </div>
    </div>
  );
};
