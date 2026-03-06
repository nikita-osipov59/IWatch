import { BorderPanel } from '@/components/common';
import { useParams } from 'next/navigation';
import { useGetQueryMovieById } from '@/components/features/Movie/mutations';

type Params = {
  id: string;
};

export const MovieTrailer = () => {
  const params = useParams<Params>();

  const { data } = useGetQueryMovieById(params.id);

  return (
    <>
      {data.videos.trailers[0].url && (
        <BorderPanel title="Trailer">
          <iframe
            className="h-[500px] w-full rounded-xl"
            src={data.videos.trailers[0].url}
            allowFullScreen={true}
            title="Страница трейлера на YouTube"
          />
        </BorderPanel>
      )}
    </>
  );
};
