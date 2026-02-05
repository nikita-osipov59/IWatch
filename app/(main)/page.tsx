'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { Loading } from '@/components/common';

// * Возможно, нужно сделать по-другому

const RandomMovie = dynamic(
  () => import('@/components/features/RandomMovie').then((mod) => ({ default: mod.RandomMovie })),
  {
    ssr: false,
    loading: () => null,
  },
);

const TopMovie = dynamic(
  () => import('@/components/features/TopMovie').then((mod) => ({ default: mod.TopMovie })),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function Home() {
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  useEffect(() => {
    const preloadComponents = async () => {
      try {
        await Promise.all([
          import('@/components/features/RandomMovie'),
          import('@/components/features/TopMovie'),
        ]);
        setComponentsLoaded(true);
      } catch (error) {
        console.error('Failed to load components:', error);
        setComponentsLoaded(true);
      }
    };

    preloadComponents();
  }, []);

  if (!componentsLoaded) {
    return <Loading position="center" />;
  }

  return (
    <Suspense fallback={<Loading position="center" />}>
      <main className="flex flex-col gap-[15px]">
        <RandomMovie />
        <TopMovie />
      </main>
    </Suspense>
  );
}
