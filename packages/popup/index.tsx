import React from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';

import useScrollLock from '@/hooks/useScrollLock';

import Mask from '@/mask';

import './styles/index.scss';

export interface PopupProps {
  /** 指定弹出的位置 */
  position?: 'left' | 'top' | 'bottom' | 'right';
  /** 内容区域style属性 */
  style?: React.CSSProperties;
  /** 内容区域类名 */
  bodyClassName?: string;
  /** 是否可见 */
  visible: boolean;
  children?: React.ReactNode;
  /** 点击蒙层回调 */
  onMaskClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Popup: React.FC<PopupProps> = React.memo((props) => {
  useScrollLock(props.visible);
  return (
    <>
      <Mask visible={props.visible} onMaskClick={props.onMaskClick} />
      <CSSTransition
        in={props.visible}
        timeout={300}
        classNames={{
          enter: `ygm-popup-${props.position}-enter`,
          enterActive: 'ygm-popup-enter-active',
          enterDone: 'ygm-popup-enter-done',
          exit: 'ygm-popup-exit',
          exitActive: `ygm-popup-${props.position}-exit-active`,
          exitDone: `ygm-popup-${props.position}-exit-done`,
        }}
        unmountOnExit
      >
        <div
          style={props.style}
          className={cx('ygm-popup', `ygm-popup-position-${props.position}`, props.bodyClassName)}
        >
          {props.children}
        </div>
      </CSSTransition>
    </>
  );
});

Popup.defaultProps = {
  visible: false,
  position: 'left',
};

export default Popup;

Popup.displayName = 'Popup';
