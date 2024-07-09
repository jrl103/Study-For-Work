# 프론트 스터디

프론트 스터디 챕터입니다.

문제 3개씩 주어질 예정이고 이를 풀어오기

!!! 주의: 예제를 풀때는 chat GPT의 도움을 최대한 받지말기.

모든 문제들에 퍼블리싱을 고려할 필요는 없다.

## 챕터 1. 타입스크립트

1. 타입스크립트란? 
    1. 우리가 타입스크립트를 사용해야하는 이유는?
2. 타입추론, 그리고 인터페이스와 타입
3. 리터럴 타입의 이해
4. 타입상속 & 유니온 타입
5. 유틸리티 타입
6. 제네릭

## 챕터 2. 리액트 훅과 리액트에 대한 이해

1. useState
    1. 리렌더링이란?
    2. useState는 동기적인가 비동기적인가?
2. useEffect
3. useRef
4. useCallback & useMemo & memo
5. 반복렌더링(map)시에 key값을 index로 사용하면 생길 수 있는 이슈
6. 리액트 18버전

### 문제

1. useState를 활용해 input태그에 입력된 값을 특정 버튼을 눌렀을때 확인할 수 있도록 만드시오
    1. useRef를 활용해 위 조건과 동일한 화면을 만드시오
2. 리액트의 useRef를 활용해서 3분동안 흐르는 타이머를 만드시오
3. 아래 정보의 API가 존재한다. 아래 API를 화면의 첫 렌더링시에 호출하시오. 또한 가지고온 정보를 useState로 저장하고, 이름의 성이 ‘김’으로 시작하는 사람을 제외하고, 사용자의 이메일(알파벳)순으로 정렬하시오. 마지막으로 이를 화면에 출력해주시오. (axios및 리액트 쿼리 사용금지. 반드시 유저정보를 인터페이스로 구축할 것.)

## 챕터 3. React-Hook-Form

1. React-Hook-Form이란?
    1. 우리가 React-Hook-Form을 사용하는 이유는?
2. FormContext와 useFormContext
3. 값의 재설정 (setValue & reset)
4. 유효성 검사방법과 yup

## 챕터 4. React-Query

1. React-Query란?
    1. useQuery
    2. useQueries
    3. useMutation
    4. useInfiniteQuery
2. 리액트 쿼리의 통신상태정보
3. 리액트 쿼리의 캐싱을 이해하기
    1. staleTime과 cacheTime
4. queryClient를 이해해보자

## 챕터 5. Next.js

1. SSR & SSG & ISR이란?
