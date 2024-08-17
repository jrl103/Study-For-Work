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

  자세한건 과제내용을 통해 확인해보자.
## 보안
## 웹 성능분석 방법 
### 4-1. Lighthouse란? 
### 4-2. 크롬 브라우저 개발자 도구
## 디자인 시스템이란?

React와 Next.js에서 SEO 최적화를 각각 해보시오.
아래 사이트를 웹 성능분석 툴로 분석하고 문제점과 개선사항들을 작성하시오.
https://wch.eqlstore.com/main
이번 스터디 후기를 작성하시오.