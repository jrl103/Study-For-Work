# Chapter2. 리액트

리액트는 사실 오늘 소개할 훅보다 더많은 훅들이 있다. 하지만 필요한 상황에 맞춰서 훅을 쓰는게 중요하기에 그런 자잘한 훅들에 대한 설명은 생략한다.

그럼에도 현업과 일반적인 개발속에서 가장 많이 사용하는 훅들을 알아볼 필요는 있다. 이를 한번 깊게 알아보도록 하자.

## 1. useState

useState는 함수형 또는 클래스형 컴포넌트의 상태를 관리하고 변경할 수 있도록 도와주는 하나의 리액트 Hook이다.

```typescript
const [value, setValue] = React.useState();
```

여기서 value는 저장된 값을 사용하는것이고 setValue는 value의 값을 업데이트할때 사용한다. value의 값이 변경되면 리렌더링이 발생한다.

위와같은 useState에 타입을 지정할때에는 아래와 같이 제네릭으로 타입을 명시한다. 그러나 우리가 앞장에서 공부했듯이 타입스크립트가 타입을 추론할 수 있는 상황에서는 굳이 타입을 명시할 필요는 없다.

```tsx
interface Product {
  id: number;
  title: string;
  description: string;
}

const initProduct = {
  id: 123,
  title: "상품이에요",
  description: "상품이랍니다",
};

const [product, setProduct] = React.useState<Product>(initProduct);
```

useState의 동작에는 사실 불변성이라는 개념이 첨가되어있는데, 오히려 이해를 해칠수있으므로 여기서는 따로 다루지 않겠다.(궁금하면 찾아보는걸로)

state의 값이 변하면 리렌더링이 발생한다. 따라서 잦은 state의 변경은 성능에 이슈를 줄 수 있으므로 꼭 필요한 상황에서만 state를 쓰는게 좋다.

useState의 setState는 비동기적으로 동작한다. 이유는 렌더링 성능의 이슈때문인데, 생각해보자. 리액트는 근본적으로 자바스크립트인데 자바스크립트 콜스택에 화면 렌더링이 동기적으로 동작하면 필요없는 동작들이 콜스택에 쌓이는것 때문에 화면렌더링이 우선순위에서 한참 밀릴가능성이 존재한다. 따라서 이런 성능상에 문제로 인해, setState는 비동기적으로 동작한다.
못믿겠다면 아래코드를 통해 확인해보자.

```tsx
function Component() {
  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
    setIsShow(!isShow);
    console.log(isShow); //false
  }, []);

  return <div></div>;
}
```

사실 위에코드를 정상적으로 동작시키는 방법은 아래와 같은 방법이 있긴하다~

```tsx
function Component() {
  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
    setIsShow(!isShow);
  }, []);

  React.useEffect(() => {
    console.log(isShow); //false
  }, [isShow]);

  return <div></div>;
}
```

useState를 사용할때 현재 state값을 참조할 수 있는 문법이 존재한다. 바로 prevState. 아래와 같이 코드를 작성하면되고, 이렇게 작성시 현재 useState의 state를 참조가능하다.

```tsx
const [isShow, setIsShow] = React.useState(false);

setIsShow((prev) => !prev); // 여기서 prev는 이전 isShow를 가리킨다.
```

따라서 아래와 같이 단순히 setState가 이전 state를 참조하는걸 위해서 props Drilling을 하는건 멍청한 행동이라고 할 수 있다.

```tsx
// Wrong
interface Props {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
}

function ShowButton({ isShow, setIsShow }: Props) {
  const handleClick = () => {
    setIsShow(!isShow);
  };
  return <button onClick={handleClick}>보여주세요</button>;
}

function Card() {
  const [isShow, setIsShow] = React.useState(false);
  return (
    <div>
      <ShowButton isShow={isShow} setIsShow={setIsShow} />
    </div>
  );
}

// Good
interface Props {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShowButton({ setIsShow }: Props) {
  const handleClick = () => {
    setIsShow((prev) => !prev);
  };
  return <button onClick={handleClick}>보여주세요</button>;
}

function Card() {
  const [isShow, setIsShow] = React.useState(false);
  return (
    <div>
      <ShowButton setIsShow={setIsShow} />
    </div>
  );
}
```

