# 값의 재설정 (setValue & reset)

## reset

```javascript
const {
  control,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
});
```

1. useForm() 을 통해서 불러온 const 함수 중 rest 사용
2. `reset({ ...e.row.data, remark: e.row.data.remark || undefined });`
3. 이렇게 사용된 reset 은 form 안의 필드값과 에러값을 초기화함
4. 자신이 넣고 싶은 데이터를 통해서 초기화 가능

## setValue

```javascript
const {
  control,
  handleSubmit,
  watch,
  setValue,
  reset,
  trigger,
  formState: { errors },
} = useForm({
  defaultValues: null,
  resolver: yupResolver(schema),
});
```

1. setValue는 동적으로 `<input />` 또는 `<select />` 값을 설정할 수 있다.

```javascript
<LossCostModal
  onClose={closeModal}
  closable={true}
  visible={true}
  maskClosable={false}
  dataGrid={dataGridRef}
  setValue={setValue}
/>
```

2. LossConstModal 의 매개변수에 setValue 를 넣어준다.
3. 필드값에 setValue 라는 함수를 넣어준다.

```javascript
const onSelect = () => {
  setValue("code", selectRowData.code);
  onClose();
};
```

4. 해당 함수는 `<button />` 의 onClick 이벤트 함수에 들어가게 된다.
5. 매개변수로 가져온` setValue("key", value);`를 통해 `input` 값을 바꾼다.
