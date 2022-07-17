import React from 'react';
import Loading from '@/spinner-loading';

import { isWindow } from '@/infinite-scroll/utils';

import { getScrollParent } from '@/utils/scroll';

import './styles/index.scss';

export interface InfiniteScrollProps {
  hasMore: boolean;
  loadMore: () => Promise<void>;
  children: React.ReactNode;
}

type ParentType = HTMLElement | Window | null | undefined;

const classPrefix = `ygm-infinite-scroll`;

const InfiniteScroll: React.FC<InfiniteScrollProps> = React.memo((props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const parentRef = React.useRef<ParentType>(null);
  const nextFlagRef = React.useRef<boolean>(true);

  const onScroll = React.useCallback(() => {
    const element = containerRef.current;
    const parent = parentRef.current;

    if (!element || !parent) return;

    const scrollTop = isWindow(parent) ? window.scrollY : parent.scrollTop;
    const clientHeight = isWindow(parent) ? window.innerHeight : parent.clientHeight;

    const elementHeight = element.getBoundingClientRect().height;
    // const elementTop = element.getBoundingClientRect().top;

    if (scrollTop + clientHeight >= elementHeight) {
      console.log('loadMore');
    }
  }, []);

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    parentRef.current = getScrollParent(element);
    const parent = parentRef.current;
    if (!parent) return;

    parent.addEventListener('scroll', onScroll);

    return () => {
      parent.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div ref={containerRef} className={classPrefix} style={{ position: 'relative' }}>
      {props.children}
      <div className={`${classPrefix}-load`}>{props.hasMore && <Loading size={16} />}</div>
    </div>
  );
});

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
