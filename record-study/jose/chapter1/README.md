# 챕터1

## 1. 타입스크립트란?

자바스크립트의 슈퍼셋인 오픈소스 프로그래밍 언어이다. 자바스크립트는 동적 타입의 인터프리티 언어이다. 그러나 타입스크립트는 정적 타입의 언어.

- https://www.typescriptlang.org/play/?#code/JYOwLgpgTgZghgYwgAgLIHsAmEA2yDeAUMsgG5w4CuEAXMgM5hSgDmA3McggBbA6ZQIIAPx0M2HAG0AuhwC+hBOhCNkMSiATIAvMgAUABzhQ4AWzFZcMgDTJQ2AB50QlUwCNoASh0A+ApyUVMC5efh1kIxNTSXsIB2kAOh4+ASFOYBh9ZP5vIhISbMwYkEdE8ioUXQByQAGewF6aqo4SBTkORWVVdU0AJnDDYzMLCRs7ErjnVw8ob20-PLtM-qji0qTQ1JBczgKO4PwQlMEQZDlwyLMVuNlthaz1o638-MKjy-iE8upw2oam-IVmoRWkA

#### 타입스크립트의 장점

1. 에러를 사전에 방지가능함. 다음과 같이 매개변수를 전달받는 함수의 입장에선 저 매개변수가 무슨 타입인지 알 방법이 없음.
   이런 에러를 마주하는건 대형프로젝트를 경험해본 개발자라면 누구나 공감할 것임. 타입체크와 객체의 형태를 예측하고 에러를 방지할 수 있음.

```javascript
const aFunction = (person) => {
  console.log(person.name);
};
//undefined;
aFunction(1);

const bFunction = (a, b) => {
  console.log(a + b);
};
//1020;
bFunction("10", "20");
```

위 코드는 아래와 같이 타입스크립트로 개선이 가능하다.

```typescript
interface Person {
  name: string;
  age: number;
}

const aFunction = (person: Person) => {
  console.log(person.name);
};
//타입에러!
aFunction(1);

const bFunction = (a: number, b: number) => {
  console.log(a + b);
};
//타입에러!
bFunction("10", "20");
```

2. 객체지향적으로 사고해볼 수 있음.

```typescript
interface Movie {
  time: number;
  title: string;
}

interface Cinema {
  showMovie: (title: string) => void;
}

interface HeroMovie extends Movie {
  actor: string[];
}

interface AlienMovie extends Movie, Cinema {
  alienSubject: string;
}
```

### 1-1. 우리가 타입스크립트를 사용해야하는 이유

대규모 프로젝트로 가면갈수록 타입안정성을 갖추지 못했을때 디버깅과정에 어려움을 겪을 수 있음.
자바스크립트 에러의 대부분은 타입에러 & 객체 프로퍼티 오타로 인해 생기는 경우가 대다수임.

객체 프로퍼티 오타 또한 타입스크립트가 제공하는 자동완성으로 인해 미리 방지가 가능함.

```typescript
interface Book {
  title: string;
  description: string;
  createdAt: Date;
}

const book: Book = {
  tit, // << 핵심은 이렇게 몇자만 쳤음에도 title이라는 프로퍼티가 알아서 완성된다는거임
};
```

그외에는 위에 장점으로 많이 설명됐다고 봅니다.

## 2. 타입단언과 타입선언

타입선언은 말그대로 타입을 선언하는거다. 굳이 말을 풀어쓰자면 아래와 비슷할듯

- 얘는 이 타입이야! 그러니까 다른 타입의 무언가가 들어오면 안된다? 그리고 이 변수가 이타입이 아니면 이상한거다?

근데 타입단언은 선언과 다르게 아예 단언을 해버린다는게 크다.

- Me: 얘는 이 타입이야!
- 컴파일러: ? 이거 이상한데? 이거 이 타입아님
- Me: ㄴㄴ 닥치셈 내가 너보다 더 이 타입에 대해 잘알고있음
- 컴파일러: ....

