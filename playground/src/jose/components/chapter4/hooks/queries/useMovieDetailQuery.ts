import { AxiosResponse } from 'axios';
import queryKeys from '@/jose/components/chapter4/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/jose/components/chapter4/apis/movie';
import { MovieDetailResponse } from '@/jose/components/chapter4/types/movie';

export default function useMovieDetailQuery(id: number) {
  return useQuery<AxiosResponse<MovieDetailResponse>>({
    queryKey: [queryKeys.movieList, id],
    queryFn: () => Movie.Get.MovieDetail(id),
  });
}
