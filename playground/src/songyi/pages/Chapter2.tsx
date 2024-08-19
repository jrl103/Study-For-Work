import styled from 'styled-components';
import PageMetaComponents from '../components/PageMetaComponent';

const colors = {
  white: '#ffffff',
  red: '#ff0000',
  blue: '#0000ff',
  yellow: '#ffff00',
} as const;

// 특정 타입의 value값만 입력 받을 수 있는 valueOf
type valueOf<T> = T[keyof T];
type ColorsType = typeof colors;
type ColorsTypeValue = valueOf<ColorsType>;

// 색상객체의 키정보만을 입력받을수 있는 인터페이스
type ColorKeys = keyof typeof colors;
interface ColorInterface {
  color: ColorKeys;
}

export default function Chapter2() {
  return (
    <>
      <PageMetaComponents siteName={'Chapter2'} title={'Chapter2'} siteUrl={'Chapter2'} desc={'Chapter2'} />
      <S.Chapter2>Chapter2</S.Chapter2>;
    </>
  );
}

const S = {
  Chapter2: styled.div``,
};
