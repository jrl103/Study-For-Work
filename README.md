# 프론트 스터디

프론트 스터디 챕터입니다.

문제 3개씩 주어질 예정이고 이를 풀어오기

!!! 주의: 예제를 풀때는 chat GPT의 도움을 최대한 받지말기.

모든 문제들에 퍼블리싱을 고려할 필요는 없다.

## 챕터 1. 타입스크립트

1. 타입스크립트란?
   1. 우리가 타입스크립트를 사용해야하는 이유는?
2. 타입단언과 타입선언
3. 타입추론, 그리고 인터페이스와 타입
4. 리터럴 타입의 이해
5. 타입가드와 is란?
6. 타입상속 & 유니온 타입
7. 유틸리티 타입
8. 제네릭

### 문제

1. 아래 타입들을 기반으로 아래 요구사항을 충족하시오. (단 아래 주어진 타입수정은 불가능.)

   ```typescript
   interface IAnimal {
     name: string;
     age: number;
   }
   type TGender = "woman" | "man";
   ```

   > 요구사항: 배열을 만들어주시고요, 사람이라는 배열을 만들어주세요. 대신 사람의 성별중에 중성이라는 성별을 하나 더 가지고 있어야합니다. 이를 타입스크립트를 통해 안정성있는 배열로 만들어주세요. 아? 근데 저는 name이라는 프로퍼티가 숫자만으로도 구성이 가능하게 해주면 좋을거같아요.

2. 타입스크립트를 활용하여 아래 타입들을 만들어보시오.
   - 특정 타입(오브젝트 타입)의 value값만 입력받을 수 있는 ValueOf.
   - 아래 색상정보를 타입화하여 색상객체의 키정보만을 입력받을 수 있는 인터페이스를 만드시오
   ```javascript
   const colors = {
     white: "#ffffff",
     red: "#ff0000",
     blue: "#0000ff"
     yellow: "#ffff00"
   };
   ```
3. 아래는 신기하게도 에러가 발생한다. 왜 에러가 발생하는지 이유를 설명하고 코드를 개선해보시오

   ```typescript
   interface User {
     type: "user";
     name: string;
     age: number;
     occupation: string;
   }

   interface Admin {
     type: "admin";
     name: string;
     age: number;
     role: string;
   }

   export type Person = User | Admin;

   export const persons: Person[] = [
     {
       type: "user",
       name: "Max Mustermann",
       age: 25,
       occupation: "Chimney sweep",
     },
     { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
     { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
     { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
   ];

   export function isAdmin(person: Person) {
     return person.type === "admin";
   }

   export function isUser(person: Person) {
     return person.type === "user";
   }

   export function logPerson(person: Person) {
     let additionalInformation = "";
     if (isAdmin(person)) {
       additionalInformation = person.role;
     }
     if (isUser(person)) {
       additionalInformation = person.occupation;
     }
     console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
   }

   console.log("Admins:");
   persons.filter(isAdmin).forEach(logPerson);

   console.log();

   console.log("Users:");
   persons.filter(isUser).forEach(logPerson);
   ```

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

- GET https://koreanjson.com/users

## 챕터 3. React-Hook-Form

1. React-Hook-Form이란?
2. 우리가 React-Hook-Form을 사용하는 이유는?
3. FormProvider와 useFormContext
4. 값의 재설정 (setValue & reset)
5. 유효성 검사방법과 yup (혹은 zod도 괜찮음)
6. yup문법

### 문제

1. 아래 조건을 만족하는 리액트 훅폼으로 구축된 인풋 컴포넌트를 만드시오.

- 다양한 타입에 대응가능한 컴포넌트여야 함.
- useForm을 통해 인자를 전달받지않고 구현돼야함.
- 유효성 검사결과 문제가 되는 사항을 안내하는 문구를 인풋 아래영역에 출력해야함.

2. 아래 조건을 만족하는 체크박스 컴포넌트를 만드시오.

- 다양한 타입에 대응가능하지만, value정보가 Y or N으로 구성돼야함. (체크시에 Y 아닐 경우에는 N)
- useForm을 통해 인자를 전달받지않고 구현돼야함.
- 유효성 검사결과 문제가 되는 사항을 안내하는 문구를 인풋 아래영역에 출력해야함.

3. 아래 조건을 만족하는 라디오버튼 컴포넌트를 만드시오.

- 다양한 타입에 대응가능하지만, value정보가 특정 두가지 값으로 구성돼야함. (ex 한 라디오버튼 클릭시에 무료배송, 다른 라디오버튼 클릭시에는 유료배송)
- useForm을 통해 인자를 전달받지않고 구현돼야함.
- 유효성 검사결과 문제가 되는 사항을 안내하는 문구를 인풋 아래영역에 출력해야함.

4. 위에서 만든 컴포넌트를 토대로 아래 조건을 만족하는 폼을 만드시오.

