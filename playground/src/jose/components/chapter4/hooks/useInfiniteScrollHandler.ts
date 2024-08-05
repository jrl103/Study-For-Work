import React from 'react';

interface Props {
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export default function useInfiniteScrollHandler({ fetchNextPage, hasNextPage }: Props) {
  const observeTargetRef = React.useRef<HTMLDivElement>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !hasNextPage) {
      fetchNextPage();
    }
  };

  React.useEffect(function observerSetter() {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    const observerTarget = observeTargetRef.current;
    if (!observerTarget) return;
    observer.observe(observerTarget);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    observeTargetRef: observeTargetRef,
  };
}
