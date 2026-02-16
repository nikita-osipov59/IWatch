export interface ImageUrls {
  url: string;
  previewUrl?: string;
}

export interface MovieRating {
  kp?: number;
  imdb?: number;
  rating?: number;
}

export interface MovieData {
  id: number;
  name: string;
  enName?: string;
  alternativeName?: string;
  year: number;
  movieLength?: number;
  poster: ImageUrls;
  rating?: MovieRating;
  genres?: string[];
  countries?: string[];
}

export interface MovieDoc {
  position: number;
  positionDiff?: number;
  rating: number;
  votes: number;
  movie: MovieData;
}

export interface MoviesResponse {
  docs: MovieDoc[];
  total?: number;
  limit?: number;
  next?: string;
  hasNext?: boolean;
}

export interface TopMovies {
  category: string;
  name: string;
  slug: string;
  moviesCount: number;
  cover: ImageUrls;
  movies: MoviesResponse;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}
