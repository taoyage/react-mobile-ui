import React from 'react';

const useLockFn = <P extends any[] = any[], V = any>(fn: (...args: P) => Promise<V>) => {
  const lockRef = React.useRef(false);

  return React.useCallback(
    async (...args: P) => {
      if (lockRef.current) return;

      lockRef.current = true;

      try {
        const ret = await fn(...args);
        lockRef.current = false;
        return ret;
      } catch (e) {
        lockRef.current = false;
        throw e;
      }
    },
    [fn]
  );
};

export default useLockFn;
