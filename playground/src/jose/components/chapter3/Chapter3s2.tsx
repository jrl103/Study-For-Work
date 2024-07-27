import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { schema } from './validate/schema';
import Form from './hookform';
import { SubmitHandler } from 'react-hook-form';
import { flexCenter } from '@/common/styles/Common';

export interface Agreement {
  agreement: 'Y' | 'N';
}

const initValues: Agreement = {
  agreement: 'N',
};

export default function Chapter3s2() {
  const handleShowAgree: SubmitHandler<Agreement> = (submitData: Agreement) => {
    alert(submitData.agreement);
  };

  return (
    <S.Chapter3s2>
      <Form.Wrapper<Agreement> resolver={yupResolver(schema.agreeSchema)} defaultValues={initValues} onSubmit={handleShowAgree}>
        <Form.CheckBoxYN<Agreement> name="agreement">동의합니다</Form.CheckBoxYN>
      </Form.Wrapper>
    </S.Chapter3s2>
  );
}

const S = {
  Chapter3s2: styled.div`
    ${flexCenter}
  `,
};
