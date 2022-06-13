import React from 'react';
import ReactDOM from 'react-dom/client';

import { default as Toast, ToastProps } from './toast';

export type ToastShowProps = ToastProps;

export const show = (p: ToastShowProps | string) => {
  const props = typeof p === 'string' ? { content: p } : p;

  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);

  const unmount = () => {
    document.body.removeChild(container);
    root.unmount();
  };

  root.render(<Toast {...props} unmount={unmount} />);
};
