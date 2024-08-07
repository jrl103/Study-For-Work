import { flexCenter } from '@/common/styles/Common';
import styled from 'styled-components';

export default function ErrorComponent() {
  return <S.ErrorComponent>에러발생!!</S.ErrorComponent>;
}

const S = {
  ErrorComponent: styled.div`
    width: 100%;
    height: 400px;
    ${flexCenter}
  `,
};
