import { useParams } from "react-router-dom";

import { BorderPanel } from "@/components/ui";

import { useGetQueryMovieById } from "@/hooks";

import style from "./style.module.scss";

export const MovieTrailer = () => {
  const { id } = useParams();

  const { data } = useGetQueryMovieById(id!);

  return (
    <>
      {data?.videos?.trailers[0]?.url && (
        <BorderPanel title="Trailer">
          <iframe
            className={style.video}
            src={data?.videos?.trailers[0]?.url}
            allowFullScreen={true}
            title="Страница трейлера на YouTube"
          />
        </BorderPanel>
      )}
    </>
  );
};
