import React from 'react';
import cx from 'classnames';

import Thumb from '@/slider/thumb';

import { getValueByScope } from '@/utils/utils';

import './styles/slider.scss';

export interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onChangeAfter?: (value: number) => void;
  style?: React.CSSProperties &
    Partial<Record<'--slider-bar-fill-color' | '--slider-background-color' | '--slider-bar-height', string>>;
}

const classPrefix = 'ygm-slider';

const Slider: React.FC<SliderProps> = (props) => {
  const [sliderValue, setSliderValue] = React.useState<number>(getValueByScope(props.value!, props.min!, props.max!));

  const trackRef = React.useRef<HTMLDivElement | null>(null);

  // 滚动条值范围
  const scope = props.max! - props.min!;
  // 计算滚动的百分比
  const fillSize = `${((sliderValue - props.min!) * 100) / scope}%`;

  const getValueByPosition = (position: number) => {
    const newPosition = getValueByScope(position, props.min!, props.max!);
    // 除以step得到可以移动的步数取整，再乘以步数得到真实的value值
    const value = Math.round(newPosition / props.step!) * props.step!;

    return value;
  };

  const onTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const track = trackRef.current;
    if (props.disabled || !track) return;

    const rect = track.getBoundingClientRect();
    // 滚动条总长度
    const sliderWidth = rect.width;
    // 滚动条跟视口的距离
    const sliderOffsetLeft = rect.left;
    // 滚动距离
    const delta = e.clientX - sliderOffsetLeft;
    // 占总长度百分比 * 范围长度得到真实的position值
    const position = props.min! + (delta / sliderWidth) * scope;

    const targetValue = getValueByPosition(position);

    setSliderValue(targetValue);
    props.onChangeAfter?.(targetValue);
  };

  const onDrag = (position: number) => {
    const targetValue = getValueByPosition(position);
    setSliderValue(targetValue);
    props.onChange?.(targetValue);
  };

  return (
    <div
      className={cx(classPrefix, { [`${classPrefix}-disabled`]: props.disabled })}
      ref={trackRef}
      onClick={onTrack}
      style={props.style}
    >
      <div
        className={`${classPrefix}-fill`}
        style={{
          width: fillSize,
        }}
      />
      <Thumb
        min={props.min!}
        max={props.max!}
        value={sliderValue}
        disabled={props.disabled!}
        trackRef={trackRef}
        onDrag={onDrag}
      />
    </div>
  );
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  value: 0,
};

Slider.displayName = 'Slider';

export default Slider;
