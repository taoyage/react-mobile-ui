import React from 'react';
import SwiperPageIndicator from '@/swiper/swiper-page-indicator';

import { modulus } from './utils';

import './styles/swiper.scss';

export interface SwiperProps {
  autoplay?: boolean;
  defaultIndex?: number;
  autoplayInterval?: number;
  children: React.ReactElement | React.ReactElement[];
  showIndicator?: boolean;
  indicatorClassName?: string;
  onIndexChange?: (index: number) => void;
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

  const count = React.useMemo(() => React.Children.count(props.children), [props.children]);

  const getTransition = React.useCallback(
    (position: number) => {
      if (dragging) {
        return '';
      } else if (autoPlaying.current) {
        if (position === -100 || position === 0) {
          return 'transform 0.3s ease-out';
        } else {
          return '';
        }
      }
      return 'transform 0.3s ease-out';
    },
    [dragging]
  );

  const getFinalPosition = React.useCallback(
    (index: number) => {
      let finalPosition = -currentIndex * 100 + index * 100;
      const totalWidth = count * 100;
      const flagWidth = totalWidth / 2;

      finalPosition = modulus(finalPosition + flagWidth, totalWidth) - flagWidth;
      return finalPosition;
    },
    [count, currentIndex]
  );

  const renderSwiperItem = React.useCallback(() => {
    return (
      <div className="ygm-swiper-track-inner">
        {React.Children.map(props.children, (child, index) => {
          const position = getFinalPosition(index);
          return (
            <div
              className="ygm-swiper-slide"
              style={{
                transform: `translate3d(${position}%, 0px, 0px)`,
                left: `-${index * 100}%`,
                transition: getTransition(position),
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }, [props.children, getFinalPosition, getTransition]);

  const swipeTo = React.useCallback(
    (index: number) => {
      const targetIndex = modulus(index, count);
      setCurrentIndex(targetIndex);
      props.onIndexChange?.(targetIndex);
    },
    [count, props]
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
    (e: TouchEvent) => {
      const currentX = e.changedTouches[0].clientX;
      const diff = startRef.current - currentX;
      slideRatioRef.current = getSlideRatio(diff);

      setCurrentIndex(currentIndex + slideRatioRef.current);
    },
    [currentIndex, getSlideRatio]
  );

  const onTouchEnd = React.useCallback(() => {
    const element = trackRef.current;
    if (!element) return;
    const index = Math.round(slideRatioRef.current);
    slideRatioRef.current = 0;
    swipeTo(currentIndex + index);
    setDragging(false);
    element.removeEventListener('touchmove', onTouchMove);
    element.removeEventListener('touchend', onTouchEnd);
  }, [currentIndex, onTouchMove, swipeTo]);

  const onTouchStart = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const element = trackRef.current;
      if (!element) return;

      startRef.current = e.changedTouches[0].clientX;
      setDragging(true);
      clearInterval(intervalRef.current);
      autoPlaying.current = false;
      element.addEventListener('touchmove', onTouchMove);
      element.addEventListener('touchend', onTouchEnd);
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

  return (
    <div className="ygm-swiper">
      <div className="ygm-swiper-track" ref={trackRef} onTouchStart={onTouchStart}>
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
};

Swiper.displayName = 'Swiper';

export default Swiper;
