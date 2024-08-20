## 1. Next.js란?
넥스트(Next.js)란 리액트로 웹 애플리케이션을 편하게 개발할 수 있도록 도와주는 프레임워크이다. 하이브리드 렌더링 방식(CSR, SSR, SSG등등)을 지원하는 프레임워크라고 생각하면 된다. 이외에도 이미지 최적화 & SEO 최적화를 아주 쉽게해주는 프레임워크다.
### 1-1 우리가 Next.js를 사용하는 이유는?
Next.js를 사용하면 React의 고질적인 문제 몇가지를 해결할 수 있다는 장점이 있다. React에서 문제됐던 초기 렌더링 속도이슈를 해결할 수 있으며 SEO 최적화에서 유리한 점을 가질 수 있다. 자바스크립트 덩어리를 클라이언트로 그대로 전달하여 렌더링하던 리액트의 경우, SEO View Bot이 초기 html을 분석하지 못하기 때문에 검색엔진에 잘 노출되지 않는 이슈가 존재했었는데, 이 문제를 해결 가능하다.

이긴한데, 사실 React로도 위에 문제된 SEO문제를 해결이 가능하긴하다. 이는 아래 링크에서 확인가능.
- https://homebody-coder.tistory.com/entry/React%EC%9D%98-SEO-%EC%B5%9C%EC%A0%81%ED%99%94-%EB%B0%A9%EB%B2%95-React-Helmet-Async-Prerender

또한 React의 초기렌더링이 상대적으로 느리다는 단점 또한 해결이 가능하다. CSR의 경우는, 무거운 자바스크립트 덩어리를 전달해서 이를 심지어 브라우저가 직접 분석하고 해석하여 실행시켜서 화면을 렌더링하는 방식이다. 한마디로 클라이언트에 큰 부담을 주게된다. 하지만 Next.js의 경우는 미리 완성된 html, css, js를 전달하는게 전부이기 때문에 (SSR, SSG, ISR을 사용한다는 가정하에) 속도면에서 비교도 안되게 빠르다. 실제로 lighthouse와 같은 툴로 점수를 측정해보면 엄청난 차이가 난다는걸 체감할 수 있다.
## 2. SSR & SSG & ISR이란?
### SSR
getServerSideProps는 서버에서 실행되는 함수이며 해당 함수가 있다면 무조건 페이지 진입 전에 이 함수를 실행한다. 이 함수는 응답값에 따라 페이지의 루트 컴포넌트에 props를 반환할 수도, 혹은 다른 페이지로 리다이렉트시킬 수도 있다. 이 함수가 있다면 Next.js는 꼭 서버에서 실행해야 하는 페이지로 분류해 빌드 시에도 서버용 자바스크립트 파일을 별도로 만든다.

```tsx
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookieString = context.req ? context.req.headers?.cookie : undefined;

  if (!cookieString) {
    return {
      props: {
        ...(await serverSideTranslations(context.locale as string, ['common', 'privacy', 'terms'])),
        locale: context.locale,
      },
    };
  }

  const cookies = parseCookieString(cookieString);

  if (Object.prototype.hasOwnProperty.call(cookies, 'refresh_token')) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, ['common', 'privacy', 'terms'])),
      locale: context.locale,
    },
  };
};
```
문제는 이 서버사이트 자바스크립트 코드를 작성한 순간, 서버에서는 페이지를 호출하는 매순간마다 서버사이드 함수를 실행하게된다. 즉, 서버부담이 상당해질 수 있기때문에 꼭 필요한 상황이 아니라면 안쓰는게 맞겠다.

추가로 getServerSideProps같은 경우는 마이페이지 & 배송현황같이 정적으로 생성이 불가능하고, 매순간 데이터가 변동될 가능성이 높은 화면에서 적절하다.

### SSG

getStaticProps는 페이지를 호출할 때마다 서버에서 pre-render하는 getServerSideProps는 달리 빌드시점에 pre-rendering을 한다. getStaticProps는 HTML과 JSON 파일을 생성하며, 이 두 파일은 성능을 위해 CDN에 캐싱할 수 있다. 데이터는 공개적으로 캐시될 수 있다(사용자별이 아님). 특정 상황에서는 미들웨어를 사용하여 경로를 다시 작성함으로써 이 조건을 우회할 수 있다.

