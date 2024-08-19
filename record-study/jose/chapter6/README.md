# 챕터 6. 현업에서 활용중인 기술들
## SEO 최적화 & sitemap
SEO란 'Search Engine Optimization'의 약자로 Search Engine, 즉 구글과 같은 검색엔진에 친화적인 사이트를 구축하여 광고가 아닌 자연 검색 결과를 통해 트래픽의 양과 질을 극대화하는 작업을 의미

### Meta 태그

Meta태그란 웹페이지가 담고있는 컨텐츠가 아닌 웹페이지 자체의 정보를 명시하기 위한 목적으로 사용되는 HTML태그를 말한다. SEO에 가장 영향을 많이 미치는 태그영역이다.

검색엔진 봇은 이러한 메타태그를 수집하여 사용자에게 필요한 정보를 제공한다.

SEO최적화는 다른 검색포털에서 정보를 가져가기 쉽게 최적화하는 작업을 말한다.


#### Meta 태그 Name들

- `application-name`: 웹 페이지에서 구동 중인 애플리케이션의 이름.
    
    단순한 웹 페이지에서는 지정하지 말아야한다.
    
- `author`: 문서 저작자.
- `description`: 페이지에 대한 짧고 정확한 요약.
    
    Firefox, Opera 등 여러 브라우저는 즐겨찾기 페이지의 기본 설명 값으로 description 메타데이터를 사용한다.
    
- `generator`: 페이지를 생성한 소프트웨어의 식별자.
- `keywords`: 페이지의 콘텐츠와 관련된, 쉼표로 구분한 키워드 목록.
- `referrer`: 문서에서 시작하는 요청의 HTTP Referer 헤더를 통제한다.

#### 구글봇의 동작원리
1. 크롤링
sitemap에 제공된 링크를 기반으로 크롤링을 함.
> 저도 처음 알았는데 크롤링에서 제외되도록 하는 방법은 아래와 같이 meta태그에 작성해주면 된다고하네요.
```html
<!-- 모든 크롤러에 대해 크롤링을 차단 -->
<meta name="robots" content="noindex">

<!-- 구글봇에 대해 크롤링을 차단 -->
<meta name="googlebot" content="noindex">
```
2. 렌더링
구글봇은 헤드리스 크로미움 기반으로 자바스크립트를 실행하고 렌더링을 진행한다.

렌더링을 하여 HTML 문서를 완성해야 정확한 페이지 정보를 파악할 수 있음

> 여기서 몇몇 자바스크립트 코드가 실행이 안되기 때문에 구글봇이 제대로 화면을 분석하지 못할 가능성이 크다고합니다.

3. 인덱싱
페이지가 어떤 페이지인지 파악하고, 검색 결과로 노출될 수 있도록 페이지 정보를 저장하는 것이다.

Meta 태그, Title, HTML 콘텐츠, 이미지, 비디오 등의 페이지 정보를 분석하여 페이지를 파악한다.

구글 데이터베이스에 페이지 정보를 저장한다.

4. 검색결과 게재

검색어에 대한 가장 높은 품질의 결과를 반환한다.

사용자의 위치, 언어, 기기, 이전 검색어 등을 고려한다.


#### 그럼 SEO는 어떻게 해야하는걸까?
1. 적절한 태그들을 잘 사용하자.
- 간혹가다 div로만 모든 화면을 구성하는 경우가 있는데, 이경우 구글봇이 제대로 화면을 분석하지 못하는 경우가 존재한다. <h1>, <article>, <span>과 같은 태그들을 적절하게 사용하도록 하자.
- 그렇다고 이상하게 태그를 사용해서도 안된다. 예를들어 그냥 버튼에 불과한데 h1태그로 구성해버리면 구글봇은 그 버튼이 핵심적인 문구라고 생각해버려서 검색엔진 노출시에 상위에 노출을 시킬 수 있기 때문.

2. 메타태그들을 잘 작성하자.
- keywords와 description은 검색엔진 노출에 큰 영향을 주는 태그이다. 반드시 꼼꼼하게 작성하자.

3. 풍부한 컨텐츠를 구성하자.
- 결국 내용이 많아야한다. 중복된 글자가 아니라 html 태그내에 글자가 풍부하게 많아야 한다.


