import React from 'react';
import cx from 'classnames';
import Popup from '@/popup';

import './styles/index.scss';

export interface Action {
  key: string | number;
  name: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  color?: string;
  onClick?: () => void;
}

export interface ActionSheetProps {
  visible: boolean;
  description?: React.ReactNode;
  actions: Action[];
  onClose?: () => void;
  onAction?: (action: Action, index: number) => void;
  /** 展示取消按钮 */
  cancelText?: React.ReactNode;
  /** 是否点击action后触发onClose回调 */
  closeOnAction?: boolean;
  popupClassName?: string;
}

const classPrefix = `ygm-action-sheet`;

const ActionSheet: React.FC<ActionSheetProps> = React.memo((props) => {
  const onClose = React.useCallback(() => {
    props.onClose?.();
  }, [props.onClose]);

  const renderAction = React.useCallback(
    (action: Action, index: number) => {
      const onClick = () => {
        if (action.disabled) return;

        action.onClick?.();
        props.onAction?.(action, index);

        if (props.closeOnAction) {
          props.onClose?.();
        }
      };

      return (
        <div
          key={action.key}
          className={cx(`${classPrefix}-action-item`, {
            [`${classPrefix}-action-disabled`]: action.disabled,
          })}
          onClick={onClick}
          style={{ color: action.color }}
        >
          <div className={`${classPrefix}-action-item-name`}>{action.name}</div>
          {action.description && <div className={`${classPrefix}-action-item-desc`}>{action.description}</div>}
        </div>
      );
    },
    [props.onAction, props.onClose]
  );

  return (
    <Popup
      position="bottom"
      visible={props.visible!}
      onMaskClick={onClose}
      className={cx(`${classPrefix}-popup`, props.popupClassName)}
    >
      <div className={classPrefix}>
        {props.description && <div className={`${classPrefix}-desc`}>{props.description}</div>}

        <div className={`${classPrefix}-action-list`}>{props.actions.map(renderAction)}</div>

        {props.cancelText && (
          <>
            <div className={`${classPrefix}-action-gap`} />
            <div className={`${classPrefix}-action-item`} onClick={onClose}>
              {props.cancelText}
            </div>
          </>
        )}
      </div>
    </Popup>
  );
});

ActionSheet.defaultProps = {
  description: '',
  cancelText: '',
};

export default ActionSheet;
