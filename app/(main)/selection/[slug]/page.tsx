import { Metadata } from 'next';
import { Suspense } from 'react';

import { BorderPanel, Loading } from '@/components/common';
import { MovieByGenre } from '@/components/features';
import { formatTitle } from '@/utils/helpers';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = formatTitle(slug);

  return { title: title };
}

export default async function SelectionGenrePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const title = formatTitle(slug);

  const { page = '1' } = await searchParams;
  const pageNum = Math.max(1, parseInt(page));

  return (
    <main>
      <Suspense fallback={<Loading position="center" />}>
        <BorderPanel title={title}>
          <MovieByGenre slug={slug} pageNum={pageNum} />
        </BorderPanel>
      </Suspense>
    </main>
  );
}
