import axios, { AxiosRequestConfig } from 'axios';
import { PostDetailResponse, PostListResponse } from '@/jose/components/chapter4/types/post';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const POSTS = '/posts';

const config: AxiosRequestConfig = {
  baseURL: `${BASE_URL}${POSTS}`,
  withCredentials: true,
};

const instance = axios.create(config);

export const Post = {
  Get: {
    PostList: () => instance.get<PostListResponse>(''),
    PostDetail: (id: number) => instance.get<PostDetailResponse>(`/${id}`),
  },
  Post: {},
  Put: {},
  Patch: {},
  Delete: {},
};
