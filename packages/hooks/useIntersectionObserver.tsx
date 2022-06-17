import React from 'react';

const useIntersectionObserver = (
  targetRef: React.RefObject<Element | null>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);

  React.useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const ob = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        if (entry.intersectionRatio > 0) {
          setIsIntersecting(isElementIntersecting);
          ob.unobserve(element);
        }
      },
      {
        ...options,
      }
    );

    ob.observe(element);

    return () => {
      ob.disconnect();
    };
  }, [options, targetRef]);

  return isIntersecting;
};

export default useIntersectionObserver;
