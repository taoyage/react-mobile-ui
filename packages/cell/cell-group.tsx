import React from 'react';
import cx from 'classnames';

interface CellGroupProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 是否显示外边框 */
  border?: boolean;
  /** card为展示成圆角的卡片形式 */
  mode?: 'default' | 'card';
  children?: React.ReactNode;
}

const classPrefix = 'ygm-cell-group';

const CellGroup: React.FC<CellGroupProps> = (props) => {
  const renderTitle = () => {
    return props.title && <div className={`${classPrefix}-title`}>{props.title}</div>;
  };

  const renderContent = () => {
    return <div className={`${classPrefix}-content`}>{props.children}</div>;
  };

  return (
    <div className={classPrefix}>
      {renderTitle()}
      {renderContent()}
    </div>
  );
};

CellGroup.displayName = 'CellGroup';

export default CellGroup;
