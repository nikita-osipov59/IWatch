interface Country {
  name: string;
}

export interface RandomMovie {
  id: number;
  name: string;
  logo?: { url: string };
  backdrop: { url: string };
  url: string;
  rating: { imdb: number };
  year: number;
  poster: { url: string };
  countries: Country[];
  isLoading: boolean;
  isError: boolean;
}
