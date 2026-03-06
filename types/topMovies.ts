export interface ITopMoviesResponse {
  category: string;
  name: string;
  slug: string;
  moviesCount: number;
  cover: ImageUrls;
  movies: TopMoviesData;
  createdAt?: string;
  updatedAt?: string;
}

interface TopMoviesData {
  docs: ITopMoviesDoc[];
  limit: number;
  next: string | null | undefined;
  prev: string | null;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
}

interface ITopMoviesDoc {
  position: number;
  positionDiff?: number;
  rating: number;
  votes: number;
  movie: ITopMovie;
}

interface ITopMovie {
  id: number;
  name: string;
  enName?: string;
  alternativeName?: string;
  year: number;
  movieLength?: number;
  poster: {
    url: string;
    previewUrl?: string;
  };
  rating?: {
    kp?: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
    await?: number;
  };
}

interface ImageUrls {
  url: string;
  previewUrl?: string;
}
