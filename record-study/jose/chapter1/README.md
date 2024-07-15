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
```typescript
type KeyTypes = {
  [key in string]: number;
}
```

## 4. 리터럴 타입의 이해
문자열과 숫자에 좀 더 정확한 값을 지정할 수 있는데 이를 리터럴 타입이라고 말한다.

참고로 인터페이스로는 이렇게 리터럴 타입을 만들 수 없다. 다만 인터페이스로 객체를 구성할때 특정값에다가 사용할 순 있겠다

### 문자형
문자형 리터럴 타입은 아래와 같이 구성한다. 이를통해 enum과 비슷한 형태를 갖추는게 가능하다.
> 오히려 이 때문인지 저같은 경우에는 타입스크립트 enum을 잘 사용하지않고 문자형 Enum으로 값을 구성하는 경우가 대부분이였습니다. enum자체가 워낙 자바스럽다라고 생각이 박힌것도 한몫하구요...
```typescript
// 보통 이렇게 문자형 리터럴 타입을 enum의 용도로 쓸때에는 대문자 & 스네이크 케이스로 작성합니다.
// 마찬가지 제 개인견해이므로 받아드리시는건 자유...
type ShapeType = 'CIRCLE' | 'BIG_SQUARE' | 'SMALL_SQUARE';

interface Shape {
  title: string;
  type: ShapeType;
  width: number;
  height: number;
}

const smallSquare: Shape = {
  title: '작은 정사각형',
  type: 'SMALL_SQUARE',
  width: 50,
  height: 50
}
``` 

### 숫자형
숫자형은 정반대로 숫자로 리터럴 타입을 구성하는것을 말함.
보통 서버측에서 타입으로 보여지는 값의 정책을 숫자로 했을경우에 쓰곤하는듯 하다.
```typescript
/**
 * 70: 배송중
 * 71: 배송완료
 * 72: 주문확정
 * 80: 주문완료
 * 90: 취소
 */
type OrderType = 70 | 71 | 72 | 80 | 90;
```

## 5. 타입가드와 is란?

타입가드란 변수의 타입을 좁히는데에 사용되는 메커니즘을 말한다. 서버에서 간혹가다가 객체배열의 형태로 값을 전달해줄때 다양한 형태의 데이터를 한대 담아서 보내는 경우가 존재한다. 이때 우리는 타입가드를 통해 타입 다양성을 대처하곤하기에 중요한 개념.
그리고 프론트 특성상, 다양한 화면에서 사용되는 영역을 컴포넌트화 하곤 하는데, 서버측에서 이런부분을 고려하지않고 데이터를 다르게 던져주는 경우가 다분하다. 따라서 이경우 다양한 타입에 대응해야하는 코드를 작성해야하기에 타입가드가 필요한 셈.


### falsy를 통한 타입가드
falsy를 통한 타입가드가 가능한데, 이는 우리가 숨쉬듯이 하고있는중이다. null, 0, '', NaN, undefined, false와 같은 falsy값들은 우리의 코드가 동작하지 않게 하는 주원인들이기에 아래와 같이 막곤한다.
```typescript
interface Person {
  name: string;
  age: number;
}

const person?: Person = {
  name: 'choiHyeounJun',
  age: 29
}

const main = () => {
  if (!person) return;
  console.log(person.age);
};

```

### typeof를 통한 타입가드
typeof를 통해 원시타입 혹은 참조타입의 형태를 띄고있는지 확인해볼 수 있겠다. 아래와 같이, 특정값이 숫자나 스트링이 모두 들어올 수 있는 경우에, 아래 코드처럼 typeof를 활용하면 좋을듯하다.
```typescript
function getNumber(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.length); 
  } else {
    console.log(value); 
  }
}
```

### instanceof를 통한 타입가드
가끔가다가 사용하는 클래스를 쓸때 사용하는 타입가드 방식. 함수형 프로그래밍 방식의 리액트에서는 볼일이 많이 없겠지만, Nest.js와 같이 철저하게 객체지향 프로그래밍 방식을 따르는 프로젝트에서는 쓸일이 다분할듯하다.
```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Animal {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
}

function printDetails(obj: Person | Animal): void {
  if (obj instanceof Person) {
    console.log(obj.name);
  } else {
    console.log(obj.type);
  }
}
```

