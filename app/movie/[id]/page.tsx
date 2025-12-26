import { Metadata } from 'next';

import { Movie } from '@/components/features';
import { IMovie } from '@/components/features/Movie/store';
import { apiBase } from '@/api/config';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const { data: movie } = await apiBase.get<IMovie>(`movie/${id}`);

    return {
      title: movie.name,
      description: movie.description,
    };
  } catch (error) {
    console.error('Metadata error:', error);
    return {
      title: 'Movie not found',
    };
  }
}

export default function MoviePage() {
  return (
    <main>
      <Movie />
    </main>
  );
}
