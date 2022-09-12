import React from 'react';

import { DialogProps } from '@/dialog/dialog';
import show from '@/dialog/show';

export type DialogAlertProps = Omit<DialogProps, 'visible' | 'closeOnAction' | 'actions'> & {
  confirmText?: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
};

const alert = (props: DialogAlertProps) => {
  const { confirmText = '确认' } = props;

  return new Promise<void>((resolve) => {
    show({
      ...props,
      closeOnAction: true,
      actions: [
        {
          key: 'confirm',
          text: confirmText,
          color: 'primary',
        },
      ],
      onAction: props.onConfirm,
      onClose: () => {
        props.onClose?.();
        resolve();
      },
    });
  });
};

export default alert;
