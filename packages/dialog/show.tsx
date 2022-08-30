import React from 'react';

import Dialog, { DialogProps } from '@/dialog/dialog';
import renderImperatively from '@/utils/render-imperatively';

export type DialogShowProps = Omit<DialogProps, 'visible'>;

function show(props: DialogShowProps) {
  const handler = renderImperatively(<Dialog {...props} />);
}

export default show;
