'use client';

import { BorderPanel, Loading } from '@/components/common';
import { SearchList } from '@/components/features/Search/components';
import { useGetQueryMovieBySearch } from '@/components/features/Search/mutations';

export const SearchClient = () => {
  const { data, isError, isPending } = useGetQueryMovieBySearch();

  if (isPending) {
    return <Loading position="center" />;
  }

  if (!data || data.docs.length <= 0 || isError) {
    return (
      <BorderPanel>
        <div>Увы, мы ничего не нашли, попробуйте изменить запрос.</div>
      </BorderPanel>
    );
  }

  return (
    <>
      <BorderPanel title="Search result">
        <SearchList data={data} />
      </BorderPanel>
    </>
  );
};

export default SearchClient;
