import { pageBasic } from '@/common/styles/Common';
import styled from 'styled-components';
import RefCounter from './RefCounter';

export default function Chapter2s2() {
  return (
    <S.Chapter2s2>
      <RefCounter />
    </S.Chapter2s2>
  );
}

const S = {
  Chapter2s2: styled.div`
    ${pageBasic}
  `,
};
