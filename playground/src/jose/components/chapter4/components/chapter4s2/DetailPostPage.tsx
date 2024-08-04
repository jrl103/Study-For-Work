import styled from 'styled-components';
import usePostDetailQuery from '../../hooks/queries/usePostDetailQuery';
import useIdGetter from '../../hooks/useIdGetter';
import Loading from '../common/Loading';
import { flexCenter } from '@/common/styles/Common';

export default function DetailPostPage() {
  const { id } = useIdGetter();
  const { data, isLoading } = usePostDetailQuery(id);
  if (!data || isLoading) return <Loading />;

  return (
    <S.DetailPostPage>
      <p className="detail__title">{data.data.title}</p>
      <p className="detail__body">{data.data.body}</p>
    </S.DetailPostPage>
  );
}

const S = {
  DetailPostPage: styled.div`
    width: 100%;
    ${flexCenter}
    flex-direction: column;
    .detail {
      &__title {
        margin-bottom: 20px;
        font-size: 2rem;
      }
      &__body {
        width: 300px;
      }
    }
  `,
};