revalidate는 할당된 숫자만큼의 시간마다 함수를 실행하고 데이터가 바뀌었다면 프리-렌더링 해달라는 뜻이다. 여기서 중요한점. revalidate 타임이 지났다고 하더라도 화면을 주라는 클라이언트의 요청이 없다면 re-generate를 하지않음. 이때 재밌는점은 오래 머물었다가 focus를 해도 똑같다. 오로지 재요청과 revalidate를 넘겼는지 안넘겼는지가 트리거인 셈.

### ISR
ISR(Incremental Static Regeneration)은 SSG와 동일하게 페이지를 미리 만들어 놓는다는 특징이 있다. 하지만 특이하게 특정 규칙에 맞게 여러개의 파일을 미리 생성한다는 점이 다르고 생성해둔 파일들에 대한 경로를 "알맞게" 지정한다는 특징이 있다. 그리고 앞서말한 규칙이 달라진다면 달라진 규칙 하나에 대해서만 빌드를 통해 페이지를 생성한다. 말만 들어선 이해가 잘 안가는 개념일 듯하다. 한번 예시를 보면 이해될거다.

서버에서 Item이라는 리소스가 있다고 치자. 프론트 서버에서 이 리소스에 대해서 ISR을 한다면 axios로 Item을 서버로 부터 가져오고 Item 하나하나에 대한 화면을 만들어준다. (axios로 get해온 리소스로 페이지를 만든다는 규칙) 이때 서버에서 post를 통해 Item 리소스의 요소가 하나 더 추가됐다고 가정해보자. 그럼 프론트에서는 달라진 Item요소 하나를 인지하고 이를 빌드한다.

getStaticPaths를 통해 정적생성할 경로 id들을 제공하며, 제공된 id를 통해 getStaticProps에서 정적생성을 실행한다.


#### fallback
fallback: blocking은 fallback UI없이 GetStaticProps를 먼저 호출하고 404페이지를 띄운다.

fallback: false >> 빌드없이 만들어진 페이지들만 출력

fallback: true >> 없는 경로를 호출했을경우, getStaticProps를 다시한번 수행한다. 또한 router.isFallback을 통해 빌드가 수행중일때 로딩화면을 사용자에게 보려주는게 가능함. 단, 찾지 못했을 경우에는 
```tsx
return {
  notFound: true
}
```
를 getStaticProps에 줘야한다.

빌드타임에 프리랜더링 해야할 화면의 양이 엄청 방대하다면 fallback: true를 주고 최소한의 경로만 정의한채로 경로를 만들게끔 한다.

useRouter를 활용해서 router.isFallback이라는 조건을 통해 로딩상태를 보여줄 수도 있다.(사용자 편의성을 높힐수 있겠네요.)

## 3. Hydration과 dehydrate 과정
서버의 데이터가 클라이언트의 DOM과 결합하는 과정을 빗대어 hydrate라고 정의된듯함.

React는 클라이언트 렌더링만 있어, 유저에게 보여줄 HTML, CSS 그리고 자바스크립트 모두 render() 함수를 이용해 생성하여, 모든 리소스를 한번에 렌더링한다.

반면, Next.js는 서버에서 보여줄 HTML 컨텐츠를 미리 렌더링(내용을 채워서)하여 가져오기 때문에 render() 함수로 HTML 뼈대만 렌더하고, hydrate()를 통해 서버에서 받아온 HTML에 유저가 상호작용할 수 있는 이벤트 리스너(JS파일)을 연결하는 것이다.

HTML에 JS파일을 주입한다고 해서 hydrate라고 이해하면 될 듯.

Next.js가 Hydration하기까지의 과정
1. 서버에서 전달된 HTML 수신
2. 클라이언트 측 렌더링 (render())
3. 클라이언트는 수신된 HTML을 우선 렌더링하고, 인터렉션을 위한 JS파일을 로드한다.
4. hydrate() 호출
5. 전달된 HTML에 이벤트 핸들러를 연결
6. 클라이언트 측 렌더링 완료
7. hydrate 과정이 완료되면 클라이언트에서 페이지의 렌더링과 인터렉션을 관리할 수 있게 된다.

