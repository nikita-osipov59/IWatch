'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';

import { useGetQueryMovieById } from './mutations';
import { BorderPanel } from '@/components/common';
import { normalizeUrl } from '@/utils/helpers';
import { MovieCast, MovieInfoPanel, MovieSimilars, MovieTrailer } from './components';

type Params = {
  id: string;
};

export const Movie = () => {
  const params = useParams<Params>();

  const { data } = useGetQueryMovieById(params.id);

  return (
    <div className="flex flex-col gap-[15px]">
      <BorderPanel>
        <Image
          className="rounded-xl"
          width={1068}
          height={600}
          src={
            normalizeUrl(data.backdrop?.url) ||
            'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg'
          }
          alt={data.name}
          loading="eager"
        />
        <p className="mt-[13px] text-center text-[20px]">{data.name}</p>
      </BorderPanel>
      <div className="flex gap-[15px]">
        <div className="flex max-w-[829px] flex-col gap-[15px]">
          {data.description && <BorderPanel title="Description">{data.description}</BorderPanel>}
          <MovieCast />
          {data.videos !== undefined && <MovieTrailer />}

          <MovieSimilars />
        </div>
        <MovieInfoPanel />
      </div>
    </div>
  );
};
