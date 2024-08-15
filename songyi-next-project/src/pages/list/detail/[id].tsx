import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
// 리스트를 가져오는 함수
const getList = async (pageParam: number) => {
  const response = await fetch(
    `https://yts.mx/api/v2/list_movies.json?page=${pageParam}&limit=9`
  )
  return response.json()
}

// 상세 페이지를 가져오는 함수
const getDetail = async (id: number) => {
  const response = await fetch(
    `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
  )
  return response.json()
}

// getStaticPaths: 빌드 시에 정적 경로를 생성하는 함수
// 미리 리스트에 존재하는 아이템들의 id에 해당하는 경로를 생성한다고하는 경우..
// 리스트에서 페이징 기능이 존재하면은 진입시 1페이지뿐만아니라, 전체 페이지의 아이템의 번호를 담은 path를 반환해야할거같은데..
// 재귀함수나, while문을 사용해서 path를 생성하려고했으나 페이지가 멈춰버림.. 방법을 모르겠음
// 지금은 1페이지를 호출했을때 반환되는 아이템들의 id를 담은 path만 생성됨
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getList(1)

  const paths = data.data.movies.map((movie: any) => ({
    params: { id: movie.id.toString() },
  }))

  console.log('paths', paths)

  return {
    paths, // 생성된 경로들을 반환합니다.
    fallback: 'blocking', // 빌드 시 생성되지 않은 경로는 서버에서 렌더링 후 정적으로 생성
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  // 경로에서 id 파라미터를 가져옴.
  const id = Number(context.params?.id)
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['detail'],
    queryFn: () => getDetail(id),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

function DetailPage() {
  const router = useRouter()

  // useQuery를 사용하여 클라이언트에서 데이터를 가져옴
  const { data, error, isLoading } = useQuery({
    queryKey: ['detail'],
    queryFn: () => getDetail(Number(router.query.id)),
  })
  console.log('data', data)
  return (
    <Container>
      <div className="movie-item">
        <img
          src={data.data.movie.medium_cover_image}
          alt={data.data.movie.title}
        />
        <h2>{data.data.movie.title}</h2>
        <p>Year: {data.data.movie.year}</p>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  div.movie-item {
    width: 400px;
    cursor: pointer;
    overflow: hidden;
  }
`

export default DetailPage
