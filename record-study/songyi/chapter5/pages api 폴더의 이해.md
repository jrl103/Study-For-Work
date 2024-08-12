# pages/api 폴더의 이해

- Next.js 에서 pages/api 경로에 파일을 위치시키는 경우 `자동으로 API Routes 코드임을 인식`하고,` 파일 명으로 API Endpoint 를 만들게 된다.`


- `pages/api` 폴더 내의 모든 파일은 `/api/*` 에 대응되며, `page` 가 아닌 `API 엔드포인트`로 취급된다
  - 이는 `서버 사이드 번들`이며, 클라이언트 사이드 번들 크기를 증가시키지 않는다.



## HTTP Methods

API 라우트에서 다른 HTTP 메서드를 처리하려면, 요청 핸들러에서 `req.method`를 사용하면 된다.

```typescript
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // POST 요청 처리
  } else {
    // 다른 HTTP 메서드 처리
  }
}
```

## Reqeust Helpers

API 라우트는 들어오는 요청(req)을 파싱하는 내장 요청 헬퍼를 제공한다.

- `req.cookies` - 요청에 따라 전송된 쿠키를 포함하는 객체. 기본 값은 `{}`
- `req.query` - 쿼리 문자열을 포함하는 객체. 기본 값은 `{}`
- `req.body` - `content-type`에 따라 분석된 body를 포함하는 객체, 또는 body가 전송되지 않은 경우 `null`


## Response Helpers

`res`(서버 응답 객체)는 DX를 향상하고 새로운 API 엔드포인트를 빠르게 생성하는 데 도움을 주기 위해 `Express.js`와 유사한 여러 헬퍼 함수를 포함하고 있다.

- `res.status(code)` - 상태 코드를 설정하는 함수. `code`는 유효한 `HTTP 상태 코드`여야 한다.
- `res.json(body)` - JSON 응답을 보낸다. `body`는 `직렬화할 수 있는 객체`여야 한다.
- `res.redirect([status,] path)` - 지정된 경로 또는 URL로 리다이렉트한다. `status`는 유효한 HTTP 상태 코드여야 한다. 지정하지 않는다면 `status`의 기본 값은 "307", 즉 "임시 다이렉트(Temporary redirect)"이다.
- `res.revalidate(urlPath)` - `getStaticProps`를 사용하여 `요청 시 페이지 재검증`을 수행한다. `urlPath`는 `string`이어야 한다.

## 동적 API 라우트

API 라우트는 동적 라우트를 지원하며 `pages`에 사용되는 파일 이름 규칙을 따른다. 예를 들어 API 라우트` pages/api/post/[pid].js`에 다음 코드가 있다.

`````typescript
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query
  res.end(`Post: ${pid}`)
}
`````

`/api/post/abc`로의 요청은 텍스트 `Post: abc`를 응답으로 받게 된다.

















