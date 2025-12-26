import { BorderPanel } from '@/components/common';
import { useMoviemByIdStore } from '@/components/features/Movie/store';
import {
  movieInfoListIBoxtemsClasses,
  movieInfoListItemsClasses,
} from '@/components/features/Movie/constants';

export const MovieInfoPanel = () => {
  const { data } = useMoviemByIdStore();

  if (!data) {
    return (
      <BorderPanel>
        <div>Увы, мы ничего не нашли, попробуйте перезагрузить страницу.</div>
      </BorderPanel>
    );
  }

  return (
    <BorderPanel>
      <div className="flex h-fit max-w-[500px] flex-col gap-[15px]">
        <ul>
          <p className="text-accent">Released Year</p>
          <li>{data.year}</li>
        </ul>
        <ul>
          <p className="text-accent">Genres</p>
          <div className={movieInfoListIBoxtemsClasses}>
            {data.genres.map((item, index) => (
              <li className={movieInfoListItemsClasses} key={index}>
                {item.name}
              </li>
            ))}
          </div>
        </ul>
        <ul>
          <p className="text-accent">Ratings</p>
          <div className={movieInfoListIBoxtemsClasses}>
            {data &&
              Object.entries(data.rating)
                .filter(([, value]) => value !== null && value > 0)
                .map(([key, value]) => (
                  <li className={movieInfoListItemsClasses} key={key}>
                    {key}
                    <span>{`${value.toFixed(1)}⭐`}</span>
                  </li>
                ))}
          </div>
        </ul>
        <ul>
          <p className="text-accent">Countries</p>
          <div className={movieInfoListIBoxtemsClasses}>
            {data.countries.map((item, index) => (
              <li className={movieInfoListItemsClasses} key={index}>
                {item.name}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </BorderPanel>
  );
};
