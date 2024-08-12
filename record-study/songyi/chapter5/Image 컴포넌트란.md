# Image 컴포넌트란 ?

표준 HTML <img> 태그를 확장한 것

- 자동적으로 이미지를 기기에 맞는 사이즈로, 또, 최신형식인 `WebP`와 `AVIF`로 전달해줌
- `minimumCacheTT`L을 설정해 `max-age` 를 지정
- width, height 속성을 적용해야 함(이미지가 public 폴더에 있으면 절대 경로로 지정)
- `fill` 속성을 사용하면, 부모 태그에 `display: "relative" | "fixed" "absolute"` 를 설정하기만 하면 된다.
- `placeholder = 'blur'` 를 설정하면, 로컬이미지 경우, 빌드시에 생성된 작은 사이즈의 이미지가 해당영역을 차지하고 있다가 이미지로딩이 끝나면 대체해줌
- 기본적으로 `loading='lazy'` 이며, 페이지 로딩 속도 최적화
- 새로고침시 `(memory cache)` 가 뜨면서, 즉 브라우저 캐싱이 되고 `Etag` 를 확인하는 네트워크 리퀘스트가 없음


> [ placeholder ]
> -  `CLS(Cumulative Layout Shift)`를 방지해줌
> - 이미지 로딩이 끝나기 전에 이미지가 차지하는 영역과 로딩 이후 차지하는 영역 사이의 차이로부터 발생하는 것



````javascript
// 1. Image 컴포넌트를 사용하면 width와 height 속성을 적용해줘야한다
<div>
  <Image width={500} height={500} src={topImage} /> 
  //import 한 이미지는 width,height 속성 없으면 이미지 크기로 적용됨(에러안뜸)
</div>


<div>
  <Image width={500} height={500} src="/image.jpg" />
  //직접 절대경로로 이미지 넣으면 width,height 없으면 에러 뜸
</div>


// 2.fill 속성을 사용하면 부모 요소에 꽉차도록 이미지가 적용된다 (주의: fill은 부모요소가 포지셔닝 된것만 적용됨)
<div style={{ position: "relative", width: "300px", height: "300px" }}>
    <Image fill src="/image.jpg" />
</div>

// 3. object-fit: cover 속성을 사용해서 브라우저를 줄이거나 늘렸을 때 이미지 비율이 깨지지 않게 막을 수 있다
<h2>1번</h2>
<div style={{ position: "relative", width: "100%", height: "500px" }}>
    <Image fill src="/image.jpg" style={{ objectFit: "cover" }} />
</div>
<h2>2번</h2>
<div>
    <Image width={500} height={500} src={topImage} />
</div>
````