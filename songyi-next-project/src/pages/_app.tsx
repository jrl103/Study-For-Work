import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Temp Next Project" // 각 페이지의 제목(title)을 설정할 때 사용. %s는 페이지 제목이 들어갈 위치를 나타냄.
        defaultTitle="Temp Next Project" // 페이지에서 제목이 설정되지 않았을 때 기본적으로 사용할 제목.
        description="Temp Next Project" // 페이지의 기본 메타 설명. 검색 엔진 결과 페이지에서 페이지에 대한 요약 설명으로 표시
        openGraph={{
          // Open Graph 프로토콜을 통해 페이지의 콘텐츠가 소셜 미디어에서 공유될 때 사용되는 메타 데이터를 설정
          type: 'website', // Open Graph 객체의 유형을 지정. 웹사이트의 경우 일반적으로 'website'를 사용하며, 페이지나 게시물의 경우 'article'을 사용
          locale: 'en_US', // 언어 및 지역 설정을 지정
          url: 'https://www.temp-next-project.com/', // 페이지의 정규 URL을 지정합니다. 이 URL은 소셜 미디어에서 페이지가 공유될 때 참조
          site_name: 'Temp Next Project', // 사이트의 이름을 지정합니다. 일반적으로 브랜드명이나 사이트 이름을 사용
          images: [
            // 페이지나 사이트를 대표하는 이미지의 URL과 관련 메타 데이터를 지정. 이미지의 크기(width, height)와 대체 텍스트(alt)를 함께 설정
            {
              url: '',
              width: 100,
              height: 100,
              alt: 'default Image',
            },
          ],
        }}
        twitter={{
          // 트위터 카드 메타 데이터를 설정. 트위터에서 페이지가 공유될 때 사용
          handle: '@tempNextProject', // 트위터 계정의 핸들을 지정합니다. 이 핸들은 공유된 트윗에 작성자 또는 사이트 소유자를 나타내기 위해 사용
          site: '@tempNextProject', // 트위터에서 공유된 콘텐츠와 연관된 트위터 계정을 지정합니다. 일반적으로 사이트 또는 브랜드의 공식 트위터 계정을 사용
          cardType: 'summary_large_image', // 트위터 카드의 유형을 지정. 일반적인 유형으로는 'summary_large_image'가 있으며, 큰 이미지를 포함한 링크 미리보기를 생성
        }}
      />
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  )
}
