import styled from 'styled-components';
import { Movie } from '@/jose/components/chapter4/types/movie';
import { useNavigate } from 'react-router-dom';
import routerPath from '@/jose/constants/routerPath';

interface Props {
  element: Movie;
}

export default function MovieCard({ element }: Props) {
  const navigate = useNavigate();
  return (
    <S.MovieCard onClick={() => navigate(`${routerPath.CHAPTER_4_3}/${element.id}`)}>
      <p className="movie-card__title">{element.title}</p>
      <img className="movie-card__thumbnail-image" src={element.medium_cover_image} />
      <p className="movie-card__year">{element.year}</p>
    </S.MovieCard>
  );
}

const S = {
  MovieCard: styled.div`
    cursor: pointer;
    width: calc(33% - 10px);
    margin: 5px;
    border: 1px solid black;
    border-radius: 5px;
    aspect-ratio: 1 / 1.3;
    padding: 10px 5px;
    .movie-card {
      &__title {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 5px;
      }
      &__thumbnail-image {
        width: 100%;
        height: calc(100% - 90px);
        object-fit: cover;
      }
      &__year {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `,
};
