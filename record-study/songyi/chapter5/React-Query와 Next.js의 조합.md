# React-Query와 Next.js의 조합

1. 데이터를 프리페치하여 initialData 로 전달한다. 
- 간단한 경우 빠르게 설정 가능
몇 가지 주의 사항이 있음

2. 서버에서 쿼리를 프리페치하고, 캐시를 dehydrate하고 클라이언트에서 다시 rehydrate 한다. 
- 약간 더 많은 설정이 필요하다.


## initialData 사용

Next.js의 `getStaticProps` 또는 `getServerSideProps` 와 함께 두 메서드 중 하나에서 가져온 데이터를 `useQuery` 의 `initialData` 옵션에 전달할 수 있다. React Query의 관점에서 이들은 동일한 방식으로 통합된다. `getStaticProps` 는 아래와 같다.

```typescript
export async function getStaticProps() {
  const posts = await getPosts()
  return { props: { posts } }
}
function Posts(props) {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: props.posts,
  })
// ...
}
```

- 트리에서 더 깊은 하위 컴포넌트에서 `useQuery` 를 호출하는 경우 `initialData` 를 해당 지점으로 전달해야한다.
- 여러 위치에서 동일한 쿼리로 `useQuery` 를 호출하는 경우 모든 위치에 `initialData` 를 전달해야한다.
- 서버에서 쿼리를 가져온 시간을 알 수 있는 방법이 없으므로 `dataUpdatedAt` 및 쿼리를 다시 가져와야 하는지 여부는 대신 페이지가 로드된 시간에 따라 결정된다.

## hydration 사용

- React Query는 Next.js의 서버에서 여러 쿼리를 미리 가져온 다음 해당 쿼리를 `queryClient`로 `dehydration`하는 것을 지원한다. 
- 즉, 서버는 페이지 로드 시 즉시 사용할 수 있는 마크업을 사전 렌더링할 수 있으며, JS를 사용할 수 있게 되자마자 React Query는 라이브러리의 전체 기능으로 해당 쿼리를 업그레이드하거나 hydrate할 수 있다. 
- 여기에는 해당 쿼리가 서버에서 렌더링된 이후 오래된 경우 클라이언트에서 해당 쿼리를 다시 가져오는 것이 포함된다.

서버에서 `캐싱 쿼리를 지원`하고 `hydration`을 설정하려면 다음을 수행하면 된다.

- 앱 내부와 인스턴스 참조(또는 리액트 상태에서)에서 새 `QueryClient` 인스턴스를 만든다. 이렇게 하면 여러 사용자와 요청간에 데이터가 공유되지 않고 컴포넌트 생명주기 한번만 QueryClient를 생성할 수 있다.
- `<QueryClientProvider> `로 앱 컴포넌트를 래핑하고 클라이언트 인스턴스에 전달한다.
- 앱 컴포넌트를 `<HydrationBoundary>` 로 래핑하고 `pageProps` 의 `dehydratedState` prop에 전달한다.


```javascript
// _app.jsx
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
```

























