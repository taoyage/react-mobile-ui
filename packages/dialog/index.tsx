import InternalDialog from '@/dialog/dialog';
import alert from '@/dialog/alert';

export type { DialogProps } from '@/dialog/dialog';
export type { DialogAlertProps } from '@/dialog/alert';

type InternalDialogType = typeof InternalDialog;

export interface DialogInterface extends InternalDialogType {
  alert: typeof alert;
}

const Dialog = InternalDialog as DialogInterface;

Dialog.alert = alert;

export default Dialog;
