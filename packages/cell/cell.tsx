import React from 'react';
import cx from 'classnames';
import { RightOutline } from 'antd-mobile-icons';

import './styles/cell.scss';

export interface CellProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** 是否显示点击效果 */
  clickable?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties &
    Partial<Record<'--cell-padding' | '--cell-font-size' | '--cell-color-background' | '--cell-border-color', string>>;
}

const classPrefix = 'ygm-cell';

const Cell: React.FC<CellProps> = (props) => {
  const clickable = props.clickable ?? !!props.onClick;

  const renderLeftIcon = () => {
    return props.leftIcon && <div className={`${classPrefix}-left-icon`}>{props.leftIcon}</div>;
  };

  const renderRightIcon = () => {
    if (props.rightIcon) {
      return props.rightIcon;
    }

    if (clickable) {
      return (
        <div className={`${classPrefix}-right-icon`}>
          <RightOutline />
        </div>
      );
    }
    return null;
  };

  const renderCellTitle = () => {
    return (
      props.title && (
        <div className={`${classPrefix}-title`}>
          <span>{props.title}</span>
          {props.description && <div className={`${classPrefix}-desc`}>{props.description}</div>}
        </div>
      )
    );
  };

  const renderCellValue = () => {
    return props.children && <div className={`${classPrefix}-value`}>{props.children}</div>;
  };

  return (
    <div
      className={cx(classPrefix, { [`${classPrefix}-clickable`]: clickable })}
      onClick={props.onClick}
      style={props.style}
    >
      {renderLeftIcon()}
      {renderCellTitle()}
      {renderCellValue()}
      {renderRightIcon()}
    </div>
  );
};

Cell.defaultProps = {
  title: '',
  description: '',
};

Cell.displayName = 'Cell';

export default Cell;
