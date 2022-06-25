import React from 'react';
import SpinnerLoading from '@/spinner-loading';

import { getScrollParent, getScrollTop, sleep } from './utils';
import { TPullStatus } from './types';
import { PULL_STATUS, DEFUALT_DURATION, FRICTION } from './constants';

import './styles/index.scss';

export interface PullToRefreshProps {
  children: React.ReactNode;
  pullingText?: React.ReactNode;
  canReleaseText?: React.ReactNode;
  refreshingText?: React.ReactNode;
  completeText?: React.ReactNode;
  headHeight?: number;
  threshold?: number;
  completeDelay?: number;
  onRefresh: () => Promise<any>;
}

const PullToRefresh: React.FC<PullToRefreshProps> = React.memo((props) => {
  const [status, setStatus] = React.useState<TPullStatus>(PULL_STATUS.PULLING);
  const [pullDistance, setPullDistance] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(DEFUALT_DURATION);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const touchStartY = React.useRef<number>(0);
  const isDragging = React.useRef<boolean>(false);

  const trackStyle = React.useMemo(() => {
    return {
      transitionDuration: `${duration}ms`,
      transform: `translate3d(0,${pullDistance}px,0)`,
    };
  }, [duration, pullDistance]);

  const isTouchable = React.useMemo(() => {
    return status !== PULL_STATUS.REFRESHING && status !== PULL_STATUS.COMPLETE;
  }, [status]);

  const renderStatusText = React.useCallback(() => {
    if (status === PULL_STATUS.PULLING) return props.pullingText;
    else if (status === PULL_STATUS.CAN_RELEASE) return props.canReleaseText;
    else if (status === PULL_STATUS.REFRESHING) return props.refreshingText;
    return props.completeText;
  }, [props.canReleaseText, props.completeText, props.pullingText, props.refreshingText, status]);

  const onTouchEnd = React.useCallback(async () => {
    if (!isDragging.current && !isTouchable) return;
    isDragging.current = false;
    setDuration(DEFUALT_DURATION);
    if (status === PULL_STATUS.CAN_RELEASE) {
      setStatus(PULL_STATUS.REFRESHING);
      setPullDistance(props.headHeight!);
      try {
        await props.onRefresh();
        setStatus(PULL_STATUS.COMPLETE);
      } catch (e) {
        setPullDistance(0);
        setStatus(PULL_STATUS.PULLING);
        throw e;
      }

      if (props.completeDelay! > 0) {
        await sleep(props.completeDelay!);
      }
    }
    setPullDistance(0);
    setStatus(PULL_STATUS.PULLING);
  }, [isTouchable, status, props]);

  const onTouchMove = React.useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current && !isTouchable) return;
      const currentY = e.changedTouches[0].clientY;
      const diff = (currentY - touchStartY.current) * FRICTION;

      if (diff <= 0) return;

      if (diff > props.threshold!) {
        setStatus(PULL_STATUS.CAN_RELEASE);
      } else {
        setStatus(PULL_STATUS.PULLING);
      }
      setPullDistance(diff);
    },
    [isTouchable, props.threshold]
  );

  const onTouchStart = React.useCallback(
    (e: TouchEvent) => {
      if (!isTouchable) return;
      const scrollParent = getScrollParent(e.target as Element);

      const scrollTop = getScrollTop(scrollParent as Element);
      if (scrollTop === 0) {
        setDuration(0);
        touchStartY.current = e.changedTouches[0].clientY;
        isDragging.current = true;
      }
    },
    [isTouchable]
  );

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [onTouchEnd, onTouchMove, onTouchStart]);

  return (
    <div className="ygm-pull-to-refresh" ref={containerRef}>
      <div className="ygm-pull-to-refresh-head" style={trackStyle}>
        <div className="ygm-pull-to-refresh-head-content" style={{ height: props.headHeight }}>
          {renderStatusText()}
        </div>
        <div className="ygm-pull-to-refresh-content">{props.children}</div>
      </div>
    </div>
  );
});

PullToRefresh.defaultProps = {
  pullingText: '下拉刷新',
  canReleaseText: '释放立即刷新',
  refreshingText: <SpinnerLoading size={12} />,
  completeText: '刷新成功',
  headHeight: 30,
  threshold: 50,
  completeDelay: 500,
};

PullToRefresh.displayName = 'PullToRefresh';

export default PullToRefresh;
