import styled from 'styled-components';
import usePostListQuery from '@/jose/components/chapter4/hooks/queries/usePostListQuery';
import PostCard from '@/jose/components/chapter4/components/chapter4s2/PostCard';
import Loading from '@/jose/components/chapter4/components/common/Loading';
import React from 'react';

export default function Chapter4s2() {
  const { data, isLoading } = usePostListQuery();
  const deferData = React.useDeferredValue(data);

  if (!deferData || isLoading) return <Loading />;

  return (
    <S.Chapter4s2>
      {deferData.data.map((element) => (
        <PostCard key={element.id} element={element} />
      ))}
    </S.Chapter4s2>
  );
}

const S = {
  Chapter4s2: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  `,
};
