import styled from 'styled-components';
import { getCardDetailPage } from '../api/service';
import queryKeys from '../constants/querykeys';
import useBasicQuery from '../hooks/useBasicQuery';
import { ICardDetailResponse } from '../types/API';
import { ErrorBoundary } from 'react-error-boundary';

export default function Chapter11() {
  const request = {
    queryKey: [queryKeys.cardDetailList],
    requestAPI: getCardDetailPage,
  };

  const { data, isSuccess, isLoading, isError } = useBasicQuery<ICardDetailResponse>(request);

  return (
    <>
      <ErrorBoundary fallback={<div>리액트 에러 발생 !</div>}>
        <S.Chapter11>
          {isLoading && <div>로딩중</div>}
          {isError && <div>데이터 받아오는 중 에러 발생 !</div>}
          {isSuccess && data && (
            <S.CardTable>
              {data.data.map((item: any, index: number) => (
                <div className="card-item" key={index}>
                  {item.title}
                </div>
              ))}
            </S.CardTable>
          )}
        </S.Chapter11>
      </ErrorBoundary>
    </>
  );
}

const S = {
  Chapter11: styled.div``,
  CardTable: styled.div`
    width: 900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .card-item {
      width: 30%;
      text-align: center;
      border: 1px solid gray;
      padding: 10px;
      margin: 10px 0;
    }
  `,
};
