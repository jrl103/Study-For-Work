import { useRef, useState } from 'react';
import styled from 'styled-components';
import PageMetaComponents from '../components/PageMetaComponent';

export default function Chapter4() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const onClickCheck = () => {
    if (inputRef.current) {
      console.log('버튼을 클릭했을때 useState로 값 체크!:', inputValue);
      console.log('버튼을 클릭했을때 useRef로 값 체크!: ', inputRef.current.value);
    }
  };
  return (
    <>
      <PageMetaComponents siteName={'Chapter4'} title={'Chapter4'} siteUrl={'Chapter4'} desc={'Chapter4'} />
      <S.Chapter4>
        <S.AlignBox>
          <p>1. useState를 활용해 input태그에 입력된 값을 특정 버튼을 눌렀을때 확인할 수 있도록 만드시오</p>
          <input ref={inputRef} onChange={(e) => setInputValue(e.target.value)} />
          <button onClick={() => onClickCheck()}>체크!!</button>
        </S.AlignBox>
      </S.Chapter4>
      ;
    </>
  );
}

const S = {
  Chapter4: styled.div``,
  AlignBox: styled.div`
    margin: 30px;
  `,
};
