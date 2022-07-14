import React from 'react';

export interface InfiniteScrollProps {
  hasMore: boolean;
  loadMore: () => (isRetry: boolean) => Promise<void>;
  children: React.ReactNode;
}

const classPrefix = `ygm-infinite-scroll`;

const InfiniteScroll: React.FC<InfiniteScrollProps> = React.memo((props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className={classPrefix} ref={containerRef}>
      {props.children}
    </div>
  );
});

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
