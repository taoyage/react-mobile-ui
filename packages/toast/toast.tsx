import React from 'react';
import cx from 'classnames';
import { CheckOutline, CloseOutline } from 'antd-mobile-icons';

import SpinnerLoading from '@/spinner-loading';

import './styles/index.scss';

export interface ToastProps {
  duration?: number;
  content: string;
  afterClose?: () => void;
  unmount?: () => void;
  icon?: 'success' | 'fail' | 'loading' | React.ReactNode;
}

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
      unmount?.();
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, unmount]);

  React.useEffect(() => {
    return () => {
      afterClose?.();
    };
  }, [afterClose]);

  return (
    <div className="ygm-toast">
      <div className={cx('ygm-toast-main', icon ? `ygm-toast-main-icon` : 'ygm-toast-main-text')}>
        {iconElement && <div className="ygm-toast-icon">{iconElement}</div>}
        <div className="ygm-toast-text">{content}</div>
      </div>
    </div>
  );
});

Toast.defaultProps = {
  duration: 2000,
};

Toast.displayName = 'Toast';

export default Toast;
