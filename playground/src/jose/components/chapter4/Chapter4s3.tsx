import styled from 'styled-components';
import { useMovieListInfiniteQuery } from './hooks/queries/useMovieListInfiniteQuery';
import MovieCard from './components/chapter4s2/MovieCard';
import useInfiniteScrollHandler from './hooks/useInfiniteScrollHandler';
import Loading from './components/common/Loading';

export default function Chapter4s3() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useMovieListInfiniteQuery();
  const { observeTargetRef } = useInfiniteScrollHandler({ fetchNextPage, isLoading: hasNextPage });
  return (
    <S.Chapter4s3>
      <div className="card-wrapper">
        {data?.pages.map((pageData) => pageData.data.data.movies.map((element) => <MovieCard key={element.id} element={element} />))}
        {isFetching && <Loading />}
        <div ref={observeTargetRef} />
      </div>
    </S.Chapter4s3>
  );
}

const S = {
  Chapter4s3: styled.div`
    .card-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
  `,
};
