import { useRef, useState } from 'react';
import styled from 'styled-components';

export default function Chapter5() {
  const [time, setTime] = useState(180);
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  // 타이머 시작
  const onClickStart = () => {
    if (timer.current) {
      // 타이머 중복 방지(타이머가 이미 활성화 되었을 경우 활성화된 타이머 제거)
      clearInterval(timer.current);
      // 시간 초기화
      setTime(180);
    }

    // setInterval을 사용해 1초마다 setTimer 실행
    timer.current = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          // 0초 이하로 떨어지지 않도록 이전값이 1초일때 타이머 제거
          clearInterval(timer.current);
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 시간 포매팅
  const formatTime = (seconds: number) => {
    // 초를 60으로 나누어서 분 계산
    const minutes = Math.floor(seconds / 60);
    // 초를 60으로 나눈후 나머지 값을 계산(남은 초)
    const secs = seconds % 60;
    // mm:ss 형식으로 포맷팅(대신 초 같은 경우 남은 시간이 10초 미만이면 09, 08... 이런 형식으로 나올수 있도록 포맷팅)
    return `${minutes}: ${secs < 10 ? '0' : ''}${secs}`;
  };
  return (
    <>
      <S.Chapter5>
        <S.AlignBox>
          <p>2. 리액트의 useRef를 활용해서 3분동안 흐르는 타이머를 만드시오</p>
          <span>{formatTime(time)}</span>
          <div>
            <button onClick={() => onClickStart()}>타이머 시작!</button>
          </div>
        </S.AlignBox>
      </S.Chapter5>
      ;
    </>
  );
}

const S = {
  Chapter5: styled.div``,
  AlignBox: styled.div`
    margin: 30px;
  `,
};
