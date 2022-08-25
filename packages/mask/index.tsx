import React from 'react';
import { useSpring, animated } from '@react-spring/web';

import useScrollLock from '@/hooks/useScrollLock';

import './styles/index.scss';

export interface MaskProps {
  /** 是否可见 */
  visible: boolean;
  /** 点击蒙层触发回调 */
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: React.CSSProperties & Partial<Record<'--z-index' | '--background', string>>;
}

const classPrefix = 'ygm-mask';

const Mask: React.FC<MaskProps> = (props) => {
  useScrollLock(props.visible);

  const onMask = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      props.onMaskClick?.(e);
    },
    [props.onMaskClick]
  );

  const { opacity } = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      tension: 250,
      friction: 30,
      clamp: true,
    },
  });

  return (
    <animated.div
      className={classPrefix}
      style={{ ...props.style, opacity, display: props.visible ? undefined : 'none' }}
      onClick={onMask}
    />
  );
};

export default Mask;

Mask.displayName = 'Mask';
