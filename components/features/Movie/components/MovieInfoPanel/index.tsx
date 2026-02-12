import { BorderPanel } from '@/components/common';
import {
  movieInfoListIBoxtemsClasses,
  movieInfoListItemsClasses,
} from '@/components/features/Movie/constants';
import { IMovie } from '@/types/movie';

type MovieInfoPanelProps = {
  data: IMovie;
};

export const MovieInfoPanel = ({ data }: MovieInfoPanelProps) => {
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
            {data.genres.map((item) => (
              <li className={movieInfoListItemsClasses} key={`genre-${item.name}`}>
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
            {data.countries.map((item) => (
              <li className={movieInfoListItemsClasses} key={`countries-${item.name}`}>
                {item.name}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </BorderPanel>
  );
};
