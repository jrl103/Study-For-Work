import styled from 'styled-components';
import { flexCenter } from './common/styles/Common';
import { useNavigate } from 'react-router-dom';
import joseRouterPath from './jose/constants/routerPath';
import songyiRouterPath from './songyi/constants/routerPath';

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <S.MainPage>
      <button onClick={() => navigate(joseRouterPath.HOME)}>Jose</button>
      <button onClick={() => navigate(songyiRouterPath.HOME)}>Songyi</button>
    </S.MainPage>
  );
}

const S = {
  MainPage: styled.div`
    width: 100%;
    height: 100vh;
    ${flexCenter};
    flex-direction: column;
    gap: 10px;
    button {
      width: 300px;
      height: 50px;
      font-size: 17px;
      font-weight: 700;
    }
  `,
};
