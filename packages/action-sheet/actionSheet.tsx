import React from 'react';
import Popup from '@/popup';

export interface Action {
  key: string | number;
  name: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  color?: string;
  onClick?: () => void;
}

export interface ActionSheetProps {
  visible?: boolean;
  title?: React.ReactNode;
  actions: Action[];
  onClose?: () => void;
  onAction?: (action: Action, index: number) => void;
  /** 是否点击action后触发onClose回调 */
  closeOnAction?: boolean;
}

const classPrefix = `ygm-action-sheet`;

const ActionSheet: React.FC<ActionSheetProps> = React.memo((props) => {
  const onClose = React.useCallback(() => {
    props.onClose?.();
  }, [props.onClose]);

  const renderAction = React.useCallback(
    (action: Action, index: number) => {
      const onClick = () => {
        action.onClick?.();
        props.onAction?.(action, index);

        if (props.closeOnAction) {
          props.onClose?.();
        }
      };

      return (
        <button key={action.key} className={`${classPrefix}-action-item`} onClick={onClick}>
          <div className={`${classPrefix}-action-item-name`}>{action.name}</div>
          {action.description && <div className={`${classPrefix}-action-item-desc`}>{action.description}</div>}
        </button>
      );
    },
    [props.onAction, props.onClose]
  );

  return (
    <Popup position="bottom" visible={props.visible!} onMaskClick={onClose}>
      <div className={classPrefix}>
        {props.title && <div className={`${classPrefix}-title`}>{props.title}</div>}
        <div className={`${classPrefix}-action-list`}>{props.actions.map(renderAction)}</div>
      </div>
    </Popup>
  );
});

ActionSheet.defaultProps = {
  visible: false,
};

export default ActionSheet;
