import { useCallback, useRef } from "react";

const useDebounce = (cb: () => void, time = 500) => {
  const timer = useRef<number>(null);

  return useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => {
      cb();
    }, time);
  }, [cb, time]);
};

export default useDebounce;
