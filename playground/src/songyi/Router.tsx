import { Route, Routes } from 'react-router-dom';
import routerPath from '@/songyi/constants/routerPath';
import Home from './pages';
import Chapter1 from './pages/Chapter1';
import Chapter2 from './pages/Chapter2';
import Chapter3 from './pages/Chapter3';
import Chapter4 from './pages/Chapter4';
import Chapter5 from './pages/Chapter5';
import Chapter6 from './pages/Chapter6';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={routerPath.CHAPTER_1} element={<Chapter1 />} />
      <Route path={routerPath.CHAPTER_2} element={<Chapter2 />} />
      <Route path={routerPath.CHAPTER_3} element={<Chapter3 />} />
      <Route path={routerPath.CHAPTER_4} element={<Chapter4 />} />
      <Route path={routerPath.CHAPTER_5} element={<Chapter5 />} />
      <Route path={routerPath.CHAPTER_6} element={<Chapter6 />} />
    </Routes>
  );
}