## 4. pages/api 폴더의 이해
/pages 하단에 api라고 작성된 디렉터리가 보이는데 이는 이름에서 예상할 수 있는 것처럼 서버의 API를 정의하는 폴더다. 기본적인 디렉터리에 따른 라우팅 구조는 페이지와 동일하되, /pages/api가 /api라는 접두사가 붙는다는 점만 다르다. 즉, /pages/api/hello.ts는 /api/hello로 호출할 수 있으며, 이 주소는 다른 pages 파일과 다르게 HTML 요청을 하는 게 아니라 단순히 서버 요청을 주고받게 된다.

페이지와 마찬가지로 default export로 내보낸 함수가 실행된다. Express나 Koa와 같은 Node.js 기반 서버 프레임워크를 사용해 본 경험이 있다면 쉽게 사용할 수 있을 것이다. 여기에 있는 코드는 당연히 오직 서버에서만 실행된다. window나 document 등 브라우저에서만 접근할 수 있는 코드를 작성하면 당연히 문제가 발생한다.

일반적인 FE 프로젝트를 만든다면 /api를 작성할 일이 거의 없겠지만, 서버에서 내려주는 데이터를 조합해 BFF(backend-for-frontend) 형태로 활용하거나, 완전한 풀스택 애플리케이션을 구축하고 싶을때, 혹은 CORS(Cross-Origin Resource Sharing) 문제를 우회하기 위해 사용될 수 있다.

## 5. React-Query와 Next.js의 조합
React Query는 Next.js의 서버에서 여러 쿼리를 미리 가져온 다음 해당 쿼리를 queryClient로 dehydration하는 것을 지원한다. 즉, 서버는 페이지 로드 시 즉시 사용할 수 있는 마크업을 사전 렌더링할 수 있으며, JS를 사용할 수 있게 되자마자 React Query는 라이브러리의 전체 기능으로 해당 쿼리를 업그레이드하거나 hydrate할 수 있다. 여기에는 해당 쿼리가 서버에서 렌더링된 이후 오래된 경우 클라이언트에서 해당 쿼리를 다시 가져오는 것이 포함된다.

서버에서 캐싱 쿼리를 지원하고 hydration을 설정하려면 아래 과정을 거친다.

앱 내부와 인스턴스 참조(또는 리액트 상태에서)에서 새 QueryClient 인스턴스를 만든다. 이렇게 하면 여러 사용자와 요청간에 데이터가 공유되지 않고 컴포넌트 생명주기 한번만 QueryClient를 생성할 수 있다.
<QueryClientProvider> 로 앱 컴포넌트를 래핑하고 클라이언트 인스턴스에 전달한다.
앱 컴포넌트를 <HydrationBoundary> 로 래핑하고 pageProps 의 dehydratedState prop에 전달한다.

getStaticProps 또는 getServerSideProps를 사용하여 페이지의 일부 데이터를 미리 가져올 준비가 되었다. React Query의 관점에서 이들은 동일한 방식으로 통합된다. getStaticProps 는 아래와 같다.

각 페이지 요청에 대해 새 QueryClient 인스턴스를 만든다. 이렇게 하면 사용자와 요청 간에 데이터가 공유되지 않는다.
클라이언트 prefetchQuery 메서드를 사용하여 데이터를 미리 가져오고 완료될 때까지 기다린다.
쿼리 캐시를 dehydrate하고 dehydratedState prop을 통해 페이지에 전달하려면 dehydrate를 사용. 이는 _app.js 에서 캐시를 선택하는 것과 동일한 prop이다. 마지막으로 QueryClient를 비워주는 과정도 잊지말고 하자. (clear())

## 6. Image 컴포넌트란?
이미지 컴포넌트는 Next.js에서 제공하는 이미지 최적화 컴포넌트이다. 대표적으로 아래와 같은 특징을 지니고있다.

