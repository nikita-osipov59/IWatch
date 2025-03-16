import {
  MovieCast,
  MovieInfoPanel,
  MovieSimilars,
  MovieTrailer,
} from "@/components/";
import { BorderPanel } from "@/components/ui";

import style from "./style.module.scss";
import { useParams } from "react-router-dom";
import { useGetQueryMovieById } from "@/hooks";

export const MovieInfo = () => {
  const { id } = useParams();

  const { data } = useGetQueryMovieById(id!);

  return (
    <div className={style.box}>
      <BorderPanel>
        <img
          className={style.backdrop}
          src={data?.backdrop.url}
          alt={data?.name}
        />
        <p className={style.title}>{data?.name}</p>
      </BorderPanel>
      <div className={style.info}>
        <div className={style.column}>
          <BorderPanel title="Description">{data?.description}</BorderPanel>
          <MovieCast />
          <MovieTrailer />
          <MovieSimilars />
        </div>
        <MovieInfoPanel />
      </div>
    </div>
  );
};