비슷한 기능을 하는 useState를 여러번 정의하는건 코드적으로나, 기능적으로나 별로 좋지못하다. 따라서 이경우 state를 객체하나에 묶어서 정의하는게 나을 수 있다.

```tsx
// Wrong
interface Props {
  title: string;
  description: string;
  onClick: () => void;
}

function Card({ title, description, onClick }: Props) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setTitle(title);
    setDescription(description);
  }, []);

  return <div onClick={onClick}>헬로우</div>;
}

// Good
interface Props {
  title: string;
  description: string;
  onClick: () => void;
}

type CardState = Omit<Props, "onClick">;

const initCardState = {
  title: "",
  description: "",
};

function Card({ title, description, onClick }: Props) {
  const [cardState, setCardState] = React.useState(initCardState);

  React.useEffect(() => {
    setCardState({
      title,
      description,
    });
  }, []);

  return <div onClick={onClick}>헬로우</div>;
}
```

## 2. useEffect

useEffect는 리액트 컴포넌트가 렌더링 될때마다 실행되는 리액트 훅이다.

주의할점은 리액트의 useEffect가 생명주기 함수들을 대체하기위해 만들어진건 아니라는거다.

useEffect는 애플리케이션 내에 컴포넌트를 활용해서 동기적으로 부수효과를 만드는 메커니즘이라는거다.

useEffect는 아래와 같이 코드를 작성한다.

```tsx
React.useEffect(() => {
  console.log("components Render Complete");
}, []);
```

### 의존성배열

이때 useEffect는 의존성 배열이라는걸 가지는데, 의존성 배열에 값이 존재하지 않는다면([]), 컴포넌트가 최초 생성되는 시점에 useEffect가 실행된다. 의존성 배열에 값이 존재한다면, 그 값이 변경될때 & 컴포넌트 최초생성시에 useEffect가 실행된다.
만약 useEffect 의존성 배열자체가 존재하지않는다면 리렌더링이 발생하는 매시점마다 useEffect가 실행된다.

따라서 어지간하면 의존성 배열을 써줘야하며 (빈배열로라도) useEffect의 잦은 실행이 성능상에 큰 영향을 줄 수 있으므로 useEffect사용을 최소화 하는게 중요하겠다.

### 클린업 함수

클린업 함수는 useEffect의 실행전에 실행되는 함수이다. 이해를 돕기위해 아래와 같은 코드를 확인해보자.

```tsx
React.useEffect(() => {
  console.log("useEffect 실행!");
  return () => {
    console.log("클린업 함수 실행!");
  };
}, []);

//출력결과
//클린업 함수 실행!
//useEffect 실행!
```

따라서 클린업 함수는 useEffect를 통해 등록한 이벤트를 지우거나, 혹은 useEffect에서 실행시켜놓은 인터벌 함수를 지우거나하는 역할을 수행한다.

```tsx
const counter = React.useRef(0);
React.useEffect(() => {
  const interval = setInterval(() => {
    if (counter.current === 10) return clearInterval(interval);
    counter.current = counter.current + 1;
  }, 1000);
  return () => {
    clearInterval(interval);
  };
}, []);
```

> 저같은 경우 requestAnimationFrame과 setInterval, addEventListener를 지우는 역할로 많이썼던것 같습니다.

### useEffect의 기명화

useEffect의 코드가 길어졌을경우 그 useEffect가 무슨 역할을 하는지 파악하기 어려운 경우가 종종 생긴다. 이경우 아래와같이 useEffect를 기명화 하긴한다.

