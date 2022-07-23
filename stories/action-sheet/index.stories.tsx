import React from 'react';

import { Meta } from '@storybook/react';

import ActionSheet, { Action } from '@/action-sheet';
import Button from '@/button';
import Space from '@/space';
import Toast from '@/toast';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const ActionSheetStory: Meta = {
  title: '反馈/ActionSheet 动作面板',
  component: ActionSheet,
};

const actions: Action[] = [
  { name: '选项1', key: 'option1' },
  { name: '选项2', key: 'option2' },
  { name: '选项3', key: 'option3' },
];

const actions1: Action[] = [
  { name: '选项一', key: 'option1' },
  { name: '选项二', key: 'option2' },
  { name: '选项三', description: '描述信息', key: 'option3' },
];

const actions2: Action[] = [
  { name: '选项一', key: 'option1', color: '#ee0a24' },
  { name: '选项二', key: 'option2', disabled: true },
  { name: '选项三', description: '描述信息', key: 'option3' },
];

export const Basic = () => {
  const [visible1, setVisible1] = React.useState<boolean>(false);
  const [visible2, setVisible2] = React.useState<boolean>(false);
  const [visible3, setVisible3] = React.useState<boolean>(false);
  const [visible4, setVisible4] = React.useState<boolean>(false);
  const [visible5, setVisible5] = React.useState<boolean>(false);

  return (
    <DemoWrap>
      <DemoBlock title="基本用法">
        <Space direction="vertical">
          <Button onClick={() => setVisible1(true)}>基本用法</Button>
          <Button onClick={() => setVisible2(true)}>展示取消按钮</Button>
          <Button onClick={() => setVisible3(true)}>展示描述信息</Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="选项状态">
        <Button onClick={() => setVisible4(true)}>选项状态</Button>
      </DemoBlock>

      <DemoBlock title="事件处理">
        <Button onClick={() => setVisible5(true)}>事件处理</Button>
      </DemoBlock>

      {/* 基本用法 */}
      <ActionSheet actions={actions} visible={visible1} onClose={() => setVisible1(false)} />

      {/* 展示取消按钮 */}
      <ActionSheet actions={actions} visible={visible2} onClose={() => setVisible2(false)} cancelText="取消" />

      {/* 展示描述信息 */}
      <ActionSheet
        actions={actions1}
        visible={visible3}
        onClose={() => setVisible3(false)}
        cancelText="取消"
        description="这是一段描述信息"
      />

      {/* 选项状态 */}
      <ActionSheet actions={actions2} visible={visible4} onClose={() => setVisible4(false)} cancelText="取消" />

      {/* 事件处理 */}
      <ActionSheet
        actions={actions1}
        visible={visible5}
        onAction={(action) => {
          Toast.show(`点击了${action.name}`);
        }}
        onClose={() => {
          setVisible5(false);
          Toast.show('动作面板已关闭');
        }}
        cancelText="取消"
      />
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default ActionSheetStory;
