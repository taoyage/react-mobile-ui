import React from 'react';
import useEffectOnce from '@/hooks/useEffectOnce';

const useUnmount = (fn: () => any) => {
  const fnRef = React.useRef(fn);

  fnRef.current = fn;

  useEffectOnce(() => () => fnRef.current());
};

export default useUnmount;
