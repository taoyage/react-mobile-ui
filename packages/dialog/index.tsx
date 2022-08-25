import React from 'react';

export interface DialogProps {
  header?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  /** Dialog关闭时的回调 */
  onClose?: () => void;
}

const Dialog: React.FC<DialogProps> = () => {
  return <>1</>;
};

Dialog.displayName = 'Dialog';

export default Dialog;
