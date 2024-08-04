import styled from 'styled-components';
import { PostItem } from '../../types/post';
import { useNavigate } from 'react-router-dom';
import routerPath from '@/jose/constants/routerPath';

interface Props {
  element: PostItem;
}

export default function PostCard({ element }: Props) {
  const navigate = useNavigate();

  return (
    <S.PostCard onClick={() => navigate(`${routerPath.CHAPTER_4_2}/${element.id}`)}>
      <p className="post-card__title">{element.title}</p>
      <div className="post-card__divider" />
      <p className="post-card__body">{element.body}</p>
    </S.PostCard>
  );
}

const S = {
  PostCard: styled.div`
    width: calc(33% - 10px);
    margin: 5px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px 5px;
    cursor: pointer;
    .post-card {
      &__title {
        font-size: 16px;
        font-weight: 600;
      }
      &__divider {
        margin: 10px 0px;
        background-color: black;
        height: 2px;
      }
      &__body {
        display: block;
        font-size: 14px;
      }
    }
  `,
};
