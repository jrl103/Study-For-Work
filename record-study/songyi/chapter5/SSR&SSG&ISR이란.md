# SSR & SSG & ISR 이란?

> [ CSR ]
> 1. 유저가 브라우저를 통해 앱에 접속
> 2. 앱은 브라우저에게 자바스크립트 정보가 들어있는 빈 HTML 문서를 전달. 즉, 브라우저에게 자바스크립트 파일을 전달
> 3. 브라우저는 자바스크립트 파일을 다운로드하고 동시에 유저는 빈 화면을 보게 된다 (접속에 대한 응답)
> 4. 브라우저에서 js 파일의 다운로드가 끝나면 리액트 코드가 있는 js 파일을 실행 
> 5. 브라우저에 있는 리액트 코드가 UI를 렌더링한다 (동적으로 렌더링)
> 6. 유저는 앱이 보여주고자 했던 화면을 보게 된다
> 
> 
> - 브라우저가 자바스크립트 코드를 가지고 있지 않거나, 요청 중인 상태라면 UI를 구성할 수 없고, 유저는 빈 화면을 보게 된다. 
> - 리액트 코드가 실행되기 전까지는 유저 화면에 아무것도 보이지 않는다. 
> - 이러한 `클라이언트 측에서 UI를 빌드`하는게 CSR 방식 !


> [ SSR ]
> 1. 유저가 브라우저를 통해 앱에 접속 
> 2. 서버에서 리액트를 실행 
> 3. 리액트는 UI를 렌더링 
> 4. 렌더링된 결과를 통해 브라우저에게 HTML을 제공한다 이때 유저는 앱의 초기화면을 보게 된다 (접속에 대한 응답)
> 5. 이후 브라우저는 리액트 코드가 있는 자바스크립트 파일을 다운받고 실행시킨다. 이때부터 일반적인 리액트 앱과 같이 CSR 의 동작(동적 렌더링)을 하게 되고 이 과정을 hydration 이라고 한다. 
> 
>
> 즉, 서버에서 UI를 모두 구성한 후 유저에게 응답해 화면을 보여주는 방식으로, 화면이 `pre-rendering` 되어 유저는 인터넷 속도에 상관없이 화면에 뭔가 나오는 것을 볼 수 있다. 이러한 `서버 측에서 UI를 렌더링`하는 것이 SSR 방식 !

# SSR

- 서버에서 페이지를 렌더링해서 클라이언트에 전달해주는 방식
  - Next.js 에서 SSG 나 ISR 과 구분되는 이유는 `렌더링되는 시점` 때문
- SSR 은 `사용자가 요청할때 마다 그 시점에 페이지를 새롭게 렌더링`
  - so, `Fetching` 해야하는 `데이터가 빈번하게 변경될 때 사용`

```javascript
export default function SSRPage({ dateTime }: SSRPageProps) {
  return (
    <main>
      <TimeSection dateTime={dateTime} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('https://worldtimeapi.org/api/ip');

  return {
    props: { dateTime: res.data.datetime },
  };
};
```

해당하는 파일에서 `getServerSideProps` 라는 이름의 함수를 export 하면 클라이언트해서 페이지를 요청할 때 `getServerSideProps` 함수가 실행되고 값을 `SSRPage` 에 전달하여 렌더링한 후 클라이언트에 전달된다.

> [ getServerSideProps ]
> - Next.js는 pre-rendering 중 getServerSideProps 함수를 발견하면,
> - `컴포넌트 함수 호출 전` 에 getServerSideProps 를 `먼저 호출`
> - `매 요청마다 호출`되며 `서버에서 실행`



# SSG

- `Static Site Generation` 의 약자
- Next.js 에서 페이지를 생성할 때 `기본으로 적용`되는 설정
- SSR 과 다른 점은 클라이언트가 요청하는 시점이 아니라 `빌드 시에 페이지를 미리 생성`해놓는 것
- 그 후에는 `CDN 으로 캐시가 되어지고 요청마다 HTML 을 재사용`
- 정적으로 생성된 정보를 요청마다 동일한 정보로 반환하는 경우에 사용됨

```javascript
export default function SSGPage({ dateTime }: SSGPageProps) {
  return (
    <main>
      <TimeSection dateTime={dateTime} />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('https://worldtimeapi.org/api/ip');

  return {
    props: { dateTime: res.data.datetime },
  };
};
```