- 이름: 필수, 최소 2자 이상, 최대 50자 이하.
- 이메일: 필수, 이메일 형식이어야 하고 이름의 길이가 4자 이상이여야 입력가능.
- 비밀번호: 필수, 최소 8자 이상, 하나 이상의 대문자, 소문자, 숫자 및 특수 문자 포함.
- 비밀번호 확인: 비밀번호와 모든 조건이 동일. 이때 비밀번호와 값이 동일해야함.
- 전화번호: 선택, 10-15자 사이의 숫자만 허용.
- 성별: 필수, 'WOMAN'과 'MAN'이라는 값으로만 식별돼야함.
- 나이: 필수, 숫자만 허용, 18 이상이어야 함.
- 웹사이트: 선택, 올바른 URL 형식이어야 함.
- 동의: 필수, 체크박스가 체크돼야 함.

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

### 문제

1. 아래 인프라를 직접 구축해보시오

- 조건
  - Axios 라이브러리 사용
  - React-Query 라이브러리 사용
  - react-error-boundary 라이브러리 사용
  - 리액트 사용
  - 이외에 다른 라이브러리는 절대 사용불가능🚨
- 인프라 요구사항
  - API 호출을 하는 Axios Fetcher 함수들을 별도로 관리하는 폴더 및 파일이 구축돼야함
  - Axios 응답값의 타입정보를 별도로 관리할 수 있는 폴더 및 파일이 구축돼야함.
  - React-Query훅 함수를 별도로 관리할 수 있는 폴더(선택사항) 및 파일이 구축돼야함.
  - React-Query의 키정보를 상수로 관리해야함.
  - QueryClient를 생성하고 이 기본설정값을 관리할 수 있는 객체정보를 별도의 상수로 관리해야함.

2. 위에 구축된 인프라를 기반으로 아래 요청사항을 직접 구현하시오

- 3열의 카드형태로 화면이 보여야함.
- 해당 API를 호출해야하며 클릭시 상세페이지가 보여야함.
  - https://jsonplaceholder.typicode.com/posts
- 로딩처리 & 예외처리가 반드시 돼있어야함.

3. 위에 구축된 인프라를 기반으로 아래 요청사항을 직접 구현하시오

- 3열의 카드형태로 화면이 보여야함.
- 무한 스크롤의 형태로 화면이 구현돼야함.
- 해당 API를 호출해야하며 클릭시 상세페이지가 보여야함.
  - https://yts.mx/api/v2/list_movies.json?page=<페이지 번호>&limit=9
  - (리미트는 9로 고정해주세요!)
  - 영화 아이템에 id, title, medium_cover_image, year 데이터를 활용해주세요.
- 로딩처리 & 예외처리가 반드시 돼있어야함.

## 챕터 5. Next.js

1. Next.js란?
   1-1. 우리가 Next.js를 사용하는 이유는?
2. SSR & SSG & ISR이란?
3. Hydration과 dehydrate 과정
4. pages/api 폴더의 이해
5. React-Query와 Next.js의 조합
6. Image 컴포넌트란?
7. React Hydration Error란?
8. next.config.js파일의 이해(중요하다고 생각되는 옵션들 알아오기)

### 문제

1. Next.js 프로젝트를 설치하고 아래 조건들과 더불어서 라이브러리들을 사용할 수 있는 환경을 조성하시오.

#### <조건>

- page 라우팅 방식이여야함.

#### <환경>

- styled-components를 사용할 수 있는 환경이여야함.
- typescript를 사용할 수 있는 환경이여야함.
- React-Query를 사용할 수 있는 환경이여야함. (단 리액트 쿼리는 tanstackQuery여야함.)

2. getServerSideProps를 사용하기 적절한 상황과 getStaticProps를 사용하기 적절한 상황을 각각 작성하시오

- 이에대한 페이지를 실제로 구현해보시오

3. useInfinityQuery & queryClient & Hydration을 활용하여 아래 API와 getStaticProps로 카드형태의 UI를 구현하시오

- https://yts.mx/api/v2/list_movies.json?page=<페이지 번호>&limit=9

4. useQuery & queryClient & Hydration을 활용하여 아래 API와 getStaticPaths & getStaticProps로 상세페이지를 만드시오.

- https://yts.mx/api/v2/movie_details.json?movie_id=<영화 id>

## 챕터 6. 현업에서 활용중인 기술들

1. SEO 최적화 & sitemap
2. 다국어 처리
   2-1. 리액트에서 다국어 처리를 하는법
   2-2. Next.js에서 다국어 처리를 하는법
3. 보안
4. 웹 성능분석 방법
   4-1. Lighthouse란?
   4-2. 크롬 브라우저 개발자 도구
5. 디자인 시스템이란?

### 문제

1. React와 Next.js에서 SEO 최적화를 각각 해보시오.
2. 아래 사이트를 웹 성능분석 툴로 분석하고 문제점과 개선사항들을 작성하시오.

- https://wch.eqlstore.com/main

3. 이번 스터디 후기를 작성하시오.

> 고생많으셨어요🙏
