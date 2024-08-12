# React Hydration Error 란 ?


- ssr에서 처음에 내려주는 UI(pre-render)와 브라우저에서 첫 번째로 렌더되는 `UI 트리간에 차이`가 있기 때문에 난 문제다.
- 첫 번째 렌더는 React의 특징인 Hydration이라고 불린다.
- 즉, `React 트리가 DOM과 동기화되지 않아 발생하게 되는 문제`다.


- 보통 이 에러는 page render에 사용된 특정 코드나 library가 browser에서만 의존을 가지고 있는 피쳐에 의존하고 있어 생기며, window에 접근해서 사용하는 경우를 한 예로 들 수 있다. (node에서는 window가 없기 때문)


## 해결 방법

- `pre-render`와 `browser render` 결과물을 같도록 해야 함
- browser render시 변경될 값을 `useEffect`에 의해 변경되게 해 한 타이밍 미루면 가능
  - `useEffect는 hydration에서 불리기 때문` 