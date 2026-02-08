import { apiBase } from '@/api/config';
import { Person } from '@/components/features';
import { IPerson } from '@/components/features/Person/store';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const { data: person } = await apiBase.get<IPerson>(`person/${id}`);

    return {
      title: person.name,
    };
  } catch (error) {
    console.error('Metadata error:', error);
    return {
      title: 'Person not found',
    };
  }
}
export default async function PersonPage() {
  return (
    <main className="flex flex-col gap-[15px]">
      <Person />
    </main>
  );
}
