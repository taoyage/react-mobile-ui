import React from 'react';
import cx from 'classnames';

import SpinnerLoading from '@/spinner-loading';
import { isPromise } from '@/utils/validate';

import './styles/index.scss';

export interface ButtonProps {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'middle' | 'large';
  shape?: 'default' | 'rounded' | 'rectangular';
  fill?: 'solid' | 'outline' | 'none';
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => Promise<void> | unknown;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean | 'auto';
  loadingIcon?: React.ReactNode;
}

const classPrefix = 'ygm-button';

const Button: React.FC<ButtonProps> = (props) => {
  const [innerLoading, setInnerLoading] = React.useState(false);
  const loading = props.loading === 'auto' ? innerLoading : props.loading;

  const onButtonClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!props.onClick) return;

    const promise = props.onClick(e);

    if (isPromise(promise)) {
      try {
        setInnerLoading(true);
        await promise;
        setInnerLoading(false);
      } catch (e) {
        setInnerLoading(false);
        throw e;
      }
    }
  };

  return (
    <div
      className={cx(
        classPrefix,
        props.className,
        `${classPrefix}-${props.color}`,
        `${classPrefix}-${props.size}`,
        `${classPrefix}-fill-${props.fill}`,
        `${classPrefix}-shape-${props.shape}`,
        {
          [`${classPrefix}-block`]: props.block,
          [`${classPrefix}-disabled`]: props.disabled,
        }
      )}
      onClick={onButtonClick}
    >
      {loading ? <div className={`${classPrefix}-loading-wrap`}>{props.loadingIcon}</div> : props.children}
    </div>
  );
};

Button.defaultProps = {
  color: 'default',
  size: 'middle',
  shape: 'default',
  fill: 'solid',
  loading: false,
  loadingIcon: <SpinnerLoading size={16} />,
};

Button.displayName = 'Button';

export default Button;
