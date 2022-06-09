import React from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';

import './styles/index.scss';

export interface MaskProps {
  /** 是否可见 */
  visible: boolean;
  /** class name */
  maskClassName?: string;
  /** style属性 */
  maskStyle?: React.CSSProperties;
  /** 点击蒙层触发回调 */
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Mask: React.FC<MaskProps> = React.memo(({ visible, maskClassName, maskStyle, onMaskClick }) => {
  const onMask = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      onMaskClick?.(e);
    },
    [onMaskClick]
  );

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames={{
        enter: 'ygm-mask-enter',
        enterActive: 'ygm-mask-enter-active',
        enterDone: 'ygm-mask-enter-done',
        exit: 'ygm-mask-exit',
        exitActive: 'ygm-mask-exit-active',
        exitDone: 'ygm-mask-exit-done',
      }}
      unmountOnExit
    >
      <div style={maskStyle} className={cx('ygm-mask', maskClassName)} onClick={onMask} />
    </CSSTransition>
  );
});

export default Mask;

Mask.displayName = 'Mask';
