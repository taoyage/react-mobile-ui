import React from 'react';
import cx from 'classnames';

import './styles/cell-group.scss';

export interface CellGroupProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 是否显示外边框 */
  border?: boolean;
  /** card为展示成圆角的卡片形式 */
  mode?: 'default' | 'card';
  children?: React.ReactNode;
  style?: React.CSSProperties &
    Partial<
      Record<
        | '--cell-group-background'
        | '--cell-group-title-padding'
        | '--cell-group-title-font-size'
        | '--cell-group-title-line-height'
        | '--cell-group-card-padding'
        | '--cell-group-card-border-radius',
        string
      >
    >;
}

const classPrefix = 'ygm-cell-group';

const CellGroup: React.FC<CellGroupProps> = (props) => {
  const renderTitle = () => {
    return props.title && <h2 className={`${classPrefix}-title`}>{props.title}</h2>;
  };

  const renderContent = () => {
    return <div className={`${classPrefix}-content`}>{props.children}</div>;
  };

  return (
    <div className={cx(classPrefix, `${classPrefix}-${props.mode}`)} style={props.style}>
      {renderTitle()}
      {renderContent()}
    </div>
  );
};

CellGroup.defaultProps = {
  mode: 'default',
};

CellGroup.displayName = 'CellGroup';

export default CellGroup;
