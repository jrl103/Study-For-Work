import { IInfinityDetailRequest } from '@/songyi/types/API';
import instance from '../config';

export function getCardDetailPage() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  return instance.get(url);
}

export function getInfinityDetailPage(params: IInfinityDetailRequest) {
  const url = 'https://yts.mx/api/v2/list_movies.json';
  const config = {
    params,
  };
  return instance.get(url, config);
}
