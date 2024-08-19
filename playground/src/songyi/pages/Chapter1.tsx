import styled from 'styled-components';
import PageMetaComponents from '../components/PageMetaComponent';

interface IAnimal {
  name: string | number;
  age: number;
  gender: TGender | 'neutrality';
}

type TGender = 'woman' | 'man';

const person: IAnimal[] = [];

export default function Chapter1() {
  return (
    <>
      <PageMetaComponents siteName={'Chapter1'} title={'Chapter1'} siteUrl={'Chapter1'} desc={'Chapter1'} />
      <S.Chapter1>Chapter1</S.Chapter1>;
    </>
  );
}

const S = {
  Chapter1: styled.div``,
};