#### 오픈그래프

브라우저나 검색로봇에게 해당 페이지의 정보를 알려주는 메타태그. (검색엔진최적화(SEO)에 직접적인 영향을 미치지는 않음)

미리보기를 통해 보는 제목, 설명, 이미지는 HTML 문서의 head에 표기된 오픈그래프 프로토콜에 의해서 나타난다. (카카오톡 미리보기와 같은걸 쓸때 사용되는 태그입니다.)

- 동작순서
  1. 사용자가 링크를 입력창에 입력
  2. 페이스북, 네이버 블로그, 카카오톡은 입력창의 문자열이 "링크"라는 것을 파악
  3. 링크라는 것이 파악되면 **`크롤러`는 미리 그 웹사이트를 방문**해서 HTML head의 `오픈그래프(Open Graph)` 메타 데이터를 긁어온다.
  4. 이중에서도 `og:title`, `og:description`, `og:image`가 각각 제목, 설명, 이미지의 정보를 나타낸다.
  5. 그 정보를 바탕으로 미리보기 화면을 생성


### Sitemap


#### Robot.txt
Robots.txt는 검색의 크롤링 로봇이 웹에 접근할 때 로봇이 지켜야하는 규칙과 사이트맵(sitemap.xml) 파일의 위치를 알려주는 역할을 하는 파일이다. 실제로 robots.txt에 기록된 내용을 통해서 웹 사이트의 디렉토리 별로 크롤링을 할 수 있는 지 할 수 없는 지를 지정할 수 있는데 만약 이 파일에 아무런 내용도 지정하지 않으면 검색엔진의 크롤링 로봇들은 웹사이트에서 확인할 수 있는 모든 콘텐츠를 색인하고 검색 결과에 노출 시킨다.
> 참고로 저희 프로젝트에 public폴더내에 확인가능합니다!

#### sitemap

크롤러가 웹사이트를 방문하여 웹사이트 내의 여러 페이지들과 정보에 대해서 수집을 하게 되는데,

이때 도움을 주는 것이 바로 '사이트맵'이다. 사이트맵 (Sitemap)은 웹사이트의 구조를 크롤러가 찾기 쉽도록 정리한 XML 형식의 파일이다. 특정 페이지들이 접근한 페이지와 연관이 있는 페이지다!라는걸 알려주는거라고 보면된다.

