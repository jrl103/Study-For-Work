import { flexCenter } from '@/common/styles/Common';
import styled from 'styled-components';

export default function Loading() {
  return <S.Loading>로딩중...</S.Loading>;
}

const S = {
  Loading: styled.div`
    width: 100%;
    ${flexCenter}
    height: 400px;
    font-size: 16px;
    font-weight: 600;
  `,
};
