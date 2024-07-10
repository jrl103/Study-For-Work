# 챕터1

## 타입스크립트란?
자바스크립트의 슈퍼셋인 오픈소스 프로그래밍 언어이다. 자바스크립트는 동적 타입의 인터프리티 언어이다. 그러나 타입스크립트는 정적 타입의 언어.
- https://www.typescriptlang.org/play/?#code/JYOwLgpgTgZghgYwgAgLIHsAmEA2yDeAUMsgG5w4CuEAXMgM5hSgDmA3McggBbA6ZQIIAPx0M2HAG0AuhwC+hBOhCNkMSiATIAvMgAUABzhQ4AWzFZcMgDTJQ2AB50QlUwCNoASh0A+ApyUVMC5efh1kIxNTSXsIB2kAOh4+ASFOYBh9ZP5vIhISbMwYkEdE8ioUXQByQAGewF6aqo4SBTkORWVVdU0AJnDDYzMLCRs7ErjnVw8ob20-PLtM-qji0qTQ1JBczgKO4PwQlMEQZDlwyLMVuNlthaz1o638-MKjy-iE8upw2oam-IVmoRWkA

### 타입스크립트의 장점
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
bFunction('10', '20');
```


위 코드는 아래와 같이 타입스크립트로 개선이 가능하다.
```typescript
interface Person {
  name: string;
  age: number;
};

const aFunction = (person: Person) => {
  console.log(person.name);
};
//타입에러!
aFunction(1);

const bFunction = (a: number, b: number) => {
  console.log(a + b);
};
//타입에러!
bFunction('10', '20');
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