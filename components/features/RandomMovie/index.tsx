'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, RefreshCcw } from 'lucide-react';

import { BorderPanel, Loading } from '@/components/common';
import { useGetMutationRandomMovie, useGetQueryRandomMovie } from './mutations';
import { ROUTER_PATH } from '@/constants';
import { RandomMovieCountries } from './components';

export const RandomMovie = () => {
  const { data, isError } = useGetQueryRandomMovie();
  const { mutate, isPending } = useGetMutationRandomMovie();

  if (!data) {
    return <Loading position="center" />;
  }

  if (isError) {
    return <div>Увы, мы ничего не нашли</div>;
  }

  return (
    <BorderPanel title="Random Movie">
      <div className="relative flex h-[500px] w-full items-center justify-start rounded-xl border border-border">
        <div className="z-2 ml-10 flex max-w-[400px] flex-col gap-[15px]">
          <Image src={data.logo.url} width={200} height={100} alt={data.name} />
          <p>{data.name}</p>
          <div className="flex flex-wrap items-center gap-[5px]">
            <Image
              className="h-[25px] w-[50px]"
              src="/imdb.png"
              width={50}
              height={25}
              alt="imdb"
            />
            {data.rating.imdb}⭐<p>{data.year}</p>
            <RandomMovieCountries />
          </div>

          <div className="flex gap-2.5">
            <Link
              className="rounded-xl bg-primary p-[15px] duration-300 hover:brightness-80"
              href={ROUTER_PATH.MOVIE + `/${data.id}`}
            >
              <Play />
            </Link>
            <button
              className="cursor-pointer rounded-xl bg-primary p-[15px] duration-300 hover:brightness-80"
              onClick={() => mutate()}
            >
              {isPending ? <Loading className="h-6" color="white" size={30} /> : <RefreshCcw />}
            </button>
          </div>
        </div>
        <div
          className="absolute top-0 right-0 z-1 h-full w-full rounded-xl bg-cover bg-no-repeat shadow-[inset_500px_0_300px_#000]"
          style={{ backgroundImage: `url(${data.backdrop.url})` }}
        />
      </div>
    </BorderPanel>
  );
};
