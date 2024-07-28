import styled from 'styled-components';
import Form from './hookform';
import { SubmitHandler } from 'react-hook-form';
import { pageBasic } from '@/common/styles/Common';

interface Gender {
  type: 'WOMAN' | 'MAN';
}

interface TooMany {
  number: '1' | '2' | '3' | '4' | '5';
}

export default function Chapter3s3() {
  const handleShowGender: SubmitHandler<Gender> = (submitData: Gender) => {
    alert(submitData.type);
  };

  const handleShowNumber: SubmitHandler<TooMany> = (submitData: TooMany) => {
    alert(submitData.number);
  };

  return (
    <S.Chapter3s3>
      <Form.Wrapper<Gender> onSubmit={handleShowGender} defaultValues={{ type: 'MAN' }}>
        <Form.RadioButton<Gender> name="type" value="MAN">
          남성
        </Form.RadioButton>
        <Form.RadioButton<Gender> name="type" value="WOMAN">
          여성
        </Form.RadioButton>
      </Form.Wrapper>
      <div className="space" />
      <Form.Wrapper<TooMany> onSubmit={handleShowNumber} defaultValues={{ number: '1' }}>
        {/* 조금 고민되는건 이렇게 children으로 라벨정보를 받는게 괜찮은지? 가독성은 확보가 되는지? */}
        <Form.RadioButton<TooMany> name="number" value="1">
          첫번째
        </Form.RadioButton>
        <Form.RadioButton<TooMany> name="number" value="2">
          두번째
        </Form.RadioButton>
        <Form.RadioButton<TooMany> name="number" value="3">
          세번째
        </Form.RadioButton>
        <Form.RadioButton<TooMany> name="number" value="4">
          네번째
        </Form.RadioButton>
        <Form.RadioButton<TooMany> name="number" value="5">
          다섯번째
        </Form.RadioButton>
      </Form.Wrapper>
    </S.Chapter3s3>
  );
}

const S = {
  Chapter3s3: styled.div`
    width: 500px;
    ${pageBasic}
    .space {
      height: 100px;
    }
  `,
};
