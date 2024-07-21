import { pageBasic } from '@/common/styles/Common';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

export default function Chapter2s1() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputState, setInputState] = React.useState('');

  const handleClickStateApply = () => {
    console.log(inputState);
  };

  // ref를 통해 값을 가져오면 state의 변경이 없기때문에 리렌더링 발생을 없앨 수 있다. 그러나 validation이 걸리는 문제를 노출하거나, 입력된 정보를 통해 화면에 변화를 줘야하는 상황에서는
  // 다소 부적절할 수 있다.
  const handleClickRefApply = () => {
    console.log(inputRef.current?.value);
  };

  // state를 통해 값을 가져오면 변경된 정보를 매순간 신선하게 가져올 수 있고, 이 값을 통해 사용자에게 화면을 자연스럽게 보여주는걸 만들 수 있다.
  // 그러나 state를 사용하면 계속 리렌더링이 발생하기 때문에 성능저하 이슈를 불러올 수 있다.
  const handleChangeInputState = (event: ChangeEvent<HTMLInputElement>) => {
    setInputState(event.currentTarget.value);
  };

  // useState, useRef를 활용해서 input값을 관리하면 위와 같은 문제들이 존재하고, 코드가 다소 난잡해지는걸 볼 수 있다.
  // 이런 흐름속에서 훌륭한 라이브러리가 하나 등장하는데...

  return (
    <S.Chapter2s1>
      <div>
        <p>useState</p>
        <div className="input-wrapper">
          <input value={inputState} type="text" onChange={handleChangeInputState} />
          <button onClick={handleClickStateApply}>등록</button>
        </div>
      </div>
      <div>
        <p>useRef</p>
        <div className="input-wrapper">
          <input ref={inputRef} type="text" />
          <button onClick={handleClickRefApply}>등록</button>
        </div>
      </div>
    </S.Chapter2s1>
  );
}

const S = {
  Chapter2s1: styled.div`
    ${pageBasic}
    p {
      margin-bottom: 5px;
    }
    .input-wrapper {
      display: flex;
    }
  `,
};
