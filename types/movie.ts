export interface IMovieBySearchResponse {
  docs: IMovieByIdResponse[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface IMovieByIdResponse {
  videos: Video;
  id: number;
  name: string;
  logo: { url: string };
  backdrop: { url: string };
  url: string;
  rating: { kp: number };
  year: number;
  poster: { url: string };
  countries: Country[];
  description: string;
  genres: Genre[];
  persons: Person[];
  similarMovies?: SimilarMovie[];
}

export interface Video {
  trailers: Trailer[];
}

export interface Trailer {
  url: string;
  name: string;
  site: 'youtube';
  size: number;
  type: 'TRAILER';
}

interface Country {
  name: string;
}

interface Genre {
  name: string;
}

interface Person {
  id: string;
  name: string;
  photo: string;
  description: string;
  profession: string;
}

interface SimilarMovie {
  id: string;
  name: string;
  poster: { url: string };
  length: number;
}

export interface IMovieByGenreDoc {
  id: number;
  name: string;
  alternativeName: string;
  type: 'movie' | 'tv-series';
  typeNumber: 1 | 2;
  year: number | null;
  description: string | null;
  shortDescription: string | null;
  status: string | null;
  rating: { kp: number; imdb: number };
  votes: { kp: number; imdb: number };
  movieLength: number | null;
  genres: Array<{ name: string }>;
  countries: Array<{ name: string }>;
  poster?: { url: string; previewUrl: string };
  backdrop?: { url: string; previewUrl: string };
}

export interface IMovieByGenreResponse {
  docs: IMovieByGenreDoc[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
