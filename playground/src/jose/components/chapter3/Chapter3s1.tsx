import { flexCenter } from '@/common/styles/Common';
import styled from 'styled-components';
import Form from './hookform';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validate/schema';
import { SubmitHandler } from 'react-hook-form';

interface User {
  name: string;
}

const initValues = {
  name: '',
};

export default function Chapter3s1() {
  const handleShowName: SubmitHandler<User> = (submitData: User) => {
    alert(submitData.name);
  };
  return (
    <S.Chapter3s1>
      <Form.Wrapper<User> resolver={yupResolver(schema.userSchema)} defaultValues={initValues} onSubmit={handleShowName}>
        <Form.Input<User> name="name" />
      </Form.Wrapper>
    </S.Chapter3s1>
  );
}

const S = {
  Chapter3s1: styled.div`
    ${flexCenter}
  `,
};
