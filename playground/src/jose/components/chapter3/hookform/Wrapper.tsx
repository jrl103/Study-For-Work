import { DefaultValues, FieldValues, FormProvider, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

interface Props<T extends FieldValues> {
  resolver?: Resolver<T, any>;
  children?: React.ReactNode;
  defaultValues: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  submitButtonLabel?: string;
}

export default function Wrapper<T extends FieldValues>({
  resolver,
  children,
  defaultValues,
  onSubmit,
  submitButtonLabel = '등록',
}: Props<T>) {
  const methods = useForm<T>({
    resolver,
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <S.Wrapper onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <button className="wrapper__submit-button">{submitButtonLabel}</button>
      </S.Wrapper>
    </FormProvider>
  );
}

const S = {
  Wrapper: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
};
