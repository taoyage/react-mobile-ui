import React from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface DividerProps {
  contentPosition?: 'left' | 'right' | 'center';
  /** 是否使用虚线 */
  dashed?: boolean;
  /** 水平还是垂直类型 */
  direction?: 'horizontal' | 'vertical';
  /** 是否使用 0.5px 线 */
  hairline?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties &
    Partial<Record<'--border-width' | '--border-padding' | '--text-color' | '--border-color', string>>;
}

const classPrefix = 'ygm-divider';

const Divider: React.FC<DividerProps> = (props) => {
  return (
    <div
      style={props.style}
      className={cx(classPrefix, `${classPrefix}-${props.direction}`, `${classPrefix}-${props.contentPosition}`, {
        [`${classPrefix}-hairline`]: props.hairline,
        [`${classPrefix}-dashed`]: props.dashed,
      })}
    >
      {props.children}
    </div>
  );
};

export default Divider;

Divider.defaultProps = {
  contentPosition: 'center',
  direction: 'horizontal',
  hairline: true,
};
