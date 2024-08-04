import styled from 'styled-components';
import { getInfinityDetailPage } from '../api/service';
import queryKeys from '../constants/querykeys';
import { IInfinityDetailResponse, IMovie } from '../types/API';
import { ErrorBoundary } from 'react-error-boundary';
import useBasicInfiniteQuery from '../hooks/useInfinityScroll';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import routerPath from '../constants/routerPath';

export default function Chapter12() {
  const navigate = useNavigate();
  const request = {
    queryKey: [queryKeys.infinityDetailList],
    requestAPI: getInfinityDetailPage,
    requestQuery: {
      limit: 9,
    },
  };

  const { data, isFetchingNextPage, hasNextPage, isSuccess, isLoading, isError, fetchNextPage } =
    useBasicInfiniteQuery<IInfinityDetailResponse>(request);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastTodoElementRef = React.useCallback(
    // node : 목록의 마지막 요소
    (node: HTMLLIElement | null) => {
      // 로딩 중이거나 다음 페이지를 불러오고 있는 중일때
      if (isLoading || isFetchingNextPage) return;

      // 마지막 요소가 아닐 경우 연결 해제
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        // 마지막 요소가 내가 감시하는 영역으로 들어옴 + 다음 페이지 존재 :: IntersectionObserver 가 감시
        console.log('entries[0].isIntersecting', entries[0].isIntersecting);
        console.log('hasNextPage', hasNextPage);
        if (entries[0].isIntersecting && hasNextPage) {
          console.log('진입!!!');
          fetchNextPage();
        }
      });

      // 마지막 요소를 감시 + 추가 데이터 로드
      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  console.log('data', data);
  return (
    <>
      <ErrorBoundary fallback={<div>리액트 에러 발생 !</div>}>
        <S.Chapter12>
          {isLoading && <div>로딩중</div>}
          {isError && <div>데이터 받아오는 중 에러 발생 !</div>}
          {isSuccess && data && data.pages && (
            <S.CardTable>
              {data.pages.map((pageItem: any, pageIndex: number) => (
                <div className="movies-wrapper" key={'pageItem' + pageIndex}>
                  {pageItem.data.data.movies?.map((movieItem: IMovie, movieIndex: number) => {
                    if (pageIndex === data.pages.length - 1 && movieIndex === pageItem.data.data.movies.length - 1) {
                      return (
                        <div className="movies-item" onClick={() => navigate(`${routerPath.CHAPTER_12_1}/${movieItem.id}`)}>
                          <li ref={lastTodoElementRef} key={movieItem.id}>
                            {movieItem.title} {movieItem.year}
                          </li>
                          <div>
                            <img src={movieItem.medium_cover_image} alt="movie-image" />
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="movies-item" onClick={() => navigate(`${routerPath.CHAPTER_12_1}/${movieItem.id}`)}>
                          <li key={movieItem.id}>
                            {movieItem.title} {movieItem.year}
                          </li>
                          <div>
                            <img src={movieItem.medium_cover_image} alt="movie-image" />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              ))}
            </S.CardTable>
          )}
        </S.Chapter12>
      </ErrorBoundary>
    </>
  );
}

const S = {
  Chapter12: styled.div``,
  CardTable: styled.div`
    width: 900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .movies-wrapper {
      display: flex;
      flex-wrap: wrap;
      .movies-item {
        width: 30%;
      }
    }
  `,
};
