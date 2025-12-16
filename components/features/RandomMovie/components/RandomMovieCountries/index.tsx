import { useGetQueryRandomMovie } from '@/components/features/RandomMovie/mutations';

export const RandomMovieCountries = () => {
  const { data, isError } = useGetQueryRandomMovie();

  if (!data || isError) {
    return <div>Увы, мы ничего не нашли</div>;
  }

  return (
    <ul className="flex">
      {data.countries.slice(0, 4).map((item, index) => {
        return <li key={index}>{(index ? ', ' : '') + item.name}</li>;
      })}
    </ul>
  );
};
