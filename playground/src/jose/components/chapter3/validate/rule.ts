import * as yup from 'yup';
import { regex } from './regex';

const SPACES_VALID_TEXT = '공백을 지워주세요';
const MORE_TEXT = (more: number) => `${more}자 이상`;
const LESS_TEXT = (less: number) => `${less}자 이하`;

const REQUIRED_INPUT_VALID_TEXT = '필수입력';

//기본값으로 노출되는 yup validation의 값들을 커스터마이징한다.
yup.setLocale({
  mixed: {
    required: REQUIRED_INPUT_VALID_TEXT,
  },
  number: {
    positive: '양수값을 입력해주세요',
    max: '999이하로 입력해주세요',
    min: '1이상 입력해주세요',
  },
});

export const rule = {
  REQUIRED_TEXT: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .required()
      .matches(regex.firstSpace, SPACES_VALID_TEXT)
      .matches(regex.lastSpace, SPACES_VALID_TEXT)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),
  // Y와 N이라는 값만 들어올 수 있게 하면서 레터럴 타입체킹을 할때 타입스크립트와 호완되도록 작성했습니다.
  REQUIRED_SELECT_CHECK: () =>
    yup
      .string()
      .oneOf(['Y', 'N'], "입력값은 'Y' 또는 'N'이어야 합니다.")
      .required('필수선택')
      .test('check-test', '필수선택', (value) => {
        return value === 'Y';
      }),
};
