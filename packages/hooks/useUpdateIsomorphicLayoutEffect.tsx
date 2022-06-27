import React from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

const useUpdateIsomorphicLayoutEffect = (callback: React.EffectCallback, deep?: React.DependencyList) => {
  const isMounted = React.useRef<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      callback();
    }
  }, deep);
};

export default useUpdateIsomorphicLayoutEffect;
