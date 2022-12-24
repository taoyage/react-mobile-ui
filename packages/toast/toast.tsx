import React from 'react';
import cx from 'classnames';
import { CheckOutline, CloseOutline } from 'antd-mobile-icons';

import SpinnerLoading from '@/spinner-loading';

import './styles/index.scss';

export interface ToastProps {
  /** 提示持续时间 */
  duration?: number;
  /** Toast文本内容 */
  content: React.ReactNode;
  /** Toast关闭后的回调 */
  afterClose?: () => void;
  /** 卸载当前Toast的DOM */
  unmount?: () => void;
  /** Toast图标 */
  icon?: 'success' | 'fail' | 'loading' | React.ReactNode;
}

const classPrefix = 'ygm-toast';

const Toast: React.FC<ToastProps> = React.memo(({ icon, duration, content, afterClose, unmount }) => {
  const [_, setVisible] = React.useState<boolean>(true);

  const iconElement = React.useMemo(() => {
    if (icon === null || icon === undefined) return null;
    switch (icon) {
      case 'success':
        return <CheckOutline />;
      case 'fail':
        return <CloseOutline />;
      case 'loading':
        return <SpinnerLoading color="white" />;
      default:
        return icon;
    }
  }, [icon]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
      unmount?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, unmount]);

  React.useEffect(() => {
    return () => {
      afterClose?.();
    };
  }, [afterClose]);

  return (
    <div className={classPrefix}>
      <div className={cx(`${classPrefix}-main`, icon ? `${classPrefix}-main-icon` : `${classPrefix}-main-text`)}>
        {iconElement && <div className={`${classPrefix}-icon`}>{iconElement}</div>}
        <div className={`${classPrefix}-text`}>{content}</div>
      </div>
    </div>
  );
});

Toast.defaultProps = {
  duration: 2000,
};

Toast.displayName = 'Toast';

export default Toast;
