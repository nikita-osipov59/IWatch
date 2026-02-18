export interface TMovieSearch {
  docs: IMovie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface IMovie {
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
