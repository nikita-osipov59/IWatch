import { BorderPanel } from '@/components/common';
import { IMovie } from '@/types/movie';

type MovieTrailerProps = {
  data: IMovie;
};

export const MovieTrailer = ({ data }: MovieTrailerProps) => {
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
