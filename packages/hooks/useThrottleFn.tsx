import React from 'react';
import useLatest from '@/hooks/useLatest';
import useUnmount from '@/hooks/useUnmount';

const useThrottleFn = (fn: (...args: any[]) => any, ms: number) => {
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const fnRef = useLatest(fn);

  const timeoutCallback = React.useCallback(() => {
    fnRef.current();
    timerRef.current = undefined;
  }, []);

  React.useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = setTimeout(timeoutCallback, ms);
    }
  }, [ms, timeoutCallback]);

  useUnmount(() => {
    timerRef.current && clearTimeout(timerRef.current);
  });

  return {};
};

export default useThrottleFn;
