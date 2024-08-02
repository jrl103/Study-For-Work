# queryClient

캐시와 상호 작용하는 데 사용

```javascript
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

await queryClient.prefetchQuery({ queryKey: ["posts"], queryFn: fetchPosts });
```

- `QueryCache` 와 `MutationCache` 를 담는 그릇
- 직접 `QueryCache` 에 접근하기보다, `QueryClient` 를 통해 `QueryCache` 와 `MutationCache` 에 접근한다.

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
...

const queryClient = new QueryClient();

function Root() {
  return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
  );
}
```

- `QueryClientProvider` 를 통해 내려준 `queryClient` 에 접근하기 위해서는 `useQueryClient` 를 사용한다.

```javascript
const queryClient = useQueryClient();
```

## QueryCache

`QueryClient` 객체 안에는 `QueryCache` 가 존재함.
