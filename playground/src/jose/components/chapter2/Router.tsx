import routerPath from '@/jose/constants/routerPath';
import Chapter2 from '@/jose/pages/Chapter2';
import { Route, Routes } from 'react-router-dom';
import Chapter2s1 from './Chapter2s1';
import Chapter2s3 from './Chapter2s3';
import Chapter2s2 from './Chapter2s2';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Chapter2 />} />
      <Route path={routerPath.CHAPTER_2_1} element={<Chapter2s1 />} />
      <Route path={routerPath.CHAPTER_2_2} element={<Chapter2s2 />} />
      <Route path={routerPath.CHAPTER_2_3} element={<Chapter2s3 />} />
    </Routes>
  );
}
