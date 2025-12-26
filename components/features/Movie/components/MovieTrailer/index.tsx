import { BorderPanel } from '@/components/common';
import { useMoviemByIdStore } from '@/components/features/Movie/store';

export const MovieTrailer = () => {
  const { data } = useMoviemByIdStore();

  if (!data) {
    return (
      <BorderPanel>
        <div>Увы, мы ничего не нашли, попробуйте перезагрузить страницу.</div>
      </BorderPanel>
    );
  }

  return (
    <>
      {data?.videos?.trailers[0]?.url && (
        <BorderPanel title="Trailer">
          <iframe
            className="h-[500px] w-full rounded-xl"
            src={data?.videos?.trailers[0]?.url}
            allowFullScreen={true}
            title="Страница трейлера на YouTube"
          />
        </BorderPanel>
      )}
    </>
  );
};