1. 이미지 크기를 알아서 최적화 해줌. (srcset & sizes)
2. lazy 로딩을 지원해서 페이지 로딩 속도도 최적화 해줌. (next.js에는 loading 속성이 적용되어있음, <img loading='lazy'>)
3. 이미지 리사이징을 하고 이 정보들을 Next.js 서버에서 캐싱할 수 있음. 
4. 자체적으로 파일형식 변경이 가능함. jpg >> webp.
5. 라이브러리를 잘만 활용한다면 placeholder "blur"처리가 가능하다.

이미지 컴포넌트는 기본적으로 크기에 대한 정의가 필요하다. width, height에 값을 정의해야한다. 이때, 값을 정의하지않고 부모 요소의 크기에 맞게 이미지가 맞춰들어갈 수 있도록 만들 수 있다. 그때에는 fill을 활성화시켜주면 되고, 대신 부모 요소에는 position: relative를 걸어줘야한다.

기본적으로는 이미지 컴포넌트를 사용시 이미지 정보를 캐싱하지만, 만약 Next.js에서의 리사이징 및 캐싱을 활용하기 싫다면 next.config.js를 아래와 같이 수정해주면 된다.
```javascript
const config = {
  loader: 'custom',
  loaderFile: '커스텀 로더 파일위치'
}
``` 

단, 위와같이 loaderFile을 작성할 경우에는 이미지 리사이징을 AWS 람다등을 통해서 진행해야겠다!
## 7. React Hydration Error란?
Hydration Error는 Next.js의 SSR 특성 때문에 생기는 오류이다. Next.js의 SSR 특성은 정적 HTML 파일을 먼저 서버에서 가지고 와서 브라우저에서 js파일로 다시 랜더링해주는 특성이다. 이 특성으로 인하여 사용자는 더 빠르게 화면을 볼 수 있다. Hydration error는 SSR에서 생기는 부작용인데 SSR또는 SSG에 의하여 pre-render되는 React tree와 브라우저에서 render되는 React tree가 달라서 발생하는 문제이다.
SSR에서 render되는 것을 Hydration이라고 하기 때문에 Hydration Error라고 한다.

### 보통 언제생기나?
1. 좋아요와 같이 색상이 달라지는 컴포넌트들에서 발생함.
2. 모바일화면 PC화면을 분기하는 과정에서 발생함.

### 해결방안?
1. 컴포넌트를 그냥 DynamicRender를 통해 CSR로 렌더링 되도록 만들어버린다.
2. useEffect와 같이 클라이언트에서 실행되는 훅들을 활용해서 CSR로 만들어버린다.

- https://nextjs.org/docs/messages/react-hydration-error

## 8. next.config.js파일의 이해(중요하다고 생각되는 옵션들 알아오기)
- swcMinify: swc를 이용해 코드를 압축할지를 나타낸다. 기본값은 true이지만 실험적인 기능이라 걱정이 된다면 false를 설정해서 꺼도 된다. 참고로 Next.js 13 버전부터 기본값이 true로 변경됐다. 즉, 별도 설정이 없다면 swc를 활용해 코드를 압축한다.

- reactStrictMode: 리액트에서 제공하는 엄격 모드를 설정할지 여부를 나타낸다. 기본값은 false이지만 true로 설정해 다가올 리액트 업데이트에 미리 대비하는 것을 추천한다.

- rewrites: 요청 경로를 다른 목적지 경로로 매핑할 수 있게 해준다. Rewrites 는 URL 프록시처럼 동작하고 목적지 경로를 마스킹하여 사이트에서 위치가 변화하지 않은 것으로 보이게 한다. 반대로, Redirect 는 새로운 페이지로 이동하고 URL 의 변화를 그대로 보여준다.

- redirect: Redirect 기능은 A 라는 페이지에 방문하면 자동으로 B 라는 페이지로 이동시켜주는 기능을 말한다.

- images: 이미지 컴포넌트에 대한 설정 및 커스텀을 위한 옵션이다. srcset에 정의될 크기정보들과 허용할 src url정보등을 정의할 수 있다.