작성은 아래와 같이 작성한다.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap><loc>https://wala-land.com/sitemap-0.xml</loc></sitemap>
<sitemap><loc>https://wala-land.com/sitemap-1.xml</loc></sitemap>
<sitemap><loc>https://wala-land.com/sitemap-2.xml</loc></sitemap>
<sitemap><loc>https://wala-land.com/sitemap-3.xml</loc></sitemap>
<sitemap><loc>https://wala-land.com/sitemap-4.xml</loc></sitemap>
</sitemapindex>
```
- 주의사항
  - 큰 사이트 맵은 작은 사이트 맵으로 분할하여 제출한다. 이 때 최대 사이트 맵 크기는 URL 50,000개 / 압축되지 않은 경우 사이즈는 50MB까지다.
  - 여러개의 분할된 사이트 맵을 제출할 때에는 개별 사이트 맵을 제출 하는 대신 사이트 맵 색인 파일을 사용하여  모든 개별 사이트 맵을 나열한 사이트 맵을 같이 제출 하는 것이 좋다.

## 다국어 처리
점점 늘어가는 글로벌 서비스들에 대응하기 위해 다국어 처리를 하는건 중요하다.
> 개인적으로 추천하는건 개발 시작전에 다국어 처리를 해야하는지 안해야하는지를 확실하게 결정짓고 하는겁니다,,,,, 이게 진짜 다국어 처리 안하는줄 알고 개발했다가 낭패본적이 있었는데 수정할때 진짜 울면서 개발했어서요ㅜㅜㅜㅜㅜ 따라서 프로젝트 시작을 할때 절대로 배제하지말고 이를 확실하게 결정짓고 가시길 바라고, 기획자가 확답을 안주면 그냥 다국어 처리를 하면서 개발하는게 속편하겠습니다...
  ### 2-1. 리액트에서 다국어 처리를 하는법
  먼저 다음과 같이 라이브러리를 설치해주자. 각각 리액트 다국어 처리 & 기본적인 다국어 처리를 위한 라이브러리 & 브라우저의 언어감지를 위해 필요하다.
  ```shell
    npm install react-i18next i18next i18next-browser-languagedetector
  ```
  ```tsx
  import i18n from 'i18next';
  import LanguageDetector from 'i18next-browser-languagedetector'; // 언어 감지(언어 변경 부분)
  import { initReactI18next } from 'react-i18next'; //react와 i18next를 통합
  import KR from './kr.json' //다국어 정보들은 json으로 관리.
  import EN from './en.json'
  const resource = {
      "ko": {
          translation: KR
      },
      "en": {
          translation: EN
      }
  }
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: resource,
        fallbackLng: "en", // 기본감지 언어 en
        // debug: true,
        interpolation: {
            escapeValue: false // 특수문자를 이스케이프(escape)하지 않도록 하는 옵션
        },
        // react: {
        //     bindI18n: '', // prevent react-i18next rerender
        // },
    })
  export default i18n
  ```
  그다음 이를 main.tsx 혹은 App.tsx와 같은 최상단 파일에 임포트해주자.
  ```tsx
  import './i18n';
  ```
  ### 2-2. Next.js에서 다국어 처리를 하는법
  ```shell
  npm install --save next-i18next
  ```
  그다음 아래와 같이 폴더를 생성해주자.
  └── public
    └── locales
        ├── ko
        |   └── common.json
        └── en
            └── common.json
  > 이때 주의할점!! common.json하나에 모든 다국어 정보를 다 넣는건 상당히 위험합니다. 그럼 서버에서 페이지를 클라이언트에 전달할때 저 무거운 common.json을 그대로 전달하기 때문에 불필요한 문자열들까지 전달되기 때문이죠. 따라서 이를 분리해서 product.json, contents.json과 같은 형태로 관리하는게 중요하겠네요.

  아래와 같이 App을 감싸주자.
  ```typescript
  export default appWithTranslation(App);
  ```

  그리고 아래처럼 next-i18next.config.js파일을 구성해주자.
  > 주의할점!! 어지간하면 아래 포멧 그대로 작성해주세요. 안그러면 다국어로 영어나 독일어로 설정했을때 새로고침을 하면 다국어가 풀리는 기이한 현상이 발생하더라구요? 
  ```typescript
  module.exports = {
    i18n: {
      locales: ['ko', 'en'],
      defaultLocale: 'ko',
      localeDetection: true,
    },
  };
  ```
  이제 마지막으로 getStaticProps에 아래와 같이 다국어 정보를 전달해주면 된다.
  ```typescript
  export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(context.locale as string, ['common'])),
      },
    };
  };
  ```

## 보안
### 리액트에서 발생하는 크로스 사이트 스크립팅(XSS)

XSS란 웹사이트 개발자가 아닌 제3자가 웹사이트에 악성 스크립트를 삽입해 실행할 수 있는 취약점을 의미한다.

#### dangerouslySetInnerHTML prop

이름에서 알 수 있듯이 특정 브라우저 DOM의 innerHTML을 특정한 내용으로 교체할 수 있는 방법이다.

```jsx
function App() {
	return <div dangerouslySetInnerHTML={{ __html: 'First &middot; Second' }} />
}
```

dangerouslySetInnerHTML의 위험성은 인수로 받는 문자열에 제한이 없다는데에 있다.

```jsx
const html = `<span><svg/onload=alert(origin)></span>`;

function App() {
	return <div dangerouslySetInnerHTML={{ __html: html }} />
}
```

alert가 실행 될것이며 넘겨주는 문자열 값은 한번 더 검증이 필요하다.

#### useRef를 활용한 직접 삽입

useRef를 통해 직접 DOM에 접근해서 innerHTML로 삽입하면 동일한 문제가 발생한다.

```jsx
const html = `<span><svg/onload=alert(origin)></span>`;

