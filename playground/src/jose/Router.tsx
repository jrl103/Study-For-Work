import { Route, Routes } from 'react-router-dom';
import routerPath from './constants/routerPath';
import Chapter1 from './pages/Chapter1';
import Router2 from './components/chapter2/Router';
import Router3 from './components/chapter3/Router';
import Router4 from './components/chapter4/Router';
import Page from './pages';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path={routerPath.CHAPTER_1} element={<Chapter1 />} />
      <Route path={`${routerPath.CHAPTER_2}/*`} element={<Router2 />} />
      <Route path={`${routerPath.CHAPTER_3}/*`} element={<Router3 />} />
      <Route path={`${routerPath.CHAPTER_4}/*`} element={<Router4 />} />
    </Routes>
  );
}
