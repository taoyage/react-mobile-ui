import InternalDialog from '@/dialog/dialog';
import alert from '@/dialog/alert';
import confirm from '@/dialog/confirm';

export type { DialogProps } from '@/dialog/dialog';
export type { DialogAlertProps } from '@/dialog/alert';

type InternalDialogType = typeof InternalDialog;

export interface DialogInterface extends InternalDialogType {
  alert: typeof alert;
  confirm: typeof confirm;
}

const Dialog = InternalDialog as DialogInterface;

Dialog.alert = alert;
Dialog.confirm = confirm;

export default Dialog;
