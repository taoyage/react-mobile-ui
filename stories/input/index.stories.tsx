import React from 'react';
import { Meta } from '@storybook/react';

import Input from '@/input';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const InputStory: Meta = {
  title: '信息录入/Input 输入框',
  component: Input,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="基础用法" style={{ padding: 12 }}>
        <Input placeholder="请输入" type="search" />
      </DemoBlock>

      <DemoBlock title="显示清除" style={{ padding: 12 }}>
        <Input placeholder="请输入" type="search" clearable />
      </DemoBlock>

      <DemoBlock title="密码" style={{ padding: 12 }}>
        <Input placeholder="请输入密码" type="password" />
      </DemoBlock>

      <DemoBlock title="禁用" style={{ padding: 12 }}>
        <Input placeholder="禁用" disabled value="禁用" />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default InputStory;
