import styled from 'styled-components';
import routerPath from '../constants/routerPath';
import { useNavigate } from 'react-router-dom';
import { buttonBasic, pageBasic } from '@/common/styles/Common';

export default function Chapter2() {
  const navigate = useNavigate();
  return (
    <S.Chapter2>
      <button onClick={() => navigate(routerPath.CHAPTER_2_1)}>Chapter2s1</button>
      <button onClick={() => navigate(routerPath.CHAPTER_2_2)}>Chapter2s2</button>
      <button onClick={() => navigate(routerPath.CHAPTER_2_3)}>Chapter2s3</button>
    </S.Chapter2>
  );
}

const S = {
  Chapter2: styled.div`
    ${pageBasic}
    ${buttonBasic}
  `,
};
