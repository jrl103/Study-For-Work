import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import routerPath from '../constants/routerPath';
import { buttonBasic, pageBasic } from '@/common/styles/Common';

export default function Chapter3() {
  const navigate = useNavigate();
  return (
    <S.Chapter3>
      <button onClick={() => navigate(routerPath.CHAPTER_3_1)}>Chapter3s1</button>
      <button onClick={() => navigate(routerPath.CHAPTER_3_2)}>Chapter3s2</button>
      <button onClick={() => navigate(routerPath.CHAPTER_3_3)}>Chapter3s3</button>
      <button onClick={() => navigate(routerPath.CHAPTER_3_4)}>Chapter3s4</button>
    </S.Chapter3>
  );
}

const S = {
  Chapter3: styled.div`
    ${pageBasic}
    ${buttonBasic}
  `,
};