function App() {
	const divRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (divRef.current) {
			divRef.current.innerHTML = html
		}
	})
	
	return <div ref={divRef} />
}
```

위 코드 또한 alert이 나타나게 된다.

### 리액트에서 XSS 문제를 피하는 방법

가장 확실한 방법은 제3자가 삽입할 수 있는 HTML을 안전한 HTML 코드로 한 번 치환하는 것이다. 이러한 과정을 새니타이즈(sanitize) 또는 이스케이프(escape)라고 하는데, 라이브러리를 사용하는 것이 좋다.

- [DOMpurify](https://github.com/cure53/DOMPurify)
- [sanitize-html](https://github.com/apostrophecms/sanitize-html)
  ```js
  const clean = sanitizeHtml(dirty, {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
    allowedAttributes: {
      'a': [ 'href' ]
    },
    allowedIframeHostnames: ['www.youtube.com']
  });
  ```

- [js-xss](https://github.com/leizongmin/js-xss)

💡 리액트의 JSX 데이터 바인딩

```jsx
const html = `<span><svg/onload=alert(origin)></span>`;

function App() {
	return <div>{html}</div>
}
```

리액트는 기본적으로 XSS를 방어하기 위해 이스케이프 작업이 존재한다.

위의 코드를 실행하면 alert이 실행되지 않는다. 따라서 원본값을 그대로 실행하기 위해 별도의 함수인 dangerouslySetInnerHTML가 존재하는 것이다.

> 재밌는건 HTML을 직접 삽입하는 역할을 제일많이 수행하는 에디터 라이브러리들도 기본적으로 이런 이스케이프 작업들을 하는듯 하더라구요...? Quill 라이브러리는 특정 태그들의 작성이 안됐음.
> 관리자단에서 에디터를 직접 만들어야하는 상황에서는 이스케이프 라이브러리들이 유용하겠다는 생각이 들었네요.

### getServerSideProps와 서버 컴포넌트를 주의하자.

서버 사이드 렌더링과 서버 컴포넌트는 성능 이점을 가져다 줌과 동시에 서버라는 개발 환경을 프런트엔드 개발자에게 쥐어준 셈이 됐다. 즉, 브라우저에 정보를 내려줄 때는 조심해야 한다.

```jsx
export default function App({ cookie }: { cookie: string }) {
	if (!validateCookie(cookie)) {
		Router.replace()
		return null
	}
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const cookie = ctx.req.headers.cookie || ''

	return {
		props: {
			cookie,
		}
	}
}

```

이 코드는 쿠키를 가져온 다음에 클라이언트에서 유효성에 따라 작업을 처리하는 코드이다. 정상적으로 동작하겠지만 보안 관점에서는 좋지 못하다. 

props 값은 모두 사용자의 HTML에 기록되고 전역 변수로 등록되어 스크립트로 충분히 접근할 수 있는 보안 위협에 노출되는 값이 된다. 또 리다이렉트도 클라이언트에서 처리해 성능에 좋지 못하다.

```jsx

export default function App({ token }: { token: string }) {
  React.useEffect(() => {
    const user = JSON.parse(window.atob(token.split('.')[1]));
    const user_id = user.id;
  }, []);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const cookie = ctx.req.headers.cookie || '';
	
	const token = validateCookie(cookie);

	if (!token) {
		return {
			redirect: {
				destination: '/404',
				permanet: false,
			}
		}
	};
	return {
		props: {
			token,
		}
	};
}
```

필요한 토큰만 제한적으로 변환했고, 리다이렉트 또한 서버에서 처리했다.

### a 태그의 값에 적절한 제한을 둬야 한다.

href에 javascript::로 시작하는 코드를 넣어 onClick 이벤트와 같이 별도 이벤트 핸들러만 작동시키기 위한 용도로 사용할 때가 있다.

```jsx
function App() {
	function handleClick() {
		console.log('hello');
	}
	
	return (
    <a href="javascript:;" onClick={handleClick}>
      링크
    </a>
	)
}
```

이렇게 하면 onClick만 실행되는데 페이지 이동이 없이 핸들러만 작동시키고 싶다면 button 태그를 사용하는 것이 기본적으로 좋다.

왜냐하면 href가 작동하지 않은 것이 아니라 javascritp:;만 실행된 것이다. 즉 href내에 다른 자바스크립트 코드가 존재한다면 이를 실행한다는 뜻이다.

### HTTP 보안 헤더 설정하기

보안 헤더란 브라우저가 렌더링하는 내용과 관련된 보안 취약점을 미연에 방지하기 위해 브라우저와 함께 작동하는 헤더를 말한다.

#### Strict-Transport-Security

Strict-Transport-Security 응답 헤더는 모드 사이트가 HTTPS를 통해 접근해야 하며, 만약 HTTP로 접근하는 경우 이러한 모든 시도는 HTTPS로 변경되게 한다.

`Strict-Transport-Security: max-age=<expire-time>; includeSubDomains`

#### X-XSS-Protection

이는 비표준 기술로, 구형 브라우저와 사파리에서만 제공되는 기능이다.

XSS 취약점이 발견되면 페이지 로딩을 중단하는 헤더다. 이 헤더를 전적으로 믿어서는 안되며, 반드시 페이지 내부에서 XSS에 대한 처리가 존재하는 것이 좋다.

#### X-Frame-Options

페이지를 frame, iframe, embed, object 내부에서 렌더링을 허용할지를 나타낼 수 있다.

```jsx
X-Frame-Options: DENY // 만약 위와 같은 프레임 관련 코드가 있다면 무조건 막는다.
X-Frame-Options: SAMEORIGIN // 같은 origin에 대해서만 프레임을 허용한다.
```

#### Permissions-Policy

웹사이트에서 사용할 수 있는 기능과 사용할 수 없는 기능을 명시적으로 선언하는 헤더다.

다양한 브러우저의 기능이나 API(GPS 등)를 선택적으로 활성화하거나 필요에 따라서는 비활성화 할 수 있다.

```jsx
// 모든 geolocation 사용을 막는다.
Permissions-Policy: geolocation=()

