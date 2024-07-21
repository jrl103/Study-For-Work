import { Route, Routes } from 'react-router-dom';
import routerPath from './constants/routerPath';
import Chapter1 from './pages/Chapter1';
import Router2 from './components/chapter2/Router';
import Chapter3 from './pages/Chapter3';
import Page from './pages';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path={routerPath.CHAPTER_1} element={<Chapter1 />} />
      <Route path={`${routerPath.CHAPTER_2}/*`} element={<Router2 />} />
      <Route path={routerPath.CHAPTER_3} element={<Chapter3 />} />
    </Routes>
  );
}