### in을 통한 타입가드
자바스크립트 객체내에서 특정 변수를 가졌냐 안가졌냐를 통해 타입가드를 할때에 in을 쓴다.
```typescript
interface Book {
  id: number;
  rank: number;
}

interface OnlineLecture {
  id: string;
  url: string;
}

function learnCourse(material: Book | OnlineLecture) : number | string {
  if (rank in material) {
    return material.rank; // material는 Book 추론됨
  } else {
    return material.url; // obj는 OnlineLecture로 추론됨
  }
  
  if(id in material){
  	console.log(material.id); //material.id는 number|string으로 추론이 되어, 타입 가드 역할 못함 못하게 된다.(자동완성 기능 사용 불가)
  }
}
```

### 타입 가드 함수와 is
타입 가드를 해내는 함수를 별도로 만들어 버릴때 쓰는게 is. 타입가드를 아무리 한다고 하더라도, 타입스크립트가 이렇게 함수화된 타입가드 함수를 감지하지 못하기 때문에 감지를 위해 is를 사용한다.
```typescript
  const isOrderListItem = (value: IOrderListItem | IOrderDetail): value is IOrderListItem => {
    if (!value) return false;
    return (value as IOrderListItem).productBasicPrice !== undefined;
  };
```

## 6. 타입상속 & 유니온 타입
어쩌다보니 위에 너무나 많이 설명해버려서 내용이 겹치기에 간단하게 개념만 집고 가도록 하겠다.

### 타입상속
상속이란, 부모가 될 원형을 따르되, 추가로 프로퍼티를 정의하는 방식을 말한다.(걍 제가 정의한거에요...)
```typescript
// 인터페이스의 상속법
interface IExample1 {
  x: number;
  y: number;
}

interface IExample2 extends IExample1 {
  z: number; 
}


// type의 상속법
type TExample1 = {
  x: number;
  y: number;
}

type TExample2 = TExample2 & {
  z: number;
}
```

### 유니온 타입
유니온 타입이란 자바스크립트의 OR 연산자(||)와 같이 'A' 이거나 'B'이다 라는 의미의 타입이다.
```typescript

const value: number | string | null = 12;

interface Student {
  grade: number;
  age: number;
  name: string;
  school: string;
}

interface Teacher {
  name: string;
  school: string;
}

const getInSchool = (person: Teacher | Student) => {
  console.log(person.name);
}
```

## 7. 유틸리티 타입이란?
유틸리티 타입의 종류가 정말많다. 따라서 주로 사용하고, 협업에서 많이 사용하는 유틸리티 타입 위주로 작성하겠다.

참고로 모든 유틸리티 타입들은 사실 타입스크립트로 구현된 형태들이다. 이를 간단하게 가져다가 쓰고있는것이니, 그 원형이 어떤지를 아는것도 도움은 되겠다.
- https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0-%ED%83%80%EC%9E%85-%F0%9F%92%AF-%EC%B4%9D%EC%A0%95%EB%A6%AC

### Partial
TYPE의 모든 속성을 선택적으로 변경한 새로운 타입 반환 
> 개인적으로 그렇게까지 많이써보지않은 유틸리티 타입같네요. 앞으로도 많이 안쓸듯합니다...!
```typescript
interface User {
   name: string;
   age: number;
   phone: number;
}

type Partial_User = Partial<User>;
// 인터페이스 User의 속성을 모두 optional 설정
/** 
type Partial_User = {
    name?: string | undefined;
    age?: number | undefined;
    phone?: number | undefined;
}
*/

const user: Partial<User> = {
   name: 'B',
};
```

