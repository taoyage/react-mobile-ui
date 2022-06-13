import React from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface SpinnerLoadingProps {
  type?: 'spinner';
  color?: 'default' | 'primary' | string;
  size?: number;
}

const colorRecord: Record<string, string> = {
  default: 'var(--adm-color-weak)',
  primary: 'var(--adm-color-primary)',
};

const SpinnerLoading: React.FC<SpinnerLoadingProps> = React.memo((props) => {
  return (
    <div
      className={cx('ygm-spinner-loading', {
        [`ygm-spinner-loading-color-${props.color}`]: colorRecord[props.color!],
      })}
      style={{ borderLeftColor: props.color, borderTopColor: props.color, width: props.size, height: props.size }}
    />
  );
});

SpinnerLoading.defaultProps = {
  color: 'default',
  size: 32,
  type: 'spinner',
};

export default SpinnerLoading;

SpinnerLoading.displayName = 'SpinnerLoading';
