import { Controller, FormProvider, RegisterOptions, useForm, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import PageMetaComponents from '../components/PageMetaComponent';

// RadioButton props type
interface IRadioButton {
  // Form 요소 name
  name: string;
  // RadioButton의 option Array
  options: IOptions[];
  // validation
  rules?: RegisterOptions;
}

// Option type
interface IOptions {
  value: string;
  label: string;
}

export const RadioButtonComponent: React.FC<IRadioButton> = ({ name, options, rules }) => {
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
      {/* options 배열을 순회하면서 각 옵션에 대해 라디오 버튼 생성 */}
      {options.map((option) => (
        <div key={option.value}>
          <label>
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
                // value: 각 라디오 버튼의 값을 설정, 사용자가 선택한 값이 이 값과 일치하면 해당 라디오 버튼이 선택된 상태가 됨
                // checked: 현재 선택된 값(field.value)가 라디오 버튼의 값(option.value)와 일치하는지 확인하여 선택 상태 결정
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {option.label}
          </label>
        </div>
      ))}
      {errors[name]?.message && <p>{errors[name]?.message?.toString()}</p>}
    </div>
  );
};

export default function Chapter9() {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const options = [
    { value: 'MAN', label: '남자' },
    { value: 'WOMAN', label: '여자' },
  ];
  return (
    <>
      <PageMetaComponents siteName={'Chapter9'} title={'Chapter9'} siteUrl={'Chapter9'} desc={'Chapter9'} />
      <S.Chapter9>
        <S.AlignBox>
          {/* FormProvider: 폼 상태와 메서드를 컨텍스트로 제공하여, 폼 내의 모든 하위 컴포넌트가 해당 상태와 메서드에 접근할 수 있도록 해줌 */}
          {/* 이를 통해 폼 상태를 최상위 컴포넌트에서 관리가능 */}
          {/* 폼 상태 공유 및, 유연성, 코드 분리가 유용해 가독성 및 유지보수성을 높일수있음 */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <RadioButtonComponent name={'radioOption'} options={options} rules={{ required: 'This field is required' }} />
              <button type="submit">Submit</button>
            </form>
          </FormProvider>
        </S.AlignBox>
      </S.Chapter9>
      ;
    </>
  );
}

const S = {
  Chapter9: styled.div``,
  AlignBox: styled.div`
    margin: 30px;
  `,
};
