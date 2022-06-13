export type { ToastShowProps } from './methods';

import { show } from './methods';

export interface ToastProps {
  show: typeof show;
}

const Toast = {
  show,
};

export default Toast;
