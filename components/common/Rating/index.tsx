import { TRating } from '@/types';

export const Rating = ({ data }: TRating) => {
  const parts: string[] = [];
  if (data.imdb !== undefined && data.imdb > 0) {
    parts.push(`IMDb ${data.imdb.toFixed(1)}`);
  }
  if (data.kp !== undefined && data.kp > 0) {
    parts.push(`KP ${data.kp.toFixed(1)}`);
  }

  // Если ничего нет – ничего не выводим
  if (parts.length === 0) return null;

  return (
    <span className="absolute top-2 right-2.5 flex gap-2 rounded-xl bg-primary p-0.75 px-3 text-xs text-white">
      {parts.join(' | ')}
    </span>
  );
};
