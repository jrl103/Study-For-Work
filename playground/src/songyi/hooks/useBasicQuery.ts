import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

export interface IUseBasicQuery {
  queryKey: any[];
  requestAPI: (...arg: any) => Promise<any>;
  requestQuery?: object;
}

export default function useBasicQuery<T>({ queryKey, requestAPI, requestQuery }: IUseBasicQuery) {
  const fetcher = async () => {
    const hasQuery = requestQuery && Object.keys(requestQuery).length > 0;
    if (hasQuery) {
      return await requestAPI(requestQuery);
    }
    return await requestAPI();
  };

  const { data, isLoading, isSuccess, isError } = useQuery<T, AxiosError>({
    queryKey: queryKey,
    queryFn: fetcher,
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  };
}
