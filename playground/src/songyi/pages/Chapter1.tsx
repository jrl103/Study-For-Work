import styled from 'styled-components';

interface IAnimal {
  name: string | number;
  age: number;
  gender: TGender | 'neutrality';
}

type TGender = 'woman' | 'man';

const person: IAnimal[] = [];
console.log('person: ', person);

export default function Chapter1() {
  return <S.Chapter1>Chapter1</S.Chapter1>;
}

const S = {
  Chapter1: styled.div``,
};