### Required
TYPE의 모든 속성을 필수값으로 변경한 새로운 타입 반환 
```typescript 
interface User {
   name?: string;
   age?: number;
   phone: number;
}

type Required_User = Required<User>; // 인터페이스 User의 속성을 모두 일반 타입으로
/*
type Required_User = {
    name: string;
    age: number;
    phone: number;
}
*/

const user: Required<User> = {
   name: '홍길동',
   age: 22,
   phone: 111,
};
```

### Readonly
TYPE의 모든 속성을 읽기 전용값으로 변경한 새로운 타입 반환 
> 여기서! readonly란? 자바의 private과 같은 기능으로, 객체를 읽기만 가능하게 하고, 수정은 불가능하도록 만드는 기능을 말합니다. 그렇기에 대부분의 경우에는 객체를 readonly로 두는게 좋으며, 특정상황에서만 readonly를 안두는게 바람직하다.

```typescript
interface User {
   name?: string;
   age?: number;
   phone: number;
}

type Readonly_User = Readonly<User>; // 인터페이스 User의 속성을 모두 readonly 설정
/*
type Required_User = {
    readonly name?: string | undefined;
    readonly age?: number | undefined;
    readonly phone: number;
}
*/

const user: Readonly<User> = {
   name: '홍길동',
   age: 22,
   phone: 111,
};

user.age = 11; // ERROR !!
```
> 사실 이런 Readonly를 저희 프로젝트 대부분의 객체에 적용하고싶은 마음이 크네요ㅜ 캡슐화를 통해 코드의 안정성을 높일 수 있고, 사실 저희 프로젝트내에 대부분의 객체들은 개발자가 객체를 수정하는 경우가 많지않은것도 한몫하구요.

### Record
제네릭의 KEY를 속성으로, 제네릭의 TYPE를 속성값의 타입으로 지정하는 새로운 타입을 반환. computed value를 유틸리티 타입으로 쓴다고 생각하면 편하다. 따라서 computed value는 사실상 이 유틸리티 때문에 쓸일이 많이 없다.
```typescript
type Key = 'name' | 'age' | 'phone';

type Record_User = Record<Key, number>; // 유니온 Key의 'name', 'age', 'phone' 타입들을 속성으로 하여 number 타입으로 설정
/*
type Record_User = {
    name: number;
    age: number;
    phone: number;
}
*/

const user: Record<Key, number> = {
   name: 9999,
   age: 22,
   phone: 111,
};
```

### Pick
제네릭 TYPE으로 부터 제네릭 KEY에 해당하는 속성을 선택하여 따로 모아 타입을 반환한다.
참고로 여러개를 선택할때에는 유니온의 형태로 작성하면 된다.
```typescript
interface User {
   name: string;
   age: number;
   email: string;
   isValid: boolean;
}

type Key = 'name' | 'email';

type Pick_User = Pick<User, Key>; // User 인터페이스의 속성에서 'name', 'email' 만 선택
/*
type Pick_User = {
    name: string;
    email: string;
}
*/

const user: Pick<User, Key> = {
   name: 'inpa',
   email: 'inpa@naver.com',
};
```

### Omit
제네릭 TYPE으로 부터 제네릭 KEY에 해당하는 속성을 제외한 나머지들을 따로 모아 타입을 반환
```typescript
interface User {
   name: string;
   age: number;
   email: string;
   isValid: boolean;
}

type Key = 'name' | 'email';

type Omit_User = Omit<User, Key>; 
// User 인터페이스의 속성에서 'name', 'email' 제외
/*
type Omit_User = {
    age: number;
    isValid: boolean;
}
*/

const user: Omit<User, Key> = {
   age: 44,
   isValid: true,
};
```
## 9. 여담
타입스크립트는 집합론적으로 접근하면 좋다고합니다.
1. never: 공집합
2. 리터럴 타입: 원소가 1개인 집합
3. 값이 T에 할당 가능: 같이 T의 원소
4. T1이 T2에 할당 가능: T1이 T2의 부분집합
5. T1이 T2를 상속: T1이 T2의 부분집합
6. T1 | T2: T1과 T2의 합집합
7. T1 & T2: T1과 T2의 교집합