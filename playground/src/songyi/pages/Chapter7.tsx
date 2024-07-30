import { Controller, FieldValues, FormProvider, RegisterOptions, useForm, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

// Input props type
interface IInput {
  // Form 요소 name
  name: string;
  // input 비활성화 여부
  disabled?: boolean;
  // input 타입 2개로 한정
  type?: 'text' | 'password';
  // validation
  rules?: RegisterOptions;
}

export const InputComponent: React.FC<IInput> = ({ name, disabled, type, rules }) => {
  // FormProvider로 감싸진 컴포넌트내에서 폼 상태를 쉽게 접근하고 관리하기위해 useFormContext사용
  const {
    // control
    // 폼의 상태와 동작을 관리하는 역할
    // register와 unregister와 같은 필드 등록 및 해제나, 검증 관리, 폼 상태관리 모두를 다루는 역할
    // 폼 필드의 값이 변경될 때마다 상태를 업데이트하고, 폼의 전체 상태를 추적
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();

  return (
    <div>
      {/* react-hook-form의 폼 상태와 입력 필드의 값을 동기화 시키기 위해 Controller 사용 */}
      {/* name: 폼 필드의 이름을 지정 */}
      {/* control: useForm 또는 useFormContext에서 가져온 control 객체를 지정 */}
      {/* rules: 입력 필드에 적용할 검증 규칙을 정의 */}
      {/* render: 실제 입력 필드를 렌더링하는 함수를 정의, field 객체를 인자로 받아 입력 필드의 이벤트 및 상태를 관리 */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <input {...field} disabled={disabled ?? false} type={type ?? 'text'} />
          </>
        )}
      />
      {errors[name]?.message && <p>{errors[name]?.message?.toString()}</p>}
    </div>
  );
};

export default function Chapter7() {
  const methods = useForm({
    defaultValues: {
      first: '',
      two: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <S.Chapter7>
        <S.AlignBox>
          {/* FormProvider: 폼 상태와 메서드를 컨텍스트로 제공하여, 폼 내의 모든 하위 컴포넌트가 해당 상태와 메서드에 접근할 수 있도록 해줌 */}
          {/* 이를 통해 폼 상태를 최상위 컴포넌트에서 관리가능 */}
          {/* 폼 상태 공유 및, 유연성, 코드 분리가 유용해 가독성 및 유지보수성을 높일수있음 */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <InputComponent name="first" rules={{ required: '필수!!' }} />
              <InputComponent name="two" rules={{ required: '필수!!' }} />
              <button type="submit">Submit</button>
            </form>
          </FormProvider>
        </S.AlignBox>
      </S.Chapter7>
      ;
    </>
  );
}

const S = {
  Chapter7: styled.div``,
  AlignBox: styled.div`
    margin: 30px;
  `,
};
