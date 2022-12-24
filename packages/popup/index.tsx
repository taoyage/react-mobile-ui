import React from 'react';
import cx from 'classnames';

// 它基于弹簧物理原理实现，他的核心理念就是
// 使我们元素的动画轨迹和真实世界更接近
import { useSpring, animated } from '@react-spring/web';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useScrollLock from '@/hooks/useScrollLock';

import Mask from '@/mask';

import './styles/index.scss';

export interface PopupProps {
  /** 指定弹出的位置 */
  position?: 'left' | 'top' | 'bottom' | 'right';
  /** 内容区域style属性 */
  style?: React.CSSProperties;
  /** 内容区域类名 */
  className?: string;
  /** 是否可见 */
  visible: boolean;
  children?: React.ReactNode;
  /** 是否展示蒙层 */
  mask?: boolean;
  /** 点击蒙层回调 */
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** 显示后回调 */
  afterShow?: () => void;
  /** 关闭后回调 */
  afterClose?: () => void;
}

const classPrefix = 'ygm-popup';

const Popup: React.FC<PopupProps> = (props) => {
  const [active, setActive] = React.useState<boolean>(props.visible);

  useScrollLock(props.visible);

  const { percent } = useSpring({
    percent: props.visible ? 0 : 100,
    config: {
      // 精确度
      precision: 0.1,
      // 弹簧质量，mass的值越大，动画执行的速度也会随着执行的时间变得越变越快
      mass: 0.4,
      // 弹簧张力
      tension: 300,
      // 表示摩擦力和阻力
      friction: 30,
    },
    onRest: () => {
      setActive(props.visible);
      if (props.visible) {
        props.afterClose?.();
      } else {
        props.afterClose?.();
      }
    },
  });

  useIsomorphicLayoutEffect(() => {
    if (props.visible) {
      setActive(true);
    }
  }, [props.visible]);

  return (
    <div className={classPrefix}>
      {props.mask && <Mask visible={props.visible} onMaskClick={props.onMaskClick} />}

      <animated.div
        className={cx(`${classPrefix}-body`, `${classPrefix}-${props.position}`, props.className)}
        style={{
          ...props.style,
          transform: percent.to((v) => {
            if (props.position === 'bottom') {
              return `translate(0, ${v}%)`;
            }
            if (props.position === 'left') {
              return `translate(-${v}%, 0)`;
            }
            if (props.position === 'right') {
              return `translate(${v}%, 0)`;
            }
            if (props.position === 'top') {
              return `translate(0, -${v}%)`;
            }
            return 'none';
          }),
        }}
      >
        {props.children}
      </animated.div>
    </div>
  );
};

Popup.defaultProps = {
  visible: false,
  position: 'left',
  mask: true,
};

export default Popup;

Popup.displayName = 'Popup';
