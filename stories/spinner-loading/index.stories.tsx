import React from 'react';
import { Meta } from '@storybook/react';

import SpinnerLoading from '@/spinner-loading';
import Space from '@/space';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const LoadingStory: Meta = {
  title: '反馈/Loading 加载中',
  component: SpinnerLoading,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="基本用法">
        <SpinnerLoading />
      </DemoBlock>
      <DemoBlock title="颜色">
        <Space wrap>
          <SpinnerLoading />
          <SpinnerLoading color="primary" />
          <SpinnerLoading color="red" />
        </Space>
      </DemoBlock>
      <DemoBlock title="大小">
        <Space wrap>
          <SpinnerLoading size={24} />
          <SpinnerLoading size={32} />
          <SpinnerLoading size={48} />
        </Space>
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default LoadingStory;
