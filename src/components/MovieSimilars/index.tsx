import { Link, useParams } from "react-router-dom";

import { BorderPanel } from "@/components/ui";

import { ROUTER_PATH } from "@/router/PATH";

import { useGetQueryMovieById } from "@/hooks";

import style from "./style.module.scss";

export const MovieSimilars = () => {
  const { id } = useParams();

  const { data } = useGetQueryMovieById(id!);

  return (
    <>
      {data?.similarMovies && data?.similarMovies?.length > 0 && (
        <BorderPanel title="Similar movies">
          <div className="overflowAuto">
            <ul className={style.similarList}>
              {data?.similarMovies?.map((item) => (
                <li key={item.id}>
                  <Link
                    className={style.similarItem}
                    to={ROUTER_PATH.MOVIE + `/${item.id}`}
                  >
                    <img
                      className={style.poster}
                      src={item.poster.url}
                      alt={item.name}
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </BorderPanel>
      )}
    </>
  );
};
