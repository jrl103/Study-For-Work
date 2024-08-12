import { QueryClient, dehydrate, useInfiniteQuery } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

// 리스트를 가져오는 함수
const getList = async (pageParam: number) => {
  const response = await fetch(
    `https://yts.mx/api/v2/list_movies.json?page=${pageParam}&limit=9`
  )
  return response.json()
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  // 사전 로드할 데이터를 미리 fetch
  await queryClient.prefetchInfiniteQuery({
    // React Query에서 이 데이터를 식별하기 위한 키
    queryKey: ['list'],
    // 데이터를 가져오는 함수
    queryFn: ({ pageParam }) => getList(pageParam),
    getNextPageParam: (lastPage: any) => {
      // 다음 페이지가 있는지 계산하여 반환
      const { page_number, limit, movie_count } = lastPage.data
      const maxPages = Math.ceil(movie_count / limit)
      return page_number < maxPages ? page_number + 1 : undefined
    },
    // 처음에 로드할 페이지 번호
    initialPageParam: 1,
  })

  return {
    props: {
      // 미리 가져온 데이터를 페이지에 전달
      dehydratedState: dehydrate(queryClient),
    },
  }
}

function ListPage() {
  const router = useRouter()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      // React Query에서 이 데이터를 식별하기 위한 키
      queryKey: ['list'],
      // 데이터를 가져오는 함수
      queryFn: ({ pageParam }) => getList(pageParam),
      getNextPageParam: (lastPage) => {
        // 다음 페이지가 있는지 계산하여 반환
        const { page_number, limit, movie_count } = lastPage.data
        const maxPages = Math.ceil(movie_count / limit)
        return page_number < maxPages ? page_number + 1 : undefined
      },
      initialPageParam: 1,
    })
  return (
    <Container>
      <div className="movie-list">
        {data?.pages.map((page, index) => (
          <div key={'pages' + index}>
            {page.data.movies.map((movie: any) => (
              <div
                key={movie.id}
                className="movie-item"
                onClick={() => router.push(`/list/detail/${movie.id}`)}
              >
                <img src={movie.medium_cover_image} alt={movie.title} />
                <h2>{movie.title}</h2>
                <p>Year: {movie.year}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="load-more">
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? '로딩중...' : '더보기'}
          </button>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  div.movie-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    div.movie-item {
      width: 400px;
      cursor: pointer;
      overflow: hidden;
    }
  }
`

export default ListPage
