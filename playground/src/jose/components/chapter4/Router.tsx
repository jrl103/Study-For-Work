import { Route, Routes } from 'react-router-dom';
import Chapter4 from '@/jose/pages/Chapter4';
import routerPath from '@/jose/constants/routerPath';
import { ErrorBoundary } from 'react-error-boundary';
import Chapter4s2 from './Chapter4s2';
import Chapter4s3 from './Chapter4s3';
import ErrorComponent from './components/common/ErrorComponent';
import DetailPostPage from './components/chapter4s2/DetailPostPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Chapter4 />}>
        <Route
          path={`${routerPath.CHAPTER_4_2}`}
          element={
            <ErrorBoundary fallback={<ErrorComponent />}>
              <Chapter4s2 />
            </ErrorBoundary>
          }
        />
        <Route
          path={`${routerPath.CHAPTER_4_2}/*`}
          element={
            <ErrorBoundary fallback={<ErrorComponent />}>
              <DetailPostPage />
            </ErrorBoundary>
          }
        />
        <Route path={routerPath.CHAPTER_4_3} element={<Chapter4s3 />} />
      </Route>
    </Routes>
  );
}