- 별다른 설정 없이도 SSG 가 생성되지만
- `Data Fetching` 이 필요한 경우에 `getStaticProps` 라는 함수를 export 하고 함수 내에서 데이터를 받아서 리턴
  - `빌드` 시에 `getStaticProps` 가 실행되고 리턴하는 값을 컴포넌트에서 받아서 페이지를 `미리 렌더링`하게 됨
  - 단, 빌드하는 시점에 페이지가 미리 생성되기 때문에 fetching 하는 데이터가 변경되더라도 `다시 빌드하지 않는 이상 반영되지 않는다.`

> [ getStaticProps ]
> - 서버 측에서만 실행되는 함수로 클라이언트에서 실행되지 않음
> - API 와 같은 외부 데이터를 받아서 Static Generation 하기 위한 용도
> - `빌드 시에 딱 한 번만 호출`되며, `static file` 로 빌드됨
> - Main 페이지가 호출되면 `getStaticProps 가 먼저 실행`되며 axios 통신을 통해 게시물 리스트를 가져오고, `props 에 리턴 값을 담아서 Main 컴포넌트에 전달`


> [ getStaticPaths ]
> - `동적 라우터(Dynamic Route)` 를 사용해서 `pages/posts/[id].js` 라는 파일을 만들었을 때, `id` 에 따라서 다른 글을 보여주고 싶을 경우
>   - ex ) id가 1인 글을 추가한다면 우리는 빌드 시에 id가 1인 post data 를 불러와서 pre-render 해야 함. 만약 id가 2로 바뀐다면 id가 2인 글을 불러와서 pre-render 하는 것이 필요
>   - 이러한 예시가 바로 `page 의 path 가 외부 데이터에 의존하는 경우`
>   - 구현하기 위해서는 `getStaticPaths` 를 사용해서 pre-render 되기 원하는 `path 들을 명시`
> ```javascript
>   export const getStaticPaths = async () => {
>     return {
>     paths: [
>       { params: { id: '1' } },
>       { params: { id: '2' } },
>       { params: { id: '3' } },
>     ],
>    fallback: true,
>     };
>   };
>   
>   
> export const getStaticProps = async ({ params }) => {
>   const id = params.id;
>   const res = await axios.get(`https://url/${id}`);
> 
>   return {
>     props: {
>       listData: res.data,
>     },
>   };
> };
> 
> const Detail = ({ listData }) => {
>   <ul>
>     {listData.map((item) => (
>       <li key={item.id}>{item.title}</li>
>     ))}
>   </ul>;
> };
> ```
> 
> 호출 순서 : getStaticPaths -> getStaticProps -> Detail
> - getStaticPaths 에서 리턴값으로 path 에 1,2,3 페이지 번호를 지정
> - getStaticProps 에서 params.id를 읽어서 해당 게시글에 대한 데이터를 가져와서 페이지를 생성
> - getStaticPaths 에서 정적으로 지정했기 때문에 `1,2,3 페이지는 static file 로 생성`

# ISR

- `Incremental Static Regeneration` 의 약자
- 빌드 시점에 페이지를 렌더링 한 후, `설정한 시간 마다 페이지를 새로 렌더링`
  - 즉, ISR 로 구분했지만 사실 `SSG 에 포함되는 개념`이라고 할 수 있다.
- SSG 는 빌드 시에 페이지를 생성하기 때문에 fetching 하는 데이터가 변경되면 다시 빌드해야 하지만, ISR 은 일정 시간마다 알아서 페이지를 업데이트 해준다.

```javascript
export default function ISR20Page({ dateTime }: ISR20PageProps) {
  return (
    <main>
      <TimeSection dateTime={dateTime} />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('https://worldtimeapi.org/api/ip');

  return {
    props: { dateTime: res.data.datetime },
    revalidate: 20,
  };
};
```

- SSG 와 동일하게 `getStaticProps` 라는 함수에서 fetching 할 데이터를 객체 내의 props 라는 key 의 값으로 내보내고,
  - `revalidate` 의 값으로 숫자를 리턴하면 해당 `숫자(초) 마다 페이지가 새로 렌더링` 된다.


#### Next.js의 큰 특징은 `pre-rendering` 방식을 사용하여 서버에서 미리 HTML 문서를 렌더링을 해주는 것
#### SSG와 SSR의 차이는 `SSG는 HTML을 빌드 시에 생성하여 재사용`하고, `SSR은 요청 시마다 생성`하는 것


### 상황마다 적절한 렌더링 방식
: SEO 적용이 크게 중요하지 않거나 데이터 pre-rendering 이 필요없다면 `CSR`
: 매 요청마다 화면이 달라지면서 서버 사이드로 렌더링을 하고자 한다면 `SSR`
: 정적 문서로 충분한 화면이면서 빠른 HTML 문서 반환이 필요하다면 `SSG`
: 컨텐츠가 동적이지만 자주 변경되지 않는 경우 `ISR`












