이런 대화의 흐름으로 보면 좋을듯하다. 따라서 특정 상황에서 단언을 써버리면 any급으로 위험할수도 있음.

왜 위험하느냐, 아래 코드를 한번보자.

```typescript
interface Item {
  image: string;
  subName: string;
}

interface Yoga {
  calorie: string;
  teacher: string;
}

const value: Item = {
  image: "http이러쿵저러쿵",
  subName: "하이하이?",
};

const action = (yoga: Yoga) => {
  console.log(yoga);
};

action(value as unknown as Yoga);
```

value라는 객체는 분명 Item이라는 타입임에도 불구하고 action함수에 매개변수로 들어가버릴 수 있다. (물론 이때는 unknown을 통해 타입안정성을 해쳐봤다.) 이렇게 as를 통해 타입안정성을 망가트리고 코드가 작성될 수 있음. 따라서 타입단언은 내가 새로작성한 코드가 특정상황에서 라이브러리 혹은 기존코드와의 충돌로 인해 변수나 상수의 정보가 확실히 이 타입임에도 불구하고 컴파일러가 계속 에러를 내뱉을 경우에만 사용하는게 이상적이다. 평상시에는 타입선언으로 코드를 작성하는게 맞음.

## 3. 타입추론, 그리고 인터페이스와 타입

### 3-1. 타입추론

타입 추론이란, 개발자가 굳이 변수 선언할때 타입을 쓰지않아도 컴파일이 스스로 판단해서 타입을 넣어주는 것을 말한다. 대표적인 예로 자바스크립트 원시타입을 선언할때가 있겠다.

```typescript
const myString = "string"; // string type
const myNumber = 123; // number type
const myBoolean = false; // false type
```

요때에는 굳이 타입선언을 할 필요가 없다. 따라서 아래와 같은 코드도 사실은 부적절한 코드일 수 있겠다.

```typescript
const [isShow, setIsShow] = React.useState<boolean>(false);
const [count, setCount] = React.useState<number>(0);
```

> 특정 견해에 따라서는 타입스크립트를 사용할때 타입추론가능한 변수에도 타입을 정의해야한다고 주장한다곤 하네요. 그러나 과연 타입스크립트를 불신하고 불필요한 코드를 더 치는게 맞는 방향인지는... 판단에 따라 다를듯합니다.

### 3-2. 인터페이스와 타입

#### 타입확장에서의 차이

객체에 있어서 인터페이스는 extends를 통한 타입확장을, 타입은 & 기호를 통한 타입확장을 한다.

```typescript
// 인터페이스에서의 타입확장
interface Dog {
  age: number;
  legs: number;
  isCanJump: boolean;
}
interface Bori extends Dog {
  cute: boolean;
}

// 타입에서의 타입확장
type Dog = {
  age: number;
  legs: number;
  isCanJump: boolean;
};

type Bori = Dog & {
  cute: boolean;
};
```

재밌는 점은 인터페이스의 경우 선언적 확장이라는게 가능. 동일한 인터페이스를 두번 선언시 자동으로 타입을 확장시켜주는 기능이다. 타입은 안되니까 참고.

```typescript
interface Dog {
  age: number;
  legs: number;
  isCanJump: boolean;
}

interface Dog {
  isVaccinate: boolean;
}
```

> 개인적인 견해를 담자면 객체의 타입을 정의할때는 extends를 통해 직관적이게 타입확장이 가능하면서 선언적확장 기능이 있는 인터페이스를 자주 사용하지않을까 싶습니다.

#### 원시타입을 정의할때에

타입의 경우는 원시타입을 정의하는게 가능하지만 인터페이스는 불가능하다는 차이점이 있다.

```typescript
type NumberAndString = string | number;
interface NumberAndString string // ????
```

#### computed value

타입스크립트에는 computed value(유틸리티 타입으로는 Record)라는게 존재한다. 객체 키정보에 타입을 부여한다는게 특징이다.

## 6. 여담

타입스크립트는 집합론적으로 접근하면 좋다고합니다.