```tsx
React.useEffect(function initializeComponent() {
  console.log("useEffect가 실행됐습니다.");
}, []);
```

## 3. useRef

useRef는 useState와 동일하게 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장한다는 특징이 있다. 그러나 useState와 다른점이 두가지 있다.

- useRef는 반환값인 객체 내부에 있는 current로 값에 접근 또는 변경할 수 있다.
- useRef는 그 값이 변하더라도 렌더링을 발생시키지 않는다.
  useRef로 useState를 흉내내도 렌더링이 발생하지 않는걸 확인가능할거다.

### 값의 저장용도

useRef를 사용할 수 있는 유용한 경우가 존재하는데, 렌더링을 발생시키지않고 단순 값을 저장하는 경우이다.

```tsx
// API가 몇번 호출됐는지 확인하는 ref값.
const checkAPICallCount = React.useRef(0);
// state는 트리거전용
const [buttonClicked, setButtonClicked] = React.useState(false);

export const fetchAPI = async () => {
  const response = await fetch(`API`, { method: "GET" });
  const parsedData = await response.json();
  checkAPICallCount.current += 1;
  return parsedData;
};

React.useEffect(() => {
  fetchAPI();
}, [buttonClicked]);

const handleClickButton = () => {
  setButtonClicked((prev) => !prev);
};
```

사실 앞서 말했지만 useState를 막무가내로 사용하는건 좋지못한 방식이다. 예기치못한 리렌더링을 발생시킬 수 있으며, 앱성능을 저하시킬 수 있기 때문이다. 따라서 굳이 usseState를 사용하지않아도 되는 경우에는 이렇게 useRef를 사용하는게 좋다.

> 한번 useRef를 어떤 상황에 쓰면 좋을지에 대해서도 생각해봐도 좋을거같아요.

### 요소 접근용도

아래와 같이 DOM을 접근하는 용도로도 사용한다.

```tsx
const inputRef = React.useRef<HTMLInputElement>(null);

const handleClickApplyButton = () => {
  console.log(inputRef.current.value);
};

return <input ref={inputRef} />;
```

만약 반복렌더링된 DOM요소들 다수를 접근하고 싶은 경우가 존재할것이다. 이때에는 callbackRef를 활용하면 된다. 아래와 같이 코드를 작성하면 된다.

```tsx
const arrayRef = React.useRef<HTMLDivElement[]>([]);

return (
  <div className="container">
    {data.value.map((element, index) => (
      // 콜백형태로 div의 ref값을 가져옴
      <div
        key={index}
        ref={(ref) => {
          arrayRef.current[index] = ref;
        }}
      >
        <p>{element.title}</p>
      </div>
    ))}
  </div>
);
```

#### 왜 DOM 접근은 useRef로 하는걸 권장할까?

이건 항상 궁금했던거다. useRef로 DOM접근을 하는 근본적인 이유가 뭘까? 사실 getElementById와 getElementsByClassName으로도 DOM접근을 할 수 있는데 왜 굳이 useRef로 할까? 이는 사실 리액트스러움(?) 때문이 크다. 사용하는 라이브러리가 React이고 리액트로 이해하기 쉬운 일관성있는 코드를 작성해야함이 커서라고 함.

> 여전히 저에게 제일 큰 의문점중 하나인데... 잘 모르겠네요ㅋㅋㅋㅋㅋ 만약 면접이나 누군가가 이런걸 물어본다면 전 답변을 잘 못할것 같아요.

## 4. useCallback & useMemo & memo

useCallback & useMemo & memo 전부 메모이제이션에 의미가 있다. 이 메모이제이션이란 메모리안에 useCallback & useMemo & memo로 감싼 값이 저장되는걸 의미한다. 이때 컴포넌트의 리렌더링에 자유로운 값들이 되는것이고, 컴포넌트의 리렌더링 비용을 최소화하는 의미가 있다.

