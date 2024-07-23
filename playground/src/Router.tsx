import { Route, Routes } from 'react-router-dom';
import joseRouterPath from '@/jose/constants/routerPath';
import SongyiHome from './songyi';
import JoseHome from './jose';
import songyiRouterPath from '@/songyi/constants/routerPath';
import MainPage from './main';

export default function Router() {
  return (
    <Routes>
      <Route path={'/'} element={<MainPage />} />
      <Route path={`${joseRouterPath.HOME}/*`} element={<JoseHome />} />
      <Route path={`${songyiRouterPath.HOME}/*`} element={<SongyiHome />} />
    </Routes>
  );
}
