import React from 'react';

import { DialogProps } from '@/dialog/dialog';
import show from '@/dialog/show';

export type DialogAlertProps = Omit<DialogProps, 'visible' | 'closeOnAction' | 'actions'> & {
  confirmText?: React.ReactNode;
  onConfirm?: () => void;
};

const alert = (props: DialogAlertProps) => {
  const { confirmText = '确认' } = props;

  return show({
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
    },
  });
};

export default alert;
