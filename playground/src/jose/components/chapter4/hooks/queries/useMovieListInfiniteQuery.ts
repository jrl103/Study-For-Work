import { AxiosResponse } from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieListResponse } from '@/jose/components/chapter4/types/movie';
import { Movie } from '@/jose/components/chapter4/apis/movie';
import queryKeys from '@/jose/components/chapter4/constants/queryKeys';

export const useMovieListInfiniteQuery = (limit: number) => {
  return useInfiniteQuery<AxiosResponse<MovieListResponse>>({
    queryKey: [queryKeys.movieList],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => Movie.Get.MovieList({ page: pageParam as number, limit }),
    getNextPageParam: (lastPage) => {
      const maxPageNumber = lastPage.data.data.movie_count / limit;
      if (lastPage.data.data.page_number >= maxPageNumber) return undefined;
      return lastPage.data.data.page_number + 1;
    },
    getPreviousPageParam: (firstPage) => firstPage.data.data.page_number - 1,
  });
};
