import { useInfiniteQuery } from 'react-query';

export interface IUseBasicInfiniteQuery {
  queryKey: any[];
  requestAPI: (...arg: any) => Promise<any>;
  requestQuery?: object;
}

export default function useBasicInfiniteQuery<T>({ queryKey, requestAPI, requestQuery }: IUseBasicInfiniteQuery) {
  const fetcher = async (pageParam: number) => {
    const queryParams = requestQuery ? { ...requestQuery, page: pageParam } : { page: pageParam };
    return await requestAPI(queryParams);
  };

  const { data, isLoading, isSuccess, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<T>({
    queryKey,
    queryFn: (queryParamsData) => {
      const currentPage: number = queryParamsData?.pageParam || 1;
      console.log('currentPage', currentPage);

      return fetcher(currentPage);
    },
    getNextPageParam: (lastPage: any) => {
      const {
        data: {
          data: { movie_count, page_number, limit },
        },
      } = lastPage;
      const totalPages = Math.ceil(movie_count / limit);
      const nextPage = page_number + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
