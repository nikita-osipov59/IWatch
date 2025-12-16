'use client';

import Loader from 'react-ts-loaders';

export interface LoadingProps {
  className?: string;
  size?: number;
  color?: string;
  type?:
    | 'spinner'
    | 'hourglass'
    | 'dotspinner'
    | 'ellipsis'
    | 'ring'
    | 'roller'
    | 'grid'
    | 'circle'
    | 'ripple';
  position?: 'center';
}

export const Loading = ({
  color = '#f50',
  size = 100,
  type = 'spinner',
  position,
  className,
}: LoadingProps) => {
  return (
    <Loader
      className={`${className ? className : ''} ${position === 'center' ? 'h-[80vh] min-h-full items-center' : ''}`}
      color={color}
      type={type}
      size={size}
    />
  );
};
