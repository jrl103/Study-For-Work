export interface IInfinityDetailRequest {
  page: number;
}

export interface ICardDetailResponse {
  data: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[];
}

export interface IMovie {
  id: number;
  title: string;
  medium_cover_image: string;
  year: number;
}

export interface IData {
  movie_count: number;
  limit: number;
  page_number: number;
  movies: IMovie[];
}

export interface IInfinityDetailResponse {
  data: {
    status: string;
    status_message: string;
    data: IData;
  };
}
