import React from 'react';
import { Meta } from '@storybook/react';

import Popup from '@/popup';

import './index.scss';

const ToastStory: Meta = {
  title: '反馈/Popup 弹出层',
  component: Popup,
};

export const Basic = () => {
  const [visible1, setVisible1] = React.useState<boolean>(false);
  const [visible2, setVisible2] = React.useState<boolean>(false);
  const [visible3, setVisible3] = React.useState<boolean>(false);
  const [visible4, setVisible4] = React.useState<boolean>(false);

  return (
    <>
      <button onClick={() => setVisible1(true)}>底部弹出</button>
      <button onClick={() => setVisible2(true)}>顶部弹出</button>
      <button onClick={() => setVisible3(true)}>左侧弹出</button>
      <button onClick={() => setVisible4(true)}>右侧弹出</button>

      <Popup position="bottom" visible={visible1} onMaskClick={() => setVisible1(false)} />
      <Popup position="top" visible={visible2} onMaskClick={() => setVisible2(false)} />
      <Popup position="left" visible={visible3} onMaskClick={() => setVisible3(false)} />
      <Popup position="right" visible={visible4} onMaskClick={() => setVisible4(false)} />
    </>
  );
};

Basic.storyName = '基本用法';

export default ToastStory;
