import React from 'react';
import styled from 'styled-components';
const colors = {
  white: '#ffffff',
  red: '#ff0000',
  blue: '#0000ff',
  yellow: '#ffff00',
};

type ValueOf<T> = T[keyof T];
type ColorsType = typeof colors;
type ColorsValue = keyof typeof colors;

interface IChapter1s2 {
  color: ColorsValue;
}

export default function Chapter1s2({ color }: IChapter1s2) {
  const [colorValue, setColorValue] = React.useState<ColorsValue>(() => color);
  return <S.Chapter1s2 style={{ backgroundColor: colorValue }}>Chapter1s2</S.Chapter1s2>;
}

const S = {
  Chapter1s2: styled.div``,
};
