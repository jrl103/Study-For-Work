import { AxiosResponse } from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieListResponse } from '../../types/movie';
import { Movie } from '../../apis/movie';
import queryKeys from '../../constants/queryKeys';

export const useMovieListInfiniteQuery = () => {
  return useInfiniteQuery<AxiosResponse<MovieListResponse>>({
    queryKey: [queryKeys.movieList],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => Movie.Get.MovieList({ page: pageParam as number, limit: 9 }),
    getNextPageParam: (lastPage) => lastPage.data.data.page_number + 1,
    getPreviousPageParam: (firstPage) => firstPage.data.data.page_number - 1,
  });
};
