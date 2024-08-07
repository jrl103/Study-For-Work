/*******************  HTTP REQUESTS  *********************/

/*******************  HTTP RESPONSE  *********************/
export interface MovieDetailResponse {
  data: { movie: MovieDetail };
  status: string;
  status_message: string;
}

export interface MovieListResponse {
  data: { movie_count: number; limit: number; page_number: number; movies: Movie[] };
  status: string;
  status_message: string;
}

/*******************       DTO       *********************/
interface Torrent {
  url: string;
  hash: string;
  quality: string;
  type: string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
  date_uploaded_unix: number;
}

interface MovieDetail {
  background_image: string;
  background_image_original: string;
  date_uploaded: string;
  date_uploaded_unix: number;
  description_full: string;
  description_intro: string;
  genres: string[];
  id: number;
  imdb_code: string;
  language: string;
  large_cover_image: string;
  like_count: number;
  medium_cover_image: string;
  mpa_rating: string;
  rating: number;
  runtime: number;
  slug: string;
  small_cover_image: string;
  title: string;
  title_english: string;
  title_long: string;
  torrents: Torrent[];
  url: string;
  year: number;
  yt_trailer_code: string;
}

export interface Movie {
  background_image: string;
  background_image_original: string;
  date_uploaded: string;
  date_uploaded_unix: number;
  description_full: string;
  genres: string[];
  id: number;
  imdb_code: string;
  language: string;
  large_cover_image: string;
  medium_cover_image: string;
  mpa_rating: string;
  rating: number;
  runtime: number;
  slug: string;
  small_cover_image: string;
  state: string;
  summary: string;
  synopsis: string;
  title: string;
  title_english: string;
  title_long: string;
  torrents: Torrent[];
  url: string;
  year: number;
  yt_trailer_code: string;
}
