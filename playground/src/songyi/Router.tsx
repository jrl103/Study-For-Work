import { Route, Routes } from 'react-router-dom';
import routerPath from '@/songyi/constants/routerPath';
import Home from './pages';
import Chapter1 from './pages/Chapter1';
import Chapter2 from './pages/Chapter2';
import Chapter3 from './pages/Chapter3';
import Chapter4 from './pages/Chapter4';
import Chapter5 from './pages/Chapter5';
import Chapter6 from './pages/Chapter6';
import Chapter7 from './pages/Chapter7';
import Chapter8 from './pages/Chapter8';
import Chapter9 from './pages/Chapter9';
import Chapter10 from './pages/Chapter10';
import Chapter11 from './pages/Chapter11';
import Chapter12 from './pages/Chapter12';

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
      <Route path={routerPath.CHAPTER_7} element={<Chapter7 />} />
      <Route path={routerPath.CHAPTER_8} element={<Chapter8 />} />
      <Route path={routerPath.CHAPTER_9} element={<Chapter9 />} />
      <Route path={routerPath.CHAPTER_10} element={<Chapter10 />} />
      <Route path={routerPath.CHAPTER_11} element={<Chapter11 />} />
      <Route path={routerPath.CHAPTER_12} element={<Chapter12 />} />
    </Routes>
  );
}
