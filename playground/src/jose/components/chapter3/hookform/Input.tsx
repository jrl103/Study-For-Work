import React from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import ErrorText from './ErrorText';

interface Props<T extends FieldValues> extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: Path<T>;
  label?: string;
}

export default function Input<T extends FieldValues>({ name, label, ...rest }: Props<T>) {
  const {
    formState: { errors },
    register,
  } = useFormContext<T>();
  return (
    <S.Input>
      <span className="input__label">{label}</span>
      <input {...rest} {...register(name)} />
      <ErrorText name={name} errors={errors} />
    </S.Input>
  );
}

const S = {
  Input: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    .input {
      &__label {
        font-size: 15px;
        font-weight: 500;
      }
    }
  `,
};
