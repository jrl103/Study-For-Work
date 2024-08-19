import { useEffect } from 'react';
import { Controller, FormProvider, RegisterOptions, useForm, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import PageMetaComponents from '../components/PageMetaComponent';

// CheckBox props type
interface ICheckBox {
  // Form 요소 name
  name: string;
  // Form 요소 라벨
  label: string;
  // validation
  rules?: RegisterOptions;
}

export const CheckBoxComponent: React.FC<ICheckBox> = ({ name, label, rules }) => {
  // FormProvider로 감싸진 컴포넌트내에서 폼 상태를 쉽게 접근하고 관리하기위해 useFormContext사용
  const {
    // control
    // 폼의 상태와 동작을 관리하는 역할
    // register와 unregister와 같은 필드 등록 및 해제나, 검증 관리, 폼 상태관리 모두를 다루는 역할
    // 폼 필드의 값이 변경될 때마다 상태를 업데이트하고, 폼의 전체 상태를 추적
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {/* react-hook-form의 폼 상태와 입력 필드의 값을 동기화 시키기 위해 Controller 사용 */}
      {/* name: 폼 필드의 이름을 지정 */}
      {/* control: useForm 또는 useFormContext에서 가져온 control 객체를 지정 */}
      {/* rules: 입력 필드에 적용할 검증 규칙을 정의 */}
      {/* render: 실제 입력 필드를 렌더링하는 함수를 정의, field 객체를 인자로 받아 입력 필드의 이벤트및 상태를 관리 */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            {/* true: Y, false: N */}
            {/* checked: 실제 checkbox에 체크유무값, boolean으로 움직임 */}
            {/* onChange: e.target.checked가 boolean값으로 오므로 그거에 따른 value 포매팅 */}
            <input type="checkbox" checked={field.value === 'Y'} onChange={(e) => field.onChange(e.target.checked ? 'Y' : 'N')} />
          </>
        )}
      />
      {label}
      {errors[name]?.message && <p>{errors[name]?.message?.toString()}</p>}
    </div>
  );
};

export default function Chapter8() {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <PageMetaComponents siteName={'Chapter8'} title={'Chapter8'} siteUrl={'Chapter8'} desc={'Chapter8'} />
      <S.Chapter8>
        <S.AlignBox>
          {/* FormProvider: 폼 상태와 메서드를 컨텍스트로 제공하여, 폼 내의 모든 하위 컴포넌트가 해당 상태와 메서드에 접근할 수 있도록 해줌 */}
          {/* 이를 통해 폼 상태를 최상위 컴포넌트에서 관리가능 */}
          {/* 폼 상태 공유 및, 유연성, 코드 분리가 유용해 가독성 및 유지보수성을 높일수있음 */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <CheckBoxComponent name="first" label="동의여부" rules={{ required: '필수!!' }} />
              <button type="submit">Submit</button>
            </form>
          </FormProvider>
        </S.AlignBox>
      </S.Chapter8>
      ;
    </>
  );
}

const S = {
  Chapter8: styled.div``,
  AlignBox: styled.div`
    margin: 30px;
  `,
};
