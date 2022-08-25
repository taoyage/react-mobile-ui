import React from 'react';
import cx from 'classnames';
import { useSpring, animated } from '@react-spring/web';

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
  /** 点击蒙层回调 */
  onMaskClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** 显示后回调 */
  afterShow?: () => void;
  /** 关闭后回调 */
  afterClose?: () => void;
}

const classPrefix = 'ygm-popup';

const Popup: React.FC<PopupProps> = React.memo((props) => {
  const [active, setActive] = React.useState<boolean>(props.visible);

  useScrollLock(props.visible);

  const { percent } = useSpring({
    percent: props.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30,
    },
    onStart: () => {
      setActive(true);
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

  return (
    <div className={classPrefix} style={{ display: active ? undefined : 'none' }}>
      <Mask visible={props.visible} onMaskClick={props.onMaskClick} />

      <animated.div
        className={cx(`${classPrefix}-body`, `${classPrefix}-${props.position}`)}
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
});

Popup.defaultProps = {
  visible: false,
  position: 'left',
};

export default Popup;

Popup.displayName = 'Popup';
