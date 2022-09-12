import React from 'react';

import { DialogProps } from '@/dialog/dialog';
import show from '@/dialog/show';

export type DialogConfirmProps = Omit<DialogProps, 'visible' | 'closeOnAction' | 'actions'> & {
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
};

const confirm = (props: DialogConfirmProps) => {
  const { confirmText = '确定', cancelText = '取消' } = props;

  return new Promise<boolean>((resolve) => {
    show({
      ...props,
      closeOnAction: true,
      actions: [
        {
          key: 'cancel',
          text: cancelText,
          onClick: async () => {
            await props.onCancel?.();
            resolve(false);
          },
        },
        {
          key: 'confirm',
          text: confirmText,
          color: 'primary',
          onClick: async () => {
            await props.onConfirm?.();
            resolve(true);
          },
        },
      ],
    });
  });
};

export default confirm;
