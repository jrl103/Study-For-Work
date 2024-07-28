import * as yup from 'yup';
import { regex } from './regex';

const SPACES_VALID_TEXT = '공백을 지워주세요';
const MORE_TEXT = (more: number) => `${more}자 이상`;
const LESS_TEXT = (less: number) => `${less}자 이하`;

const REQUIRED_INPUT_VALID_TEXT = '필수입력';
const POSITIVE_TEXT = '양수값을 입력해주세요';
const MAX_TEXT = '999이하로 입력해주세요';
const MIN_TEXT = '1이상 입력해주세요';
const PASSWORD_TEXT = '영 대소문자,특수문자,숫자를 포함한 8자이상';
const MIN_AGE_LIMIT = (more: number) => `${more}세 이상만 가입가능합니다.`;
const PHONE_NUMBER_TEXT = '10자에서 15자이상의 숫자로만 구성해주세요.';
const NUMBER_VALID_TEXT = '숫자만 입력해주세요';

const URL_VALID_TEXT = 'URL 형식에 맞게 작성해주세요';
const EMAIL_VALID_TEXT = '이메일 형식을 확인해주세요';

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

export const rule = {
  EMAIL: ({ minLength = 0, maxLength = 999 }: { minLength?: number; maxLength?: number }) =>
    yup.string().required().email(EMAIL_VALID_TEXT).min(minLength, MORE_TEXT(minLength)).max(maxLength, LESS_TEXT(maxLength)),
  REQUIRED_TEXT: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .required()
      .matches(regex.firstSpace, SPACES_VALID_TEXT)
      .matches(regex.lastSpace, SPACES_VALID_TEXT)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),
  // Y와 N이라는 값만 들어올 수 있게 하면서 레터럴 타입체킹을 할때 타입스크립트와 호완되도록 작성했습니다.
  REQUIRED_SELECT_CHECK: yup
    .string()
    .oneOf(['Y', 'N'], "입력값은 'Y' 또는 'N'이어야 합니다.")
    .required('필수선택')
    .test('check-test', '필수선택', (value) => {
      return value === 'Y';
    }),
  PASSWORD: yup.string().required().matches(regex.password, PASSWORD_TEXT), //정규표현식 비밀번호
  PASSWORD_CHECK: yup
    .string()
    .required()
    .test(
      'password-match', //고유 키값
      '비밀번호와 일치해야 합니다.',
      function (value) {
        // 화살표함수는 this를 못가지므로 function을 써주셔야합니다.
        return value === this.resolve(yup.ref('password'));
      },
    ),
  SELECT_GENDER: yup.string().required().oneOf(['MAN', 'WOMAN'], '입력값은 여성 또는 남성이어야 합니다.'),
  LIMITED_AGE: (minNumber: number) => yup.number().typeError(NUMBER_VALID_TEXT).required().min(minNumber, MIN_AGE_LIMIT(minNumber)),
  PHONE_NUMBER: yup.string().matches(regex.phoneNumber, PHONE_NUMBER_TEXT),
  URL: yup.string().required().matches(regex.url, URL_VALID_TEXT),
};
