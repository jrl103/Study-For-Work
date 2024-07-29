## React-Hook-Form이란?
React-Hook-Form은 React 기반의 폼 관리 라이브러리로, 간단하고 효율적인 방식으로 폼 유효성 검사와 상태 관리를 처리할 수 있게 도와준다. 이를 통해 개발자는 많은 부분을 직접 구현할 필요 없이 더욱 빠르고 효과적인 폼 개발에 집중할 수 있게 해준다.
 
React-Hook-Form은 성능이 우수하고 유연한 사용자 정의 훅을 제공하는 React 폼 라이브러리. 이 라이브러리는 컴포넌트 중심의 개발 방식과 결합하여 매우 간단하고 직관적인 API를 제공한다. React-Hook-Form을 사용하면 복잡한 폼 유효성 검사 로직을 쉽게 작성할 수 있고, 컴포넌트 상태를 간단하게 관리할 수 있다.
 
### React-Hook-Form 장점
1. 성능 최적화
React-Hook-Form은 내부적으로 성능 최적화를 고려하여 설계됐다. 입력 필드 갱신 및 다시 렌더링을 최소화하여 불필요한 작업을 방지하고 빠른 사용자 경험을 제공한다.이는 대규모 폼이나 복잡한 유효성 검사 로직을 가진 폼에서 특히 유용함. 이는 이전 리액트 과제를 통해 확인해볼 수 있었는데, 
 
2. 간편한 API
React-Hook-Form은 사용하기 쉽고 직관적인 API를 제공한다. 필요한 기능을 간단한 훅 함수로 호출하고,컴포넌트 내에서 필요한 상태와 메서드를 사용할 수 있다. 이를 통해 개발자는 복잡한 폼 로직을 간결하게 작성할 수 있다. 
 
3. 유연성과 확장성
React-Hook-Form은 유연하고 확장 가능한 구조를 가지고 있다.다양한 유효성 검사 규칙과 커스텀 유효성 검사 규칙을 사용하여 폼의 요구사항을 쉽게 처리할 수 있다. 또한,커스텀 컴포넌트와의 통합이 간단하며, 다른 상태 관리 라이브러리와도 함께 사용할 수 있다. (대표적으로 zod & yup. 특히 zod는 요즘 타입스크립트와의 훌륭한 호완성 때문에 각광받는 중)

### 리액트 훅폼을 사용하는 이유
리액트 훅폼을 사용하지않고 코드를 작성했을 경우
- https://github.com/teamOpener/OpenOff-Client/blob/develop/src/components/authorize/inputs/EssentialInput/EssentialInput.tsx


> 보면 알겠지만 Props Drilling과 더불어 코드가 끔찍하게 길어지고 복잡해진다. 심지어 validation을 하는 함수를 호출해서 유효성 검사를 하는방식이라 코드의 복잡성이 올라가버렸다. 여기서 더 중요한점은 state를 통해 인풋값을 받기때문에 잦은 리렌더링까지 발생함.

- https://tech.inflab.com/202207-rallit-form-refactoring/react-hook-form/

### useFormContext
이 사용자 정의 훅을 사용하면 양식 컨텍스트에 연결할 수 있다. useFormContext는 컨텍스트를 props로 전달하는 것이 불편해지는 중첩된 구조에서 사용하기 위한 것이다.

### FormProvider
이 구성 요소는 컨텍스트 객체를 호스팅하고 소비 구성 요소가 컨텍스트를 구독하고 useForm 속성과 methods를 사용할 수 있도록 한다.

> 결국 이 위에 두기능들은 약간 useContext와 문법이 유사하다고 볼 수 있다. ContextProvider를 제공하면서 useContext를 사용하는 흐름과 유사하다 볼 수 있겠다. (언제까지고 props Drilling으로 methods정보를 넘길순 없으니... 가독성도 해치고)


### resolver
이 기능을 사용하면 Yup, Zod 및 기타 여러 외부 검증 라이브러리를 사용할 수 있다. 목표는 원하는 검증 라이브러리를 원활하게 통합할 수 있도록 하는 것이다. 라이브러리를 사용하지 않는 경우 언제든지 양식을 검증하기 위한 로직을 직접 작성할 수 있는 특징이 있다. 아래는 직접 작성한 유효성 검사로직.
```tsx
interface FormValues {
  name: string;
  age: number;
}

const resolver: Resolver<FormValues> = async (values) => {
  const errors = {} as any;
  if (!values.name) {
    errors.name = {
      type: 'required',
      message: '첫번째 이름을 작성해야합니다.',
    };
  }
  if (!values.age) {
    errors.age = {
      type: 'required',
      message: '나이를 작성해주세요.',
    };
  }
  return {
    values: errors.age || errors.name ? {} : values,
    errors: errors,
  };
};

```
마찬가지로 위와 같은 코드 역시 직관성을 상당히 해치는편이다. 따라서 직접쓰기보다는 라이브러리와의 연계를 하는게 좋겠다.

### setValue, reset
- reset: 전체 형태 또는 주요 부분을 초기화한다.
- setValue: 단일 필드 값을 업데이트 한다.

물론 위 설명그대로 reset을 사용하는 경우도 있겠지만 (초기화의 목적으로.)

가끔가다 아래처럼 코드를 작성하는 경우가 있다.
```tsx
interface Address {
  title: string;
  value: string;
  field: string;
  description: string;
}
const { setValue } = useForm<Address>();

const response = await axios.get<Promise<Address>>(`/address`);

const addressInfo = response.data.value;

setValue('title', addressInfo.title);
setValue('value', addressInfo.value);
setValue('field', addressInfo.field);
setValue('description', addressInfo.description);
```

