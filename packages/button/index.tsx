import React from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface ButtonProps {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'middle' | 'large';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = React.memo((props) => {
  return (
    <div
      className={cx('ygm-button', props.className, `ygm-button-${props.color}`, `ygm-button-${props.size}`)}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
});

Button.defaultProps = {
  color: 'default',
  size: 'middle',
};

Button.displayName = 'Button';

export default Button;
