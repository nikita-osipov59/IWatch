import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { getFilmByIdStore } from "@/store";

import { MovieCast, MovieInfoPanel, MovieSimilars } from "@/components/";
import { BorderPanel } from "@/components/ui";

import style from "./style.module.scss";

export const MovieInfo = () => {
  const { filmById, getFilmById } = getFilmByIdStore();

  const { id } = useParams<{ id: string }>();
  console.log(filmById);
  useEffect(() => {
    if (id) {
      getFilmById(id);
    }
  }, [id]);
  return (
    <div className={style.box}>
      <BorderPanel>
        <img
          className={style.backdrop}
          src={filmById?.backdrop.url}
          alt={filmById?.name}
        />
        <p className={style.title}>{filmById?.name}</p>
      </BorderPanel>
      <div className={style.info}>
        <div className={style.column}>
          <BorderPanel title="Description">{filmById?.description}</BorderPanel>
          <MovieCast />
          {filmById?.similarMovies && filmById?.similarMovies?.length > 0 && (
            <MovieSimilars />
          )}
        </div>
        <MovieInfoPanel />
      </div>
    </div>
  );
};
