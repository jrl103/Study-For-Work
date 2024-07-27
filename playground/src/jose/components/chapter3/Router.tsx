import routerPath from '@/jose/constants/routerPath';
import { Route, Routes } from 'react-router-dom';
import Chapter3 from '@/jose/pages/Chapter3';
import Chapter3s1 from './Chapter3s1';
import Chapter3s2 from './Chapter3s2';
import Chapter3s3 from './Chapter3s3';
import Chapter3s4 from './Chapter3s4';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Chapter3 />} />
      <Route path={routerPath.CHAPTER_3_1} element={<Chapter3s1 />} />
      <Route path={routerPath.CHAPTER_3_2} element={<Chapter3s2 />} />
      <Route path={routerPath.CHAPTER_3_3} element={<Chapter3s3 />} />
      <Route path={routerPath.CHAPTER_3_4} element={<Chapter3s4 />} />
    </Routes>
  );
}
