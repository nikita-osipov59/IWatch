import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const movieInfoListItemsClasses = twMerge(
  clsx('flex flex-col rounded-lg border border-border bg-background px-3.5 py-[7px] duration-300'),
);

export const movieInfoListIBoxtemsClasses = twMerge(clsx('mt-2.5 flex flex-wrap gap-2.5'));
