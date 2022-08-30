import React from 'react';
import Button from '@/button';

export interface Action {
  key: string;
  text: React.ReactNode;
  color?: 'danger' | 'primary' | 'default';
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
}

interface DialogActionButtonProps {
  action: Action;
  onAction: () => void | Promise<void>;
}

const classPrefix = 'ygm-dialog-button';

const DialogActionButton: React.FC<DialogActionButtonProps> = (props) => {
  return (
    <Button
      key={props.action.key}
      className={classPrefix}
      onClick={props.onAction}
      color={props.action.color}
      disabled={props.action.disabled}
      block
      shape="rectangular"
      fill="none"
    >
      {props.action.text}
    </Button>
  );
};

DialogActionButton.defaultProps = {};

DialogActionButton.displayName = 'DialogActionButton';

export default DialogActionButton;