memo는 좀 특이한데, 컴포넌트를 메모이제이션 할때 사용한다. 부모의 리렌더링으로부터 자유로워지는 컴포넌트를 만들 수 있다는데에 의미가 있고, 대신에 메모이제이션화한 컴포넌트의 props값이 변한다면 memo로 감싼 컴포넌트의 리렌더링이 발생한다. 따라서 memo로 감싼 컴포넌트의 값을 전달할때에는 props의 값을 메모이제이션 하는것도 좋은 방법이다.

### 희대의 프론트엔드 떡밥, 메모이제이션은 의미가 있는가?

이는 항상 논쟁이 나오는 이야기이다.

#### 메모이제이션이 의미가 있는가?

사실 함수와 값을 메모이제이션하는게 성능상에 드라마틱한 변화를 주는 경우는 많지않고 오히려 메모리를 잡아먹어 앱의 성능이슈를 가져오는 경우가 존재한다. 따라서 메모이제이션이 큰 의미를 가져오긴 어렵고 이럴바에야 사용자에게 보여질때 이상한 화면을 보여줄때에만 memo와 useMemo를 사용하는게 좋지않을까?

#### 아니다 메모이제이션으로 인해 좋은 성능개선이 가능하다.

그치만 리렌더링이 될때 앱이 버벅이는 현상을 많이 보곤한다. 특히나 많은 상태와 useEffect를 가지는 관리자 사이트(우리 서비스뿐만이 아니더라도)에서는 이게 유의미하게 적용된 경험이 많았다. 따라서 적재적소에 useMemo와 memo, useCallback의 존재를 인식하고 쓰는게 중요하지 않을까?

## 5. 반복렌더링(map)시에 key값을 index로 사용하면 생길 수 있는 이슈

반복렌더링을 사용했을때 key값으로 map의 index를 사용했을 경우에 배열의 요소가 자주 변화하는 상황에서 적절치 못할 수 있다. 아래와 같은 코드를 보자.

```tsx
import React from "react";

const initList = [{ name: "철수" }, { name: "영희" }, { name: "민수" }];

export default function Example() {
  const [list, setList] = React.useState(initList);

  const addItem = () => {
    setList([{ name: "정국" }, ...list]);
  };

  const delItem = () => {
    setList(list.filter((element) => element.name != "철수"));
  };

  return (
    <>
      {/* 추가 버튼과 삭제 버튼*/}
      <input type="button" value="추가" onClick={addItem} />
      <input type="button" value="삭제" onClick={delItem} />

      <h2> Show Problem Example</h2>
      {list.map((element, index) => (
        /*  div 태그의 key로 배열의 index 사용*/
        <div key={index}>
          {" "}
          {element.name}, idx: {index} <input type="text" />{" "}
        </div>
      ))}
    </>
  );
}
```

자 이런상황에서 만약 새로운 요소가 추가되기전 첫번째 요소에 input에 값을 넣는다치자, 그리고 요소를 추가하면? 이상하게도 추가된 요소에 input에 입력한 정보가 보일 수 있다.

우리가 알수있는 사실은 아래와 같다. 아래 경우를 충족한다면 index값을 key로 활용하자.

- 배열과 각 요소가 static이며 computed 되지 않고 변하지 않아야 한다.
- 데이터 내부에 id로 쓸만한 unique 값이 없을 경우
- 데이터가 결코 reordered or filtered 되지 않을 경우

이는 리액트가 고유한 key값을 활용해서 화면을 렌더링을 재조정하기 때문이다.

## 6. 리액트 18버전

리액트 18버전은 내용이 정말많다. 이를 한번 면밀히 다뤄보자

### Auto Batching

- state 값이 변경되었을 경우 React 에서는 해당 컴포넌트를 리렌더링 하며, 불필요한 리렌더링을 방지하기 위해 state를 변경하는 작업을 일괄적으로 처리한다.
- 이렇게 state 의 업데이트 작업을 모아 일괄 처리하는 방식을 Batching 이라고 하며, 이 덕에 React 에서는 불필요한 리렌더링을 방지할 수 있게 되었다.

