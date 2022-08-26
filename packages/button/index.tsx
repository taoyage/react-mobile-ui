import React from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface ButtonProps {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'middle' | 'large';
  shape?: 'default' | 'rounded' | 'rectangular';
  fill?: 'solid' | 'outline' | 'none';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  block?: boolean;
  disabled?: boolean;
}

const classPrefix = 'ygm-button';

const Button: React.FC<ButtonProps> = React.memo((props) => {
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
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
});

Button.defaultProps = {
  color: 'default',
  size: 'middle',
  shape: 'default',
  fill: 'solid',
};

Button.displayName = 'Button';

export default Button;
