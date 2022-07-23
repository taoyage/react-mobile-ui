import React from 'react';
import Loading from '@/spinner-loading';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useLockFn from '@/hooks/useLockFn';

import './styles/index.scss';

export interface InfiniteScrollProps {
  hasMore: boolean;
  loadMore: () => Promise<void>;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const classPrefix = `ygm-infinite-scroll`;

const InfiniteScroll: React.FC<InfiniteScrollProps> = React.memo((props) => {
  const doLoadMore = useLockFn(() => props.loadMore());

  const intersectionEleRef = React.useRef<HTMLDivElement>(null);

  const observerEntry = useIntersectionObserver(intersectionEleRef, {});

  const check = React.useCallback(async () => {
    if (!observerEntry?.isIntersecting) return;
    if (!props.hasMore) return;

    await doLoadMore();
  }, [doLoadMore, observerEntry?.isIntersecting, props.hasMore]);

  React.useEffect(() => {
    check();
  }, [check]);

  return (
    <div className={classPrefix} style={{ position: 'relative' }}>
      {props.children}

      <div className={`${classPrefix}-load`} ref={intersectionEleRef}>
        {props.footer && props.footer}
        {!props.footer && (props.hasMore ? <Loading size={16} /> : '')}
      </div>
    </div>
  );
});

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
