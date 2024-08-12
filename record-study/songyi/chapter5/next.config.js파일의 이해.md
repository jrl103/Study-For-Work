# next.config.js 파일의 이해

- JSON 파일이 아닌, `NodeJS 모듈`
- NextJS의 서버 및 빌드 단계에서 사용되며 `브라우저 빌드에서는 포함되지 않는다.`
- Next.config.js의 설정은 모두 '옵션'이고 필수가 아니다. 따라서 필요한 설정만 찾아서 변경을 하는 것을 추천한다


## 1. Redirects

: Redirects를 사용하면 들어오는 request 경로를 다른 destination 경로로 Redirect할 수 있다.

넣을 수 있는 옵션
- `source`: 사용자가 접근하는 요청 경로 패턴
- `destination`: `source` 에 맞는 패턴 경로로 들어온 사용자들을 라우팅(Redirect)할 경로
- `permanent(Boolean)` : true면 클라이언트/검색 엔진에 리디렉션을 영구적으로 캐시하도록 지시하는 `308` 상태 코드를 사용하고, false면 `307` 임시 상태 코드를 사용해 캐시되지 않도록 한다.


## 2. Rewrites

: Redirect와 매우 유사하다. 
: 다만, Rewrites의 경우 `url을 바꾸지 않고`, 페이지 내용만 `다른 경로의 페이지로 매핑`해서 보여준다. 
: 즉, redirect는 페이지 내용과 url이 모두 바뀌지만, rewrites는 url은 유지된 채 페이지 내용만 변경되는 것이 차이점


## 3. Environment Variables

: next.config.js 파일의 env 옵션에 환경 변수를 추가하여 사용할 수 있다.

```javascript
module.exports = {
    env: {
        customKey: 'my-value'
    }
}
```

이와 같이 추가할 경우, 코드에서 바로 `process.env.KEY `형식으로 환경 변수에 접근할 수 있다.

## 4. Base Path

- 만약 NextJS 프로젝트를 서브도메인 혹은 서브 path로 배포하고 싶다면 basePath 옵션을 설정 가능
- 기본적으로 base path는 / 루트 path로 설정되어 있지만, 해당 옵션을 추가하여 내가 원하는 도메인을 루트 도메인으로 변경 가능
  - 해당 설정은 빌드 타임에 세팅 되므로 값을 변경하고 싶다면 꼭 re-building 단계를 거쳐야한다.






























