# 유효성 검사방법과 yup

## Scheme Validation

- 리액트 훅 폼은 `Yup, Zod, Superstruct & Joi` 를 통해 `스키마 기반 폼 유효성 검사`를 지원
- 스키마에 대한 입력 데이터를 유효하게 처리하고 오류 또는 유효한 결과를 반환

## Yup ?

- 런타임 값 구문 분석 및 유효성 검사를 위한 스키마 빌드
- 스키마를 정의하거나, 일치하도록 값을 변환하거나, 기존 값의 shape 를 주장하거나, 둘 다 지정함
- 스키마는 표현력이 뛰어나며 복잡한 상호 의존적인 유효성 검사 또는 값 변환을 모델링할 수 있음

## Yup 적용 방법

### 1. yup: 개별 적용

```javascript
import * as yup from "yup";

const firstName = yup.string().required();
// firstName은 string이어야 하며 필수 조건이다.

const age = yup.number().positive().integer().required();
// age는 number 타입이어야 하며, 양수, 정수, 필수 조건이다.
```

### 2. yup.object(): 객체 스키마 정의

```javascript
import * as yup from "yup";
const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required(); //

// yup.object를 선언하여 키(검사할 속성): 값(유효성 로직)을 schema에 담아준다.
```

### 3. yup.object().shape(): 중첩 객체 스키마 정의

```javascript
import * as yup from "yup";
const schema = yup.object().shape({
  firstName: yup.string().required,

  age: yup.number().positive().integer().required(),
});
```

- object 나 shape() 을 사용할 경우, 해당하는 모든 조건이 맞아야 유효성 검사를 통과하게 됨으로 주의해야 함

## matches

주로 정규 표현식으로 복잡한 유효성 검사가 필요할 때 matches() 안에 해당 로직을 넣어줌

### 1. matches() 안에 직접 적용

```javascript
email: yup
    .string()
    .required("이메일을 필수로 입력해주세요")
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      "email 형식에 맞지 않습니다"
    ),
```

### 2. const/regex.js 에 분리 후 export 하여 사용

```javascript
// consts/regex.js
export const REGEX = {
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  password: //생략,
  phone: // 생략,
  age:
}

// consts/schema.js
import { REGEX } from "./regex";
email: yup
    .string()
    .required("이메일을 필수로 입력해주세요")
    .matches(REGEX.email),
```

## Controller

재사용 가능한 input 태그를 Controller 로 만들었다.

```javascript
import { FormHelperText, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const OneInput = ({ control, name, label, value, errors, ...rest }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <div style={{ marginBottom: "20px" }}>
          <TextField
            style={{ width: "400px" }}
            label={label}
            variant="standard"
            value={value}
            onChange={onChange}
            error={errors[name]}
          />
          {errors[name] && (
            <FormHelperText style={{ textAlign: "center" }} error>
              {errors[name].message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
};

export default OneInput;
```
