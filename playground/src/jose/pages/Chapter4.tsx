import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from 'styled-components';
import defaultQueryOptions from '../components/chapter4/constants/defaultQueryOptions';
import { Outlet, useNavigate } from 'react-router-dom';
import { buttonBasic, pageBasic } from '@/common/styles/Common';
import routerPath from '../constants/routerPath';

export default function Chapter4() {
  const queryClient = new QueryClient(defaultQueryOptions);
  const navigate = useNavigate();
  return (
    <QueryClientProvider client={queryClient}>
      <S.Chapter4>
        <button onClick={() => navigate(routerPath.CHAPTER_4_2)}>Chapter4s2</button>
        <button onClick={() => navigate(routerPath.CHAPTER_4_3)}>Chapter4s3</button>
        <div className="oultet-wrapper">
          <Outlet />
        </div>
      </S.Chapter4>
    </QueryClientProvider>
  );
}

const S = {
  Chapter4: styled.div`
    ${pageBasic}
    ${buttonBasic}
    .oultet-wrapper {
      width: 100%;
      display: block;
      height: 600px;
    }
  `,
};
