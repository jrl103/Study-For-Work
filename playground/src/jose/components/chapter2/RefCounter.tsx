import React from 'react';
import styled from 'styled-components';

const THREE_MINUTES = 3;
const ZERO_SECONDS = 0;

export default function RefCounter() {
  const count = React.useRef(THREE_MINUTES * 60);

  const [minute, setMinute] = React.useState(THREE_MINUTES);
  const [second, setSecond] = React.useState(ZERO_SECONDS);

  React.useEffect(function timerRunner() {
    const interval = setInterval(() => {
      count.current -= 1;

      setMinute(Math.floor((count.current % 3600) / 60));
      setSecond(count.current % 60);
      if (count.current <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <S.RefCounter>
      {String(minute).length > 1 ? minute : `0${minute}`}:{String(second).length > 1 ? second : `0${second}`}
    </S.RefCounter>
  );
}

const S = {
  RefCounter: styled.div``,
};
