import React from 'react';
import { Meta } from '@storybook/react';

import Dialog from '@/dialog';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const DialogStory: Meta = {
  title: '反馈/Dialog 弹出框',
  component: Dialog,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="基础用法" style={{ padding: 20 }}>
        <Dialog title="标题" content="代码是写出来给人看的，附带能在机器上运行" />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default DialogStory;
