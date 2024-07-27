import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues } from 'react-hook-form';

interface IProps {
  name: string;
  errors: FieldErrors<FieldValues>;
  margin?: string;
}

export default function ErrorText({ name, errors }: IProps) {
  return (
    <S.ErrorText>
      <ErrorMessage errors={errors} name={name} />
    </S.ErrorText>
  );
}

const S = {
  ErrorText: styled.div`
    height: 15px;
    font-size: 12px;
    color: red;
  `,
};
