import React from 'react';

import { Meta } from '@storybook/react';

import Divider from '@/divider';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const GridStory: Meta = {
  title: '布局/Divider 分割线',
  component: Divider,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="基本用法">
        <Divider />
      </DemoBlock>

      <DemoBlock title="展示文字">
        <Divider>文字</Divider>
      </DemoBlock>

      <DemoBlock title="内容位置">
        <Divider contentPosition="left">左侧内容位置</Divider>
        <Divider contentPosition="right">右侧内容位置</Divider>
      </DemoBlock>

      <DemoBlock title="虚线">
        <Divider dashed>虚线Divider</Divider>
      </DemoBlock>

      <DemoBlock title="自定义样式">
        <Divider style={{ '--border-width': '1px', '--border-color': 'blue', '--text-color': 'blue' }}>
          自定义样式
        </Divider>
      </DemoBlock>

      <DemoBlock title="竖线分割">
        <>
          Text
          <Divider direction="vertical" />
          <a href="#">Link</a>
          <Divider direction="vertical" />
          <a href="#">Link</a>
        </>
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default GridStory;