// geolocation을 페이지 자신과 몇 가지 페이지에 대해서만 허용한다.
Permissions-Policy: geolocation=(self "https://a.yceffort.kr" "https://b.ycefforct.kr")

// 카메라는 모든 곳에서 허용한다.
Permissions-Policy: camera=*;

// pip 기능을 막고, geolocation은 자신과 특정 페이지만 허용하며, 카메라는 모든 곳에서 허용한다.
Permissions-Policy: picture-in-picture:(), geolocation=(self "https://a.yceffort.kr" "https://b.ycefforct.kr"), camera=*;

```

#### X-Content-Type-Options

MIME을 먼저 알아야하는데, MIME(Multipurpose Internet Mail Extensions)는 Content-type의 값으로 사용된다. 원래는 메일을 전송할 때 사용하던 인코딩 방식으로, 현재는 Content-type에서 대표적으로 사용되고 있다.

X-Content-Type-Options 란 Content-type 헤더에서 제공하는 MIME 유형이 브라우저에 의해 임의로 변경되지 않게 하는 헤더이다. 즉, Content-type: text/css 헤더가 없는 파일은 브라우저가 임의로 CSS로 사용할 수 없다. **웹서버가 브라우저에 강제로 이 파일을 읽는 방식을 지정하는 것**이 바로 이 헤더다.

#### Referrer-Policy

Referer라는 헤더는 현재 요청을 보낸 페이지의 주소가 나타난다. 만약 링크를 통해 들어왔다면 해당 링크를 포함하고 있는 페이지 주소가 다른 도메인에 요청을 보낸다면 해당 리소스를 사용하는 페이지 주소가 포함된다.

(참고로 Referer과 Referrer-Policy의 철자가 다른 이유는 Referer라는 오타가 이미 표준으로 등록된 이후에 뒤늦게 오타임을 발견했기 때문)

### 취약점이 있는 패키지의 사용을 피하자

package.json에 어떤 패키지가 있는지 정도는 파악할 수 있지만 package-lock.json의 모든 의존성을 파악하는 것은 사실상 불가능에 가깝다.

- Next.js: 12.0.0 ~ 12.0.4 와 11.1.0 ~ 11.1.2 버전 사이에 URL을 잘못 처리하는 버그가 있어 서브 가동이 중지될 수 있는 버그가 있었다.
- React: 초기버전인 0.0.1 ~ 0.14.0 버전 사이에 XSS 취약점이 있었다.
- react-dom: 16.{0,1,2,3,4}.{0,1} 버전의 react-dom/server에 XSS 취약점이 있었다.

## 웹 성능분석 방법 
### 4-1. Lighthouse란? 
리액트 내에서 코드를 수정해야 한다는 단점이 있는 `reportWebVitals` 인 반면에 구글 라이트하우스를 사용할 경우에는 별도의 수정이나 변경이 필요없이도 측정이 가능하다.

#### 탐색 모드

페이지에 접속했을 때부터 페이지 로딩이 완료될 때까지의 성능을 측정하는 모드다. 이 모드로 측정을 시작하면 페이지를 처음부터 다시 불러와서 페이지 로딩으 끝날 때까지 각각의 지표를 수집한다.

#### 성능

웹페이지의 성능과 관련된 지표를 확인할 수 있는 영역

- **Time to Interactive:** 페이지에서 사용자가 완전히 상호작용할 수 있을때까지 걸리는 시간을 측정
  - 최초 콘텐츠풀 페인트로 측정되는 페이지 내 콘텐츠가 표시되는 시점
  - 보여지는 페이지 요소의 대부분에 이벤트 핸들러가 부착되는 시점
  - 페이지가 유저의 상호작용에 50ms 내로 응답하는 시점
- **Speed Index:** 페이지가 로드되는 동안 콘텐츠가 얼마나 빨리 시각적으로 표시되는지를 계산
- **Total Blocking Time:** 메인 스레드에서 특정 시간 이상 실행되는 작업, 즉 긴 작업이 수행될 때마다 메인 스레드가 차단된 것으로 간주한다.

#### 접근성

장애인 및 고령자 등 신체적으로 불편한 사람들이 일반적인 사용자와 동등하게 웹페이지를 이용할 수 있도록 보장하는 것을 말한다.

#### 권장사항

권장사항에는 보안, 표준 모드, 최신 라이브러리, 소스 맵 등 다양한 요소들이 포함돼 있다.

- CSP가 XSS공격에 효과적인지 확인: Content Security Policy로 웹 사이트에서 호출할 수 있는 컨텐츠를 제한하는 정책을 말한다.
- 감지된 JavaScript 라이브러리: 페이지에서 감지되는 자바스크립트 라이브러리를 말한다.
- HTTPS 사용
- 페이지 로드 시 위치정보 권한 요청 방지하기: 사용자의 동의 없이 페이지 로드 시 사용자의 물리적 위치를 알 수 있는 메서드인 `navigator.geolocation.getCurrentPosition()`, `navigator.geolocation.watchPosition()`을 실행하는지 확인한다.
- 페이지 로드 시 알림 권한 요청 방지하기
- 알려진 보안 취약점이 있는 프런트엔드 자바스크립트 라이브러리를 사용하지 않음
- 사용자가 비밀번호 입력란에 붙여넣을 수 있도록 허용
- 이미지를 올바른 가로세로 비율로 표시
- 이미지가 적절한 해상도로 제공됨
- 페이지에 HTML Doctype 있음
- 문자 집합을 제대로 정의함: 서버가 HTML 파일을 전송할 때 문자가 어떻게 인코딩돼 있는지 지정하지 않으면 브라우저는 각 바이트가 나타내는 문자를 알 수 없게 된다. 따라서 적절하게 charset을 지정해야 한다.
- 지원 중단 API 사용하지 않기
- 콘솔에 로그된 브라우저 오류 없음
- Chrome Devtools의 Issue 패널에 문제 없음
- 페이지에 유효한 소스 맵이 있음
- font-display

#### 검색 엔진 최적화

웹페이지가 구글과 같은 검색엔진이 쉽게 웹페이지 정보를 가져가서 공개할 수 있도록 최적화되어 있는지를 확인하는 것을 의미한다.

#### 기간 모드

기간 모드는 실제 웹페이지를 탐색하는 동안 지표를 측정하는 것이다. 기간 모드에서 볼 수 없었던 흔적과 트리맵이 기간모드에는 있다.

- 흔적(View Trace)
  - 웹 성능을 추적한 기간을 성능 탭에서 보여준다. 상세하게 시간의 흐름에 따라 어떻게 웹페이지가 로딩됐는지를 보여준다.

- 트리맵
    - 페이지를 불러올 때 함께 로딩한 모든 리소스를 함께 모아서 볼 수 있는 곳이다. 웹페이지 전체 자바스크립트 리소스 중 어떠한 파일이 전체 데이터 로딩 중 어느정도를 차지했는지 비율로 확인할 수 있으며, 실제 불러온 데이터의 크기를 확인할 수도 있다.

#### 스냅샷

스냅샷 모드는 탐색모드와 매우 유사하지만 현재 페이지 상태를 기준으로 분석한다는 점이 다르다. 현재 상태에서 검색엔진의 최적화, 접근성, 성능 등을 분석할 수 있다.

### 4-2. 크롬 브라우저 개발자 도구
#### 성능을 기록하는 방법
1. Chrome 브라우저를 연다.
2. 분석하려는 웹 페이지를 로드한다.
3. 개발자 도구를 연다.
4. 개발자 도구의 Performance 탭을 클릭한다.
5. Performance 탭에서 기록 버튼(원 아이콘)을 클릭하거나 Crtl+E (Windows/Linux) 또는 Cmd+E (Mac) 를 누른다.
6. 분석하려는 작업(성능 문제를 일으킬 것 같은 시나리오)을 수행한 다음 중지 버튼을 클릭하여 기록을 중지한다.
7. 기록이 완료되면 Chrome DevTools가 웹 페이지 성능에 대한 자세한 보고서를 표시한다.

그럼 성능분석_이미지와 같은 화면이 출력된다. 이를 천천히 살펴보자.

#### CPU Utilization & FilmStrip

상단의 CPU 타임라인에선 Critical Rendering Path(Javascript, style, layout, paint, composite)와 API 호출 등을 보여줍니다. 주로 JavaScript(노란색) 및 레이아웃 작업과 같은 다양한 유형의 작업으로 인해 CPU가 얼마나 활동하는지 확인하는데에 사용된다. CPU 활동은 처음 활동을 시작한 후 상당히 조용해지는걸 볼수있다.

중앙의 FilmStrip은 왼쪽부터 시간순으로 나열되며 프레임 스크린샷을 통해 각 순간의 사이트가 어떤 모습 인지 볼 수 있다. 이러한 애플리케이션의 시각적 상태는 "screenshot" 옵션을 체크했을 때만 보여진다. FilmStrip 위로 마우스를 가져가면 해당 시점의 스크린샷을 크게 볼 수 있다.

#### Memory
하단 부분은 애플리케이션의 메모리 추세를 보여준다. 실제로 확인해보면 메모리가 증가하고 잠시 후 감소 하는 것을 볼 수 있습니다. 일반적으로 가비지 컬렉션 프로세스가 발생할 때까진 메모리가 증가한다.

DOM 노드, 리스너 및 기타 메트릭이 이 차트에 요약되어 있다. 색상별로 노드, 리스너 등을 구분할 수 있고 이 부분에서 앱의 추세를 볼 수 있으며 주로 메모리 누수를 추적할 때 유용하게 사용할 수 있다.

#### Bottom-Up
Bottom-Up 탭에서는 CPU 활동에 대한 세분화된 분석을 볼 수 있다.

#### Call Tree
Call Tree 탭은 기록하는 동안 실행된 JS 함수의 계층적 표현입니다. 호출 트리는 가장 시간이 많이 걸리 는 기능을 식별하는 데 도움이 된다.


## 디자인 시스템이란?
디자인 시스템은 '서비스의 목적에 맞도록 일관되게 구성한 일련의 패턴과 공유된 규칙 언어'라고 한다. 사람들이 디자인을 시작할 때 공통으로 사용하는 컬러, 폰트, 레이아웃, UI 구성 요소 등 일관된 집합을 두고 이를 어떻게 구성하는지 체계가 이루어져야 디자인 시스템이라고 할 수 있다.

### 디자인 시스템 예시
- https://www.figma.com/design/rQJKj4oYN9ohanoTIlWFh0/%5B1_%EC%B5%9C%EC%A2%85%5D-%EB%8C%84%EB%B2%84%EC%8A%A4?node-id=135-1191&t=jLW7ehbSbhWRLzGs-0
- https://www.figma.com/design/rCbAJX4i99cofVLViMkmJT/%EC%A7%80%ED%95%98%EC%B2%A0-APP-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=450-10794&t=2CpQOaAaJi9CoEms-0

### 왜 디자인 시스템을 만들까?
- 디자인 시스템은 공통의 언어, 시각적 일관성을 만들어 반복되는 작업을 줄인다.
- 제품을 만드는 초기에는 기업마다 만든 디자인 규칙이 잘 이행되지만, 시간이 지나면 규칙을 지키지 않는 경우가 많아진다.
- 그래서 각 기업들은 일종의 디자인 시스템 가이드를 만들고. 이 디자인 시스템 가이드를 활용하면 혼란을 방지하고 효율적인 작업이 가능해진다.

### 아토믹 디자인 시스템
- https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system

### 디자인 토큰이란?

디자인 토큰은 색상, 애니메이션, 간격, 글꼴 등과 같은 것을 설명하는 디자인 변수를 저장하는 데 사용하는 요소이다. 디자인 토큰은 디자인 시스템의 시각적 디자인 요소로 구체적으로 시각적 디자인 특성을 저장하는 것이라고 볼 수 있다.

디자인 토큰명을 정하는 데에 개발팀과의 합의, 그리고 어떠한 규칙으로 토큰 네이밍 규칙을 정하고 이를 효율적으로 운영할 수 있을까에 대한 고민 등 디자인 토큰을 정하는 데에는 상호 회의가 중요하다.

# 문제
## 2. 아래 사이트를 웹 성능분석 툴로 분석하고 문제점과 개선사항들을 작성하시오.
- https://wch.eqlstore.com/main
> 일단 확인해보니 리액트나 Next.js와 같은 SPA & 하이브리드 렌더링 방식의 프레임워크 or 라이브러리를 사용하진 않은것으로 보이네요. 아마 node.js pug같은걸로 제작한듯 싶네요.
### 문제점 1. 레이아웃 시프트
레이아웃 시프트가 초기에 엄청크게 발생하고 있습니다. 이는 하단 각 영역의 높이값을 미리 저장하지 않아서 생기는 이슈로 보이는데, 클라이언트 렌더링이 되는 중에는 가짜 태그가 노출돼서 높이를 미리 잡아주거나 크게 불러와지는 이미지의 경우는 height값을 명시하여 레이아웃 시프트를 방지해야겠습니다. 혹은 스와이프 화면을 서버사이드 렌더링으로 미리 만들어서 보내는것도 방법으로 보이네요!

### 문제점 2. LCP
이 페이지를 분석해봤을때 모든 이미지들의 이미지 최적화가 이루어지지 않는것으로 보입니다. jpg로 이미지가 불러와지는건 물론이고 이미지 크기도 엄청나게 크게 (1000px 이상) 불러와지는걸로 파악됐습니다. 따라서 이미지 최적화가 빠르게 이루어져야 할것으로 보이네요.

### 문제점 3. 무자비하게 큰 자바스크립트의 크기
자바스크립트 파일을 엄청 호출하고 있습니다. 이를 확인하기위해 개발자도구의 source부분으로 확인해보니 번들링되지 않은 자바스크립트 파일들이 널려있었네요. 번들링 작업이 필요해보입니다.

### 문제점 4. 부적절한 a태그의 사용
a태그를 사용할때 href로 페이지 이동이 되도록 해야하는데 그런 작업이 안되어있어서 SEO 최적화에 불리한 점을 가지고 있었네요. 또한 태그들을 확인해보니 div 태그가 너무 남용되어 있다는점도 문제네요.

## 3. 이번 스터디 후기를 작성하시오.
 제가 몰랐던, 그리고 잘못 알고있었던 지식들을 배우는 시간이였고, 기존에 알고있었던 개념들을 다시 탄탄하게 잡는 스터디였네요. 개인적으로 인상깊었던 부분들은 React-Hook-Form과 Typescipt의 타입가드, 그리고 성능측정이였습니다. 이외에도 추후에 서버 컴포넌트와 Nextjs App Route, Zod, 그리고 타입스크립트의 조건부 타입과 infer 개념도 공부해야겠다는 생각을 하게되네요.

  이번 스터디를 통해 더 현재 사용중인 실무의 기술들을 잘 이해하시고, 왜 내가 이 기술을 사용하고 있는지를 한번 더 복기해보네요. 그리고 이번 스터디로만 스터디가 끝나는게 아니라 서로 모르고 궁금한 기술이 생겼을때 또 스터디를 열어봐도 좋을거같아요~