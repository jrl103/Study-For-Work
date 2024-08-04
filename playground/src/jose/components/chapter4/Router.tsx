import { Route, Routes } from 'react-router-dom';
import Chapter4 from '@/jose/pages/Chapter4';
import routerPath from '@/jose/constants/routerPath';
import { ErrorBoundary } from 'react-error-boundary';
import Chapter4s2 from '@/jose/components/chapter4/Chapter4s2';
import Chapter4s3 from '@/jose/components/chapter4/Chapter4s3';
import ErrorComponent from '@/jose/components/chapter4/components/common/ErrorComponent';
import DetailPostPage from '@/jose/components/chapter4/components/chapter4s2/DetailPostPage';
import DetailMoviePage from './components/chapter4s3/DetailMoviePage';

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
        <Route
          path={routerPath.CHAPTER_4_3}
          element={
            <ErrorBoundary fallback={<ErrorComponent />}>
              <Chapter4s3 />
            </ErrorBoundary>
          }
        />
        <Route
          path={`${routerPath.CHAPTER_4_3}/*`}
          element={
            <ErrorBoundary fallback={<ErrorComponent />}>
              <DetailMoviePage />
            </ErrorBoundary>
          }
        />
      </Route>
    </Routes>
  );
}
