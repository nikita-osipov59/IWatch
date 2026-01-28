import { Loading } from '@/components/common';
import { RandomMovie } from '@/components/features';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="flex flex-col gap-[15px]">
      <Suspense fallback={<Loading position="center" />}>
        <RandomMovie />
      </Suspense>
    </main>
  );
}
