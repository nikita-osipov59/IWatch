import { Metadata } from 'next';

import { SearchClient } from './Search';

export const metadata: Metadata = {
  title: 'Поиск',
};

export default function SearchPage() {
  return <SearchClient />;
}
