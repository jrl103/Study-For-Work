import styled from 'styled-components';
import Form from './hookform';
import { SubmitHandler } from 'react-hook-form';
import { pageBasic } from '@/common/styles/Common';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validate/schema';

interface User {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  phoneNumber?: string;
  gender: 'WOMAN' | 'MAN';
  age: number;
  webSite: string;
  agreement: 'Y' | 'N';
}

const initUser: User = {
  name: '',
  email: '',
  password: '',
  passwordCheck: '',
  phoneNumber: '',
  gender: 'MAN',
  age: 0,
  webSite: '',
  agreement: 'N',
};

export default function Chapter3s4() {
  const handleShowUserinfo: SubmitHandler<User> = (submitData) => {
    alert(JSON.stringify(submitData));
  };
  return (
    <S.Chapter3s4>
      <Form.Wrapper<User> resolver={yupResolver(schema.userSubmitSchema)} onSubmit={handleShowUserinfo} defaultValues={initUser}>
        <Form.Input<User> name="name" label="이름" />
        <Form.Input<User> name="email" label="이메일" />
        <Form.Input<User> name="password" label="비밀번호" type="password" />
        <Form.Input<User> name="passwordCheck" label="비밀번호 확인" type="password" />
        <Form.Input<User> name="phoneNumber" label="전화번호" />
        <div className="radio-wrapper">
          <Form.RadioButton<User> name="gender" value="MAN">
            남성
          </Form.RadioButton>
          <Form.RadioButton<User> name="gender" value="WOMAN">
            여성
          </Form.RadioButton>
        </div>
        <Form.Input<User> name="age" label="나이" />
        <Form.Input<User> name="webSite" label="웹사이트 주소" />
        <Form.CheckBoxYN<User> name="agreement">약관에 동의합니다.</Form.CheckBoxYN>
      </Form.Wrapper>
    </S.Chapter3s4>
  );
}

const S = {
  Chapter3s4: styled.div`
    ${pageBasic}
    .radio-wrapper {
      display: flex;
      gap: 20px;
    }
  `,
};
