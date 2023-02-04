import React from 'react';

import './styles/thumb.scss';

interface ThumbProps {
  value: number;
  min: number;
  max: number;
  disabled: boolean;
  trackRef: React.RefObject<HTMLDivElement>;
  onDrag: (value: number) => void;
  onChangeAfter: (value: number) => void;
}

const classPrefix = 'ygm-slider-thumb';

const Thumb: React.FC<ThumbProps> = (props) => {
  const prevValue = React.useRef<number>(0);

  const startX = React.useRef(0);
  const endX = React.useRef(0);

  const currentPosition = `${((props.value - props.min) / (props.max - props.min)) * 100}%`;

  const onTouchStart = (e: React.TouchEvent) => {
    if (props.disabled) return;

    prevValue.current = props.value;
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const trackElement = props.trackRef.current;
    if (!trackElement || props.disabled) return;

    const deltaX = e.touches[0].clientX - startX.current;
    const total = trackElement.offsetWidth;

    // 移动距离：总长度 = 移动的实际距离 ：实际距离
    const position = (deltaX / total) * (props.max - props.min);
    const finalPosition = position + prevValue.current;
    endX.current = finalPosition;
    props.onDrag(finalPosition);
  };

  const onTouchEnd = () => {
    props?.onChangeAfter(endX.current);
  };

  return (
    <div
      className={classPrefix}
      style={{ left: currentPosition }}
      role="slider"
      aria-valuemax={props.max}
      aria-valuemin={props.min}
      aria-valuenow={props.value}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={`${classPrefix}-button`} />
    </div>
  );
};

Thumb.displayName = 'Thumb';

export default Thumb;
