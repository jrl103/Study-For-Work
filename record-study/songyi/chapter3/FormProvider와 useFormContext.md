# FormProvider와 useFormContext

## FormProvider

- React Hook Form 에서 제공하는 컴포넌트
- React Context API 를 기반으로 구현됨
- `상위 컴포넌트로 폼 데이터와 관련된 상태와 메서드를 전달`하기 위해 사용됨

## useFormContext

- React Hook Form 의 컨텍스트에 접근하기 위한 커스텀 훅
- `컨텍스트를 prop 으로 전달하는 것이 불편한 깊은 중첩 구조에서도 컨텍스트에 접근 가능`
- `useForm` 에서 `반환하는 모든 메서드와 속성`을 가져올 수 있음

  - 즉, useForm 의 반환값을 `그대로 사용 가능`

- 사용하기 위해서는 폼을 FormProvider 컴포넌트로 감싸주어야 함
  : --> FormProvider 컴포넌트에 useForm 에서 반환한 메서드와 속성을 전달
  : --> useFormContext 호출하여 해당 메서드와 속성 가져오기
