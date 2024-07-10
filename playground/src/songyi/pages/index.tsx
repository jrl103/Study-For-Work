import { buttonBasic, pageBasic } from '@/common/styles/Common';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import routerPath from '../constants/routerPath';

export default function Home() {
  const navigate = useNavigate();
  return (
    <S.Home>
      <button onClick={() => navigate(routerPath.CHAPTER_1)}>Chapter1</button>
      <button onClick={() => navigate(routerPath.CHAPTER_2)}>Chapter2</button>
      <button onClick={() => navigate(routerPath.CHAPTER_3)}>Chapter3</button>
    </S.Home>
  );
}

const S = {
  Home: styled.div`
    ${pageBasic}
    ${buttonBasic}
  `,
};