```tsx
function Counter() {
  const [count, setCount] = REact.useState(0);

  function increaseCountThree() {
    // 아래의 작업은 모두 일괄적으로 묶여 처리된다. 한 번의 리렌더링만 발생한다.
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      <button onClick={increaseCountThree}>+1</button>
      <p>Count : {count}</p>
    </div>
  );
}
```

사실 그전에는 useState의 setState함수를 여러번 썼을경우에 성능이슈가 발생할 수 있었다. 아무리 비동기적으로 실행된다고 하더라도 결국 여러번의 실행이 되는건 맞으니까.
하지만 18버전부턴 이렇게 여러번의 state를 한번에 처리해주니 훨씬 효율적인 렌더링이 가능해진것!

그러나 아주 가~끔 이런 autoBatching을 하고싶지않을 경우가 존재할것이다. 그때에는 flushSync를 활용하면 된다.

```tsx
function handleClick() {
  // React 는 flushSync 메서드가 실행되는 즉시 DOM을 업데이트 한다.
  flushSync(() => {
    setCounter((c) => c + 1);
  });
  // React 는 flushSync 메서드가 실행되는 즉시 DOM을 업데이트 한다.
  flushSync(() => {
    setFlag((f) => !f);
  });
  // 따라서 해당 함수가 실행될 경우 React는 총 두 번의 리렌더링을 수행한다.
}
```

### 동시성 렌더링

동시성 렌더링이란 급한 작업과 덜 급한 작업으로 나눠, 급한 작업을 우선 화면에 렌더링 하는 방법이다.

이해가 안될까봐 예를 들어보도록 하겠다.

#### 비동시성 렌더링

- 영수와 민지한테 전화를 걸어야한다고 치자.
- 영수에게 먼저 전화를 걸었다.
- 근데 영수가 전화를 안받는다.
- 영수가 전화를 받을때까지 계속 전화를 한다.
- 약 3분이 지나 드디어 영수가 전화를 받았다.
- 민지에게 전화를 건다.

#### 동시성 렌더링

- 영수와 민지한테 전화를 걸어야한다고 치자.
- 영수에게 먼저 전화를 걸었다.
- 근데 영수가 전화를 안받는다.
- ✨영수의 전화를 끊고 민지에게 전화를 건다.
- 민지와 통화가 끝났다.
- 영수에게 전화를 건다.

이런 관점에서 동시성 렌더링을 이해해야한다. 절대 병렬적(렌더링을 따로따로 진행하는) 렌더링이 아니다. 오해말자!

- useDeferredValue는 useMemo와 비슷하게 값에 동시성 렌더를 적용시킬때 쓴다.
- startTransition은 useCallback과 비슷하게 함수에 동시성 렌더를 적용시킬때 쓴다.

```tsx
import { useState, startTransition } from "react";

const textTemplate = [
  "랜덤한 문자열을 만들어야 해요.",
  "Concurrent 확인",
  "버벅버버버벅",
  "덜그럭 덜그럭",
  "좀 심하게 덜그럭 거리는데?",
];

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState<string[]>([]);

  return (
    <div className="search-box">
      <input
        className="search-input"
        value={keyword}
        placeholder="검색어를 입력해 주세요."
        onChange={(e) => {
          setKeyword(e.target.value);
          //이렇게 리스트를 재설정하는 비싼 렌더링에 startTransition을 걸어 동시성 렌더링을 하도록 만든다!
          startTransition(() => {
            setList(
              Array.from({ length: 10000 }).map(
                () => textTemplate[Math.floor(Math.random() * 5)]
              )
            );
          });
        }}
      />
      <ul className="search-list">
        {list.map((text, i) => (
          <li key={`${text}-${i}`}>
            {text}: {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
```
