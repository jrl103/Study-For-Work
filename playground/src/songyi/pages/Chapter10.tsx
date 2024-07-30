import styled from 'styled-components';
import { InputComponent } from './Chapter7';
import { CheckBoxComponent } from './Chapter8';
import { RadioButtonComponent } from './Chapter9';
import { FormProvider, useForm } from 'react-hook-form';

interface IOption {
  value: string;
  label: string;
}

interface IFormData {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  phoneNum?: string;
  gender: 'MAN' | 'WOMAN';
  age: number;
  webSiteUrl?: string;
  status: 'Y' | 'N';
}

const options: IOption[] = [
  { value: 'MAN', label: '남자' },
  { value: 'WOMAN', label: '여자' },
];

// 각 폼 요소들 validation
const FormValidation = {
  name: {
    required: '필수 값입니다.',
    minLength: {
      value: 2,
      message: '최소 2자 이상 입력해주세요',
    },
    maxLength: {
      value: 50,
      message: '최대 50자까지 입력할 수 있습니다',
    },
  },
  email: {
    required: '필수 값입니다.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '이메일 형식이 맞지않습니다',
    },
  },
  password: {
    required: '필수 값입니다.',
    minLength: {
      value: 8,
      message: '최소 8자 이상 입력해주세요',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: '하나 이상의 대문자, 소문자, 숫자 및 특수 문자를 포함해주세요',
    },
  },
  passwordCheck: {
    required: '필수 값입니다.',
    minLength: {
      value: 8,
      message: '최소 8자 이상 입력해주세요',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: '하나 이상의 대문자, 소문자, 숫자 및 특수 문자를 포함해주세요',
    },
  },
  phoneNum: {
    minLength: {
      value: 10,
      message: '10 ~ 15자 사이의 숫자를 입력해주세요',
    },
    maxLength: {
      value: 15,
      message: '10 ~ 15자 사이의 숫자를 입력해주세요',
    },
  },
  gender: {
    required: '필수 값입니다.',
    pattern: {
      value: /^(WOMAN|MAN)$/,
      message: 'WOMAN 혹은 MAN값만 기입이 가능합니다',
    },
  },
  age: {
    required: '필수 값입니다.',
    min: {
      value: 18,
      message: '18세 이상만 가능합니다',
    },
    pattern: {
      value: /^[0-9]+$/,
      message: '숫자만 입력 가능합니다',
    },
  },
  webSiteUrl: {
    pattern: {
      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      message: '올바른 URL 형식을 입력해주세요',
    },
  },
  status: {
    required: '필수체크 항목입니다.',
    pattern: {
      value: /^[Y]+$/,
      message: '필수체크 항목입니다',
    },
  },
};

export default function Chapter10() {
  const methods = useForm<IFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      phoneNum: '',
      gender: 'MAN',
      age: 0,
      webSiteUrl: '',
      status: 'N',
    },
  });

  const onSubmit = (data: IFormData) => {
    console.log(data);
  };

  return (
    <>
      <S.Chapter10>
        <S.AlignBox>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div>
                <p>이름</p>
                <InputComponent name="name" rules={FormValidation.name} />
              </div>
              <div>
                <p>이메일</p>
                {/* name 필드의 value가 4자 이상일때만 활성화 */}
                <InputComponent
                  disabled={!methods.watch('name') || methods.watch('name').length < 4}
                  name="email"
                  rules={FormValidation.email}
                />
              </div>
              <div>
                <p>비밀번호</p>
                <InputComponent type={'password'} name="password" rules={FormValidation.password} />
              </div>
              <div>
                <p>비밀번호 확인</p>
                <InputComponent
                  type={'password'}
                  name="passwordCheck"
                  rules={{
                    ...FormValidation.passwordCheck,
                    // 기존 validation 옵션을 유지하면서 추가로 validate로 입력필드의 값을 검증하는 사용자 정의 함수 구현
                    // value 인자: 현재 검증 중인 필드의 값을 가져옴
                    // getValues를 통해 password 필드의 값을 가져와서 검증 중인 필드의 값이랑 비교
                    validate: (value: any) => {
                      const password = methods.getValues('password');
                      return value === password || '비밀번호가 일치하지 않습니다';
                    },
                  }}
                />
              </div>
              <div>
                <p>전화번호</p>
                <InputComponent name="phoneNum" rules={FormValidation.phoneNum} />
              </div>
              <div>
                <p>성별</p>
                <RadioButtonComponent name={'gender'} options={options} rules={FormValidation.gender} />
              </div>
              <div>
                <p>나이</p>
                <InputComponent name={'age'} rules={FormValidation.age} />
              </div>
              <div>
                <p>웹사이트</p>
                <InputComponent name="webSiteUrl" rules={FormValidation.webSiteUrl} />
              </div>
              <div>
                <CheckBoxComponent name="status" label="동의여부" rules={FormValidation.status} />
              </div>
              <button type="submit">Submit</button>
            </form>
          </FormProvider>
        </S.AlignBox>
      </S.Chapter10>
      ;
    </>
  );
}

const S = {
  Chapter10: styled.div``,
  AlignBox: styled.div`
    margin: 30px;
  `,
};
