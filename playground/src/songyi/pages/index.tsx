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
      <button onClick={() => navigate(routerPath.CHAPTER_4)}>Chapter4</button>
      <button onClick={() => navigate(routerPath.CHAPTER_5)}>Chapter5</button>
      <button onClick={() => navigate(routerPath.CHAPTER_6)}>Chapter6</button>
      <button onClick={() => navigate(routerPath.CHAPTER_7)}>Chapter7</button>
      <button onClick={() => navigate(routerPath.CHAPTER_8)}>Chapter8</button>
      <button onClick={() => navigate(routerPath.CHAPTER_9)}>Chapter9</button>
      <button onClick={() => navigate(routerPath.CHAPTER_10)}>Chapter10</button>
      <button onClick={() => navigate(routerPath.CHAPTER_11)}>Chapter11</button>
      <button onClick={() => navigate(routerPath.CHAPTER_12)}>Chapter12</button>
    </S.Home>
  );
}

const S = {
  Home: styled.div`
    ${pageBasic}
    ${buttonBasic}
  `,
};
