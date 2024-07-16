import styled from 'styled-components';

const colors = {
  white: '#ffffff',
  red: '#ff0000',
  blue: '#0000ff',
  yellow: '#ffff00',
} as const;

// 특정 타입(오브젝트)의 value값만 입력 받을 수 있는 valueOf
type valueOf<T> = T[keyof T];
type ColorsType = typeof colors;
type ColorsTypeValue = valueOf<ColorsType>;

// 색상객체의 키정보만을 입력받을수 있는 인터페이스
type ColorKeys = keyof typeof colors;
interface ColorInterface {
  color: ColorKeys;
}

export default function Chapter2() {
  return <S.Chapter2>Chapter2</S.Chapter2>;
}

const S = {
  Chapter2: styled.div``,
};
