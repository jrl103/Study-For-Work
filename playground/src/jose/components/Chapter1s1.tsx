import React from 'react';
import styled from 'styled-components';

interface IAnimal {
  name: string;
  age: number;
}

type TGender = 'woman' | 'man';

interface IPerson extends Omit<IAnimal, 'name'> {
  name: string | number;
  gender: TGender | 'neutrality';
}

export default function Chapter1s1() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPersonArray] = React.useState<IPerson[]>([]);
  React.useEffect(() => {
    const users: IPerson[] = [
      { name: 'hihi', age: 12, gender: 'man' },
      { name: 0, age: 12, gender: 'neutrality' },
      { name: 365, age: 12, gender: 'man' },
    ];
    setPersonArray(users);
  }, []);
  return <S.Chapter1s1></S.Chapter1s1>;
}

const S = {
  Chapter1s1: styled.div``,
};
