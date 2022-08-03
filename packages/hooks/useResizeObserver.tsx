import React from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

const useResizeObserver = <T extends HTMLElement>(callback: (target: T) => void, targetRef: React.RefObject<T>) => {
  useIsomorphicLayoutEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => {
        callback(element);
      });
      observer.observe(element);
      return () => {
        observer.disconnect();
      };
    }
    callback(element);

    return () => null;
  }, []);
};

export default useResizeObserver;
