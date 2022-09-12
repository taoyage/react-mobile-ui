import React from 'react';
import { Meta } from '@storybook/react';

import Dialog from '@/dialog';
import Button from '@/button';
import Space from '@/space';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';
import { sleep } from '@/pull-to-refresh/utils';

const DialogStory: Meta = {
  title: '反馈/Dialog 弹出框',
  component: Dialog,
};

export const Basic = () => {
  const [visible1, setVisible1] = React.useState<boolean>(false);

  return (
    <DemoWrap>
      <DemoBlock title="基础用法" style={{ padding: 20 }}>
        <Space direction="vertical">
          <Button onClick={() => Dialog.alert({ content: '请优雅的书写代码' })}>弹窗提示</Button>
          <Button
            onClick={() => Dialog.confirm({ content: '请优雅的书写代码弹窗确认弹窗确认弹窗确认弹窗确认弹窗确认' })}
          >
            弹窗确认
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="异步调用" style={{ padding: 20 }}>
        <Space direction="vertical">
          <Button
            onClick={() => {
              Dialog.confirm({
                content: '请优雅的书写代码',
                onConfirm: async () => {
                  await sleep(3000);
                  console.log('success');
                },
              });
            }}
          >
            异步确认
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="组件调用" style={{ padding: 20 }}>
        <Button onClick={() => setVisible1(true)}>组件调用</Button>
        <Dialog
          title="标题"
          content="代码是写出来给人看的，附带能在机器上运行"
          visible={visible1}
          onClose={() => setVisible1(false)}
          closeOnAction
          actions={[
            {
              key: 'cancel',
              text: '取消',
            },
            {
              key: 'confirm',
              text: '确认',
              color: 'primary',
            },
          ]}
        />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default DialogStory;
