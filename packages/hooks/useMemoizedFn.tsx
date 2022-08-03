import React from 'react';

import useLatest from '@/hooks/useLatest';

const useMemoizedFn = (fn: (...args: unknown[]) => void) => {
  const latestfnRef = useLatest(fn);

  const memoizedFn = React.useRef((...args: unknown[]) => {
    latestfnRef.current?.(...args);
  });

  return memoizedFn.current;
};

export default useMemoizedFn;
