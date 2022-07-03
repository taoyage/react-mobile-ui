import React from 'react';

const useUpdateEffect = (callback: React.EffectCallback, deep?: React.DependencyList) => {
  const isMounted = React.useRef<boolean>(false);

  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deep);
};

export default useUpdateEffect;
