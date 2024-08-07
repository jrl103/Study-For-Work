import styled from 'styled-components';
import useIdGetter from '@/jose/components/chapter4/hooks/useIdGetter';
import useMovieDetailQuery from '@/jose/components/chapter4/hooks/queries/useMovieDetailQuery';
import Loading from '@/jose/components/chapter4/components/common/Loading';
import { pageBasic } from '@/common/styles/Common';

export default function DetailMoviePage() {
  const { id } = useIdGetter();
  const { data, isLoading } = useMovieDetailQuery(id);

  if (!data || isLoading) return <Loading />;

  const movieData = data.data.data.movie;
  return (
    <S.DetailMoviePage>
      <div className="detail-movie">
        <p className="detail-movie__title">{movieData.title}</p>
        <img className="detail-movie__image" src={movieData.medium_cover_image} />
        <p>상영시간: {movieData.runtime}</p>
        <p>별점: {movieData.rating}</p>
        <p>장르: {movieData.genres}</p>
      </div>
    </S.DetailMoviePage>
  );
}

const S = {
  DetailMoviePage: styled.div`
    ${pageBasic}
    .detail-movie {
      overflow: scroll;
      width: 700px;
      display: flex;
      gap: 5px;
      flex-direction: column;
      &__title {
        font-size: 1.3rem;
      }
      &__image {
        width: 100%;
        aspect-ratio: 1 / 1.5;
        object-fit: cover;
      }
    }
  `,
};
