# 1. React-Query란?
React-Query는 데이터를 불러오고 캐싱하며, 서버 데이터와의 동기화 및 업데이트 하는 작업을 개발자가 쉽고 간단하게 할 수 있도록 도와주는 라이브러리이다. 즉, '비동기 로직을 쉽게 다룰수 있게 해준다' 라고 이해하면 됨.

> 리액트 쿼리는 왜 써야할까?
걍 간단하게 redux-saga나 redux-thunk같은거 써보면 알음. 전역상태관리 라이브러리를 사용할때 데이터 패칭후 이를 전역상태 데이터로 관리하는 방식이 redux-saga와 redux-thunk인데 이렇게되면 역할이 불분명해짐. 전역상태관리 라이브러리는 온전히 전역상태관리만 해야지 왜 데이터 패칭 후 캐싱하는 역할까지 수행해야하나? 이런 패러다임에서 등장한게 바로 React-Query라고 보면 좋을듯함.

### 장단점 및 핵심기능
- 데이터 캐싱 기능
- 동일한 데이터에 대한 중복 요청을 제거
- 백그라운드에서 "오래된" 데이터 업데이트
- 데이터 업데이트를 최대한 신속하게 반영
- 페이지네이션 및 데이터 지연 로드와 같은 성능 최적화
- 서버 상태의 메모리 및 가비지 수집 관리
- 구조적 공유로 쿼리 결과 메모하기

### refetch가 일어나는 조건
- refetchOnWindowFocus: 윈도우에 포커스 된 경우
- refetchOnMount: 마운트 될때
- refetchOnReconnect: 재연결 될 때

# 1-1. useQuery
useQuery는 React Query에서 제공하는 GET방식의 데이터를 호출시 사용하는 함수이다.

현재 다운받아져있는 리액트 쿼리 라이브러리는 5버전이라서 문법이 좀 다른데, 아래와 같이 useQuery라는 훅내에 객체의 형태로 각 옵션들을 정의한다.
```tsx
  interface IUser {
    name: string;
    title: string;
  }

  const { data } = useQuery<IUser>({
    queryFn: () => axios.get('/'),
    queryKey: ['test'],
  });
```
> ???: 엥? 이거 기존의 문법이랑 좀 다른데 어케된거죠?
> A: 리액트 쿼리는 생각보다 업데이트가 자주되고있는 라이브러리라서요, 기존에 있던 문법들이 버전별로 달라지는 경우가 존재합니다. 따라서 리액트 쿼리의 사용법, 사용하는 이유를 알아만 두고, 현재 어떤 버전을 사용했는지를 파악후 문법을 어떻게 작성해야하는지 익혀야겠습니다!

# 1-2. useQueries
마치 promiseAll처럼 한번에 여러 API호출을 하며 여러 데이터를 관리하기위해 사용하는 훅이다.

```tsx
  const userArray = ['minsu', 'kyungHun'];
  const result = useQueries<IUser[]>({
    queries: userArray.map((element) => ({
      queryFn: () => axios.get('/'),
      queryKey: [element],
      staleTime: 1000,
    })),
  });
  console.log(result[0].data);
```
# 1-3. useMutation
# 1-4. useInfiniteQuery
useInfinityQuery 역시 React Query에서 제공하는 GET방식의 데이터를 호출시 사용하는 함수이며, 페이징 기능 구현시 사용한다.

### 기본적인 사용 방법
무한 스크롤 API를 호출해야하는 상황을 위해서사용방법은 useQuery와 거의 비슷하지만 차이점을 정리하자면 아래와 같다.

- 두 개의 배열 속성을 포함하는 객체 {pageParams: [], pages: []}로 반환
- 이전/다음 페이지를 가져오기 위한 fetchPreviousPage, fetchNextPage 함수
- hasNextPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage 등의 속성으로 이전/다음 페이지가 있는지를 확인하고 이전/다음 페이지를 가져올때 확인 할 수 있다.
```tsx
  useInfiniteQuery<IUser[]>({
    queryKey: ['test'],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => axios.get(`/${pageParam}`),
    getNextPageParam: (lastPage, allPages) => lastPage,
    getPreviousPageParam: (firstPage, allPages) => firstPage,
  });
```
# 2. 리액트 쿼리의 통신상태정보
- isLoading: 캐시에 저장된 데이터가 없거나, cacheTime을 지정한 시간이 지나고나서 재요청이 일어날때 true가 된다.
- isFetching: 캐시에 저장된 데이터가 없거나, cacheTime을 지정한 시간이 지나고나서 재요청이 일어날때 & staleTime을 지정한 시간이 지나서 재요청이 일어날때
- isError: 데이터 패칭이 실패했을 경우 true. 이때 error라는 React-Query의 리턴값을 활용할 수도 있다.
- isSuccess: 데이터 패칭이 성공했을 경우 true.
- isIdle: 이 쿼리는 현재 비활성화됐으며 사용할 수 없을 때 true
# 3. 리액트 쿼리의 캐싱을 이해하기
리액트 쿼리는 서버 상태 관리를 위한 라이브러리입니다. 이는 서버에서 데이터를 페칭하고, 클라이언트 측에서 데이터를 캐싱하며, 데이터 상태를 자동으로 동기화한다.

리액트 쿼리를 사용하면, 데이터를 요청하는 컴포넌트가 많더라도 각 컴포넌트에서 데이터를 별도로 관리할 필요 없이, 중앙에서 효율적으로 데이터를 관리할 수 있다.