개인적으로 이게 맞을까 생각이 드는편... 쓸데없이 setValue를 반복해야함.

reset을 사용하면 이렇게 초기화하는 과정을 한번만 수행가능!
```tsx
interface Address {
  title: string;
  value: string;
  field: string;
  description: string;
}
const { reset } = useForm<Address>();

const response = await axios.get<Promise<Address>>(`/address`);
reset(response.value);
```

### yup
JavaScript에서 사용되는 객체 스키마 유효성 검사 라이브러리이다. 이를 통해 간편하게 데이터의 유효성을 확인하고 검증할 수 있다.
> 신기했던점은 yup은 React-Hook-Form과 연계하기위해 나온 라이브러리가 아니라 자바스크립트 라이브러리라는 사실.

#### yup의 다양한 기능들
- 스키마 정의: Yup을 사용하려면 스키마를 정의해야 한다. 스키마는 데이터 모델을 설명하는 객체다. yup.object()를 사용하여 스키마를 정의할 수 있다.

- 필드 유효성 검사: 스키마 내에서 각 필드에 대한 유효성 검사를 정의할 수 있다. 다양한 메서드를 사용하여 유효성 규칙을 설정할 수 있다. 예를 들어 .string(), .number(), .boolean() 등 필드의 타입을 지정할 수 있다.

- 필수 필드: .required() 메서드를 사용하여 필드가 반드시 존재해야 함을 명시할 수 있다.

- 값 범위 검사: .min(), .max() 메서드를 사용하여 값의 최소 및 최대 범위를 검사할 수 있다. 예를 들어, .min(18)은 값이 18보다 크거나 같아야 함을 의미함.

- 패턴 검사: .matches() 메서드를 사용하여 정규식 패턴을 통한 값의 형식을 검사할 수 있다. 예를 들어, .matches(/^\d{4}$/)은 4자리 숫자인지 확인한다.

- 에러 메시지: 각 유효성 검사 규칙에 대한 커스텀 에러 메시지를 설정할 수 있다. .required('Custom error message')와 같이 사용할 수 있다.

- 체이닝: Yup은 메서드 체이닝을 통해 여러 유효성 검사 규칙을 연결할 수 있다. 예를 들어, .string().required().min(6)과 같이 사용할 수 있다.

- 유효성 검사 실행: 정의된 스키마에 따라 데이터의 유효성을 검사할 수 있다. schema.validate(data, options) 메서드를 사용하여 유효성 검사를 수행한다. 유효성 검사에 성공하면 Promise가 해결되고(resolve), 실패하면 Promise가 거부됨(reject).

- 리터럴 타입과 같은 좁혀진 타입에 대한 유효성 검사: .oneOf([]) 메소드를 활용해서 배열내에있는 값만 입력받을 수 있도록 만들 수 있다. 이를 통해 타입스크립트와 호완이 가능하도록 만들 수 있다. (oneOf 메소드를 사용하지않으면 타입스크립트가 레터럴 타입을 string으로 인식해버림)

#### yup의 기본값 설정
아래와 같이 별도의 설정을 하지않아도 노출되는 유효성검사 텍스트를 정의가능하다.
```tsx
const REQUIRED_INPUT_VALID_TEXT = '필수입력';
const POSITIVE_TEXT = '양수값을 입력해주세요';
const MAX_TEXT = '999이하로 입력해주세요';
const MIN_TEXT = '1이상 입력해주세요';

//기본값으로 노출되는 yup validation의 값들을 커스터마이징한다.
yup.setLocale({
  mixed: {
    required: REQUIRED_INPUT_VALID_TEXT,
  },
  number: {
    positive: POSITIVE_TEXT,
    max: MAX_TEXT,
    min: MIN_TEXT,
  },
});

```

#### yup ref 활용
```tsx
const schema = yup.object({
  age: yup.number().required(),
  retirementAge: yup
    .number()
    .required()
    .min(yup.ref('age'), '퇴직 나이는 나이보다 작거나 같아야 합니다.'),
});
```
#### yup의 test 활용
```tsx
const schema = yup.object({
  password: yup.string(),
  confirmPassword: yup.string().test(
    'password-match', //고유 키값
    '비밀번호와 일치해야 합니다.',
    function (value) {
      // ref를 통해 password정보를 호출하고 value와 값이 일치하는지 점검
      return value === this.resolve(yup.ref('password'));
    }
  ),
});
```


#### yup을 React-Hook-Form에 사용하려면?
아래와 같이 yupResolver로 yup과 호완이 되도록 만들어주면 된다.
```tsx
  const methods = useForm({
    resolver: yupResolver(schema.testSchema),
    defaultValues: {
      title: '',
    },
  });
```

### 이번 챕터를 하며
여러므로 재밌는 챕터였네요. React-Hook-Form을 사용하는 이유를 다시한번 상기해볼 수 있었고, 컴파운드 패턴기반으로 가독성을 높인 컴포넌트도 작성해봐서 좋았어요. 또한 저희가 얼마나 타입체킹을 안한채로 리액트 훅폼을 작성하고 있었는지에 대해서도 생각해볼 수 있었고, 다음부터는 좀 더 타입체킹을 잘하며 리액트 훅폼을 써야겠다는 반성도 해봅니다.
