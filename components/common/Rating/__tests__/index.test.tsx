import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Rating } from '../index';

describe('Rating', () => {
  it('renders IMDb rating when provided', () => {
    render(<Rating data={{ imdb: 7.5 }} />);
    expect(screen.getByText('IMDb 7.5')).toBeInTheDocument();
  });

  it('renders KP rating when provided', () => {
    render(<Rating data={{ kp: 8.1 }} />);
    expect(screen.getByText('KP 8.1')).toBeInTheDocument();
  });

  it('renders both ratings when provided', () => {
    render(<Rating data={{ imdb: 7.5, kp: 8.1 }} />);
    expect(screen.getByText('IMDb 7.5 | KP 8.1')).toBeInTheDocument();
  });

  it('returns null when no valid ratings', () => {
    const { container } = render(<Rating data={{ imdb: 0, kp: 0 }} />);
    expect(container.innerHTML).toBe('');
  });

  it('returns null when data is empty', () => {
    const { container } = render(<Rating data={{}} />);
    expect(container.innerHTML).toBe('');
  });

  it('ignores negative rating values', () => {
    const { container } = render(<Rating data={{ imdb: -1, kp: -5 }} />);
    expect(container.innerHTML).toBe('');
  });
});
