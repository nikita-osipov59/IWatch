'use client';

import { RandomMovie, TopMovie, Genres } from '@/components/features';

export const HomeClient = () => {
  return (
    <main className="flex flex-col gap-[15px]">
      <RandomMovie />
      <TopMovie />
      <Genres />
    </main>
  );
};
