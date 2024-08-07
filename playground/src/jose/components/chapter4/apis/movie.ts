import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const MOVIES = '/list_movies.json';
const DETAIL_MOVIES = '/movie_details.json';

const config: AxiosRequestConfig = {
  baseURL: `${BASE_URL}`,
  withCredentials: true,
};

const instance = axios.create(config);

export const Movie = {
  Get: {
    MovieList: ({ page, limit }: { page: number; limit: number }) => instance.get(`${MOVIES}?page=${page}&limit=${limit}`),
    MovieDetail: (id: number) => instance.get(`${DETAIL_MOVIES}?movie_id=${id}`),
  },
  Post: {},
  Put: {},
  Patch: {},
  Delete: {},
};