왜냐하면 리액트 쿼리는 데이터 캐싱과 동기화를 자동으로 처리해주기 때문이다.

또한, 리액트 쿼리는 백그라운드에서 데이터를 자동으로 업데이트하고, 사용자가 최신 데이터를 볼 수 있도록 한다.

이러한 기능은 애플리케이션의 성능을 향상시키고, 개발자의 작업을 간소화한다.
# 3-1. staleTime과 cacheTime
- 사전적 정의는 '탁한', '신선하지 않은'이라는 뜻이다. 가져온 데이터가 stale하다면, 이 데이터는 더 이상 신선하지 않는 것이기 때문에 업데이트가 필요하다. react-query는 쿼리가 stale 할때, 다음과 같은 상황에서 해당 쿼리를 refetch 한다.
- cacheTime은 말 그대로 쿼리가 캐시되어있는 시간을 말한다. react-query에서 설정한 디폴트 cacheTime은 300000(5분)이다. 따라서 캐시된 쿼리는 5분 동안 사용되지 않으면(inactive 상태) 저장되는 게 불필요하다고 판단되어 가비지 컬렉터가 수거해 가서 캐시에서 사라진다.
# 4. queryClient를 이해해보자
- QueryClient는 단순하게 표현하자면 QueryCache와 MutationCache를 담는 그릇이다. 우리는 대부분의 경우에 직접 QueryCache에 접근하기보다, QueryClient를 통해 QueryCache와 MutationCache에 접근한다.
- 쿼리 클라이언트를 다시 컴포넌트내에서 사용하고싶을때에는 QueryClient를 만드는게 아닌, useQueryClient를 사용해 기존에 있던 최상단 QueryClient를 접근해서 쓴다.
> 물론 Next.js와 같은 서버사이드 프레임워크를 쓴다면 얘기가 달라진다. 그땐, 클라이언드의 QueryClient정보를 알 수 없기때문에 new QueryClient로 QueryClient를 만들어줘야한다. (대신 사용하지않을땐 clear를 통해 모든 캐시정보를 초기화시켜줘야한다. >> 메모리 누수 발생가능성이 있음)


### 중요한 옵션들
- queryClient.fetchQuery
  - 데이터를 리졸브 하거나 에러를 던지는 비동기 메소드이다. (패치하거나 쿼리를 캐시할 때 사용 << 이거 중요!)
  - 만약 result 가 필요하지 않은 채 쿼리를 패치 해야 되는거면 prefetchQuery를 사용하는게 맞음.
  - 쿼리가 존재하고, 데이터가 invalidated 거나 오래돼서 stale이면 캐시에 있던 데이터를 리턴한다. 반면 최신 데이터를 패치하려고 시도한다.
- queryClient.fetchInfiniteQuery
  - fetchQuery 랑 비슷한데 fetch 하고 infinite query 를 캐시할 때 사용한다.
- queryClient.prefetchQuery
  - fetchQuery와 동일.
  - 다른 점은 얘는 아무것도 리턴하지 않는다.
- queryClient.prefetchInfiniteQuery
  - fetchInfiniteQuery와 동일.
  - 다른 점은 얘는 아무것도 리턴하지 않는다.
- queryClient.getQueryData && queryClient.getQueriesData && queryClient.getQueryState
  - 이 메소드는 동기적인 함수다. 이미 캐시에 존재하는 데이터를 사용할때 쓴다.
  - 개인적으로 처음알게된 함수인데 꽤나 유용하겠다는 생각이 들었습니다. props Drilling으로 data값을 넘겨줄게 아니라 이렇게 값을 가져오면 코드를 깔끔하게 작성할 수 있겠다 싶었네요.
- queryClient.setQueryData && queryClient.setQueriesData && queryClient.setQueryState
  - 동기함수이다. 쿼리의 캐시데이터를 즉시 업데이트 할때 사용한다. 해당 쿼리가 없다면 생성해준다.
  - 특정상황에서 리액트 쿼리로 가져온 정보를 수정할때 유용하겠다 싶었어요. 이것도 꽤나 흥미로워서 써봤습니다.
- queryClient.invalidateQueries
  - 캐시에 있는 쿼리(들)을 무효화 하거나 refetch 할때 사용한다.
- queryClient.refetchQueries
  - 특정조건에서 쿼리를 리패치할때 사용
  -   ```tsx
          // refetch all queries:
        await queryClient.refetchQueries();

        // refetch all stale queries:
        await queryClient.refetchQueries({ stale: true });

        // refetch all active queries partially matching a query key:
        await queryClient.refetchQueries(["posts"], { active: true });

        // refetch all active queries exactly matching a query key:
        await queryClient.refetchQueries(["posts", 1], { active: true, exact: true });
      ```
- queryClient.cancelQueries
  - 캐시에서 outgoing 하는 쿼리들을 캔슬할 때 사용한다.
- queryClient.removeQueries
  - 캐시된 쿼리들을 삭제할때 사용한다.
- queryClient.resetQueries
  - 초기 스테이트로 캐시에 있는 쿼리들을 초기화 할때 사용한다.
  - clear는 모든 구독자를 모두 제거해버리지만, resetQueries는 구독자에게 리셋을 알리고 사전 로드된 state로 리셋시킵니다.
  - 쿼리가 initialData 가 있으면, 이걸로 리셋시킨다.
  - 쿼리가 active 면, 리패치된다.
- queryClient.clear
  - 연결된 모든 캐시를 제거한다.