import { Route, Routes } from 'react-router-dom';
import routerPath from '@/songyi/constants/routerPath';
import Home from './pages';

export default function Router() {
  return (
    <Routes>
      <Route element={<Home />} />
    </Routes>
  );
}
