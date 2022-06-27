import React from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  headerClassName?: string;
  titleClassName?: string;
  extraClassName?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
  onHeaderClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onBodyClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Card: React.FC<CardProps> = React.memo((props) => {
  const renderHeader = React.useCallback(() => {
    if (!(props.title || props.extra)) {
      return null;
    }

    return (
      <div className={cx('ygm-card-header', props.headerClassName)} onClick={props.onHeaderClick}>
        <div className={cx('ygm-card-header-title', props.titleClassName)}>{props.title}</div>
        <div className={cx('ygm-card-header-extra', props.extraClassName)}>{props.extra}</div>
      </div>
    );
  }, [
    props.extra,
    props.extraClassName,
    props.headerClassName,
    props.title,
    props.titleClassName,
    props.onHeaderClick,
  ]);

  const renderBody = React.useCallback(() => {
    if (!props.children) {
      return null;
    }

    return (
      <div
        className={cx('ygm-card-body', props.bodyClassName)}
        onClick={props.onBodyClick}
        style={{
          paddingTop: props.title || props.extra ? 0 : 13,
        }}
      >
        {props.children}
      </div>
    );
  }, [props.bodyClassName, props.children, props.extra, props.onBodyClick, props.title]);

  return (
    <div className="ygm-card">
      {renderHeader()}
      {renderBody()}
    </div>
  );
});

export default Card;

Card.displayName = 'Card';
