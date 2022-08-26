import React from 'react';
import Button from '@/button';

export interface Action {
  key: string;
  text: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
}

interface DialogActionButtonProps {
  action: Action;
  onAction: () => void | Promise<void>;
}

const DialogActionButton: React.FC<DialogActionButtonProps> = (props) => {
  return (
    <Button
      key={props.action.key}
      onClick={props.onAction}
      color={props.action.danger ? 'danger' : 'primary'}
      disabled={props.action.disabled}
      block
      shape="rectangular"
    >
      {props.action.text}
    </Button>
  );
};

DialogActionButton.defaultProps = {};

DialogActionButton.displayName = 'DialogActionButton';

export default DialogActionButton;
