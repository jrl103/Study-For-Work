# React-Query 란 ?

- React 에서 `원격 및 비동기 데이터를 관리`하기 위한 라이브러리
- API 와 같은 다양한 데이터 소스에서 `데이터를 더 쉽게 가져오고, 캐시하고, 동기화하고, 업데이트`할 수 있는 일련의 훅 및 유틸리티 제공
- React Component 내부에서 간단하고 직관적으로 API 사용 가능

기본적으로 GET 에는 useQuery /
PUT, UPDATE, DELETE 에는 useMutation 사용됨

## useQuery

- 데이터를 가져오는 목적으로 사용됨
- caching, refetch 등을 자동으로 처리

1. 첫 번째 파라미터로 unique key 를 포함한 배열이 들어감. 이후 `동일한 쿼리를 불러올 때 유용하게 사용`됨
2. `첫 번째 파라미터` 에 들어가는 배열의 첫 요소는 `unique key` 로 사용 --> 쿼리를 식별하고 캐시하기 위해 사용
3. `두 번째 파라미터` 로 실제 호출하고자 하는 `비동기 함수(fetchData 함수)` 가 들어감 --> 데이터를 가져오는 로직을 수행
4. `최종 반환 값`은 `API 의 성공, 실패 여부, 반환값`을 포함한 객체

> - [ 비동기 함수(fetchData 함수, 쿼리 함수) ]
> - 함수는 쿼리를 `실행`하거나 `refetch`해야 할 때마다 호출.
> - 이 함수는 비동기 함수나 프로미스 기반 함수로 작성할 수 있으며, `데이터를 가져오는 로직`을 처리함

```javascript
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
        (res) => res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
```

useQuery 함수가 반환하는 객체
: `isLoading` (로딩 여부), `error` (에러 발생 여부), `data`(성공시 데이터 반환)

## useQueries

여러개의 useQuery를 한 번에 실행하고자 하는 경우 기존의 `Promise.all()`처럼 묶어서 실행할 수 있음

```javascript
const results = useQueries({
  queries: [
    { queryKey: ["post", 1], queryFn: fetchPost, staleTime: Infinity },
    { queryKey: ["post", 2], queryFn: fetchPost, staleTime: Infinity },
  ],
});

// 두 query에 대한 반환값이 배열로 묶여 반환됨
```

## useMutation

- `PUT`, `UPDATE`, `DELETE` 와 같이 값을 변경할 때 사용하는 API
- 서버의 데이터를 수정하거나 업데이트하는 작업
- 반환값은 useQuery와 동일
- useMutation 훅은 뮤테이션 요청을 보내고 `변이 상태를 관리`하며, `낙관적 업데이트`를 처리하는 등 뮤테이트를 처리하는 과정을 간편하게 해 줌

> - [ 낙관적 업데이트 ]
> - `실제 서버 응답이 수신되기 전`에 성공에 대한 낙관적 가정으로 `사용자 인터페이스가 즉시 업데이트` 하는 것
> - 사용자에게 즉각적인 피드백을 제공하여 보다 원활하고 반응이 빠른 사용자 경험을 제공
> - 만약 서버 업데이트가 `실패할 경우`는 `업데이트 이전의 데이터로 변경해야 되기 때문`에 useMutation 훅에 onMutate함수를 사용하여 뮤테이션 되기 전에 실행될 `콜백함수`를 지정하여 해당 이슈를 방지할 수 있음.

```javascript
function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("/todos", newTodo);
    },
  });

  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}
```

- 반환 값은 useQuery와 동일하지만, 처음 사용 시에 `post` 비동기 함수를 넣어줌.
- `실제 사용` 시에는 `mutation.mutate` 메서드를 사용하고, 첫 번째 인자로 API 호출 시에 전달해주어야하는 데이터를 넣어주면 된다.

차이점
: useMutation의 `첫 번째 파라미터`에 `비동기 함수`가 들어가고, `두 번째 인자`로 `상황 별 분기 설정`이 들어감

## useInfiniteQuery

- `파라미터 값만 변경`하여 `동일한 useQuery를 무한정 호출`할 때 사용됨
- 사용법은 전반적으로 useQuery와 동일

```javascript
const res = useInfiniteQuery(queryKey, queryFn);
```

```javascript
const getPersons = () => {
  const res = useInfiniteQuery(
    ["infinitePerson"],
    ({ pageParam = 5 }) =>
      axios.get("http://localhost:8080/person", {
        params: {
          id: pageParam,
        },
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.id + 1; // 다음 페이지를 호출할 때 사용 될 pageParam
      },
    }
  );

  // 로딩 중일 경우
  if (res.isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  // 결과값이 전달되었을 경우
  if (res.data) {
    return (
      <Person.Container>
        {res.data.pages.map((page) => {
          const person: Iperson = page.data;

          return (
            <Person.Box key={person.id}>
              <Person.Title>{person.id}.</Person.Title>
              <Person.Text>{person.name}</Person.Text>
              <Person.Text>({person.age})</Person.Text>
            </Person.Box>
          );
        })}
        <Person.NextButton onClick={() => res.fetchNextPage()}>
          Next
        </Person.NextButton> {/* 클릭 시 다음 페이지 호출 */}
      </Person.Container>
    );
  }
};
```

#### PageParam : `현재 어떤 페이지에 있는지`를 확인할 수 있는 파라미터 값

: 기본 값 : undefined
: 데이터를 조회해올 때 pageParam값을 api 요청할 때 파라미터 값으로 넣어 사용

#### getNextPageParam : `다음 api를 요청`할 때 사용될 `pageParam` 값을 정할 수 있음

: 파라미터 값 : lastPage, allPages
: `return 되는 값`이 다음 페이지가 호출될 때 `pageParam` 값으로 사용됨

- `lastPage` : useInfiniteQuery를 이용해 호출된 `가장 마지막`에 있는 페이지 데이터
- `allPages` : useInfiniteQuery를 이용해 호출된 `모든` 페이지 데이터

#### fetchNextPage : `다음 페이지의 데이터`를 호출할 때 사용

: useInfiniteQuery를 이용해 호출되는 데이터들은 page별로 배열의 요소에 담기게 됨
: fetchNextPage를 이용해 호출된 데이터는 `배열의 가장 우측에 새롭게 담겨` 전달 받음

#### getPreviousPageParam : `이전 api를 요청`할 때 사용될 `pageParam` 값을 정할 수 있음

#### fetchPreviousPage : `이전 페이지의 데이터`를 호출할 때 사용
