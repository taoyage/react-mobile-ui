import React from 'react';
import SwiperItem from '@/swiper/swiper-item';
import SwiperPageIndicator from '@/swiper/swiper-page-indicator';

import { getTouchEventData } from '@/utils/event';

import { modulus } from './utils';

import './styles/swiper.scss';

export interface SwiperProps {
  loop?: boolean;
  autoplay?: boolean;
  defaultIndex?: number;
  autoplayInterval?: number;
  children: React.ReactElement | React.ReactElement[];
  showIndicator?: boolean;
  indicatorClassName?: string;
  onIndexChange?: (index: number) => void;
  style?: React.CSSProperties & Partial<Record<'--height' | '--width' | '--border-radius' | '--track-padding', string>>;
}

export interface SwiperRef {
  swipeTo: (index: number) => void;
  swipeNext: () => void;
  swipePrev: () => void;
}

const Swiper = React.forwardRef<SwiperRef, SwiperProps>((props, ref) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(props.defaultIndex || 0);
  const [dragging, setDragging] = React.useState<boolean>(false);

  const trackRef = React.useRef<HTMLDivElement>(null);
  const startRef = React.useRef<number>(0);
  const slideRatioRef = React.useRef<number>(0);
  const intervalRef = React.useRef<number>(0);
  const autoPlaying = React.useRef<boolean>(false);

  const { validChildren, count } = React.useMemo(() => {
    let count = 0;
    const validChildren = React.Children.map(props.children, (child) => {
      // 验证对象是否是一个 React 元素
      if (!React.isValidElement(child)) return null;

      // 验证是否是一个SwiperItem类型
      if (child.type !== SwiperItem) {
        console.warn('Swiper children must be Swiper.Item components');
        return null;
      }

      count++;
      return child;
    });

    return { validChildren, count };
  }, [props.children]);

  const getTransition = React.useCallback(
    (position: number) => {
      if (dragging) {
        return '';
      } else if (autoPlaying.current) {
        // 只有position100 和 position0 这两张slide会做动画
        if (position === -100 || position === 0) {
          return 'transform 0.3s ease-out';
        } else {
          return '';
        }
      } else if (position < -100) {
        return '';
      }
      return 'transform 0.3s ease-out';
    },
    [dragging]
  );

  const getFinalPosition = React.useCallback(
    (index: number) => {
      let finalPosition = -currentIndex * 100 + index * 100;

      if (!props.loop) return finalPosition;

      const totalWidth = count * 100;
      const flagWidth = totalWidth / 2;

      finalPosition = modulus(finalPosition + flagWidth, totalWidth) - flagWidth;
      return finalPosition;
    },
    [count, currentIndex, props.loop]
  );

  const renderSwiperItem = React.useCallback(() => {
    return (
      <div className="ygm-swiper-track-inner">
        {React.Children.map(validChildren, (child, index) => {
          const position = getFinalPosition(index);

          return (
            <div
              className="ygm-swiper-slide"
              style={{
                transform: `translate3d(${position}%, 0px, 0px)`,
                left: `-${index * 100}%`,
                transition: getTransition(position),
                WebkitTransition: getTransition(position),
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }, [getFinalPosition, getTransition, validChildren]);

  const boundIndex = React.useCallback(
    (currentIndex: number) => {
      let min = 0;
      let max = count - 1;

      let ret = currentIndex;

      ret = Math.max(currentIndex, min);

      ret = Math.min(ret, max);

      return ret;
    },
    [count]
  );

  const swipeTo = React.useCallback(
    (index: number) => {
      const targetIndex = props.loop ? modulus(index, count) : boundIndex(index);
      setCurrentIndex(targetIndex);
      props.onIndexChange?.(targetIndex);
    },
    [boundIndex, count, props]
  );

  const swipePrev = React.useCallback(() => {
    swipeTo(currentIndex - 1);
  }, [currentIndex, swipeTo]);

  const swipeNext = React.useCallback(() => {
    swipeTo(currentIndex + 1);
  }, [swipeTo, currentIndex]);

  const getSlideRatio = React.useCallback((diff: number) => {
    const element = trackRef.current;
    if (!element) return 0;
    return diff / element.offsetWidth;
  }, []);

  const onTouchMove = React.useCallback(
    (e: TouchEvent | MouseEvent) => {
      const currentX = getTouchEventData(e).clientX;
      const diff = startRef.current - currentX;
      slideRatioRef.current = getSlideRatio(diff);
      let position = currentIndex + slideRatioRef.current;

      if (!props.loop) {
        position = boundIndex(position);
      }

      setCurrentIndex(position);
    },
    [boundIndex, currentIndex, getSlideRatio, props.loop]
  );

  const onTouchEnd = React.useCallback(() => {
    const index = Math.round(slideRatioRef.current);
    slideRatioRef.current = 0;

    let position = currentIndex + index;

    // 边界判断
    if (!props.loop) {
      position = boundIndex(currentIndex + index);
    }

    swipeTo(position);

    setDragging(false);
    document.removeEventListener('mousemove', onTouchMove);
    document.removeEventListener('mouseup', onTouchEnd);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  }, [boundIndex, currentIndex, onTouchMove, props.loop, swipeTo]);

  const onTouchStart = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
      startRef.current = getTouchEventData(e).clientX;
      setDragging(true);
      clearInterval(intervalRef.current);
      autoPlaying.current = false;
      document.addEventListener('mousemove', onTouchMove);
      document.addEventListener('mouseup', onTouchEnd);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
    },
    [onTouchEnd, onTouchMove]
  );

  React.useImperativeHandle(ref, () => ({
    swipeTo,
    swipeNext,
    swipePrev,
  }));

  React.useEffect(() => {
    if (!props.autoplay || dragging) return;
    intervalRef.current = window.setInterval(() => {
      autoPlaying.current = true;
      swipeNext();
    }, props.autoplayInterval);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [dragging, props.autoplay, props.autoplayInterval, swipeNext]);

  if (count === 0 || !validChildren) {
    console.warn('Swiper at least one child element is required');
    return null;
  }

  return (
    <div className="ygm-swiper" style={props.style}>
      <div className="ygm-swiper-track" ref={trackRef} onTouchStart={onTouchStart} onMouseDown={onTouchStart}>
        {renderSwiperItem()}
      </div>
      {props.showIndicator && (
        <div className="ygm-swiper-indicator">
          <SwiperPageIndicator
            total={count}
            current={slideRatioRef.current > 0 ? Math.floor(currentIndex) : Math.ceil(currentIndex)}
            indicatorClassName={props.indicatorClassName}
          />
        </div>
      )}
    </div>
  );
});

Swiper.defaultProps = {
  autoplay: false,
  defaultIndex: 0,
  autoplayInterval: 3000,
  showIndicator: true,
  loop: false,
};

Swiper.displayName = 'Swiper';

export default Swiper;
