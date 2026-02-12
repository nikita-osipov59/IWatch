export interface TMovieSearch {
  docs: Movie[];
}

interface Movie {
  id: number;
  name: string;
  logo: { url: string };
  backdrop: { url: string };
  url: string;
  rating: { imdb: number };
  year: number;
  poster: { url: string };
  countries: Country[];
  description: string;
  genres: Genre[];
  persons: Person[];
  similarMovies?: SimilarMovie[];
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
