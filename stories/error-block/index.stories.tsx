import React from 'react';
import { Meta } from '@storybook/react';

import ErrorBlock from '@/error-block';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const ErrorStory: Meta = {
  title: '反馈/ErrorBlock 异常',
  component: ErrorBlock,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="基础用法" style={{ padding: '10px' }}>
        <ErrorBlock />
      </DemoBlock>

      <DemoBlock title="自定义title" style={{ padding: '10px' }}>
        <ErrorBlock title="网络开小差" />
      </DemoBlock>

      <DemoBlock title="自定义descript" style={{ padding: '10px' }}>
        <ErrorBlock title="网络开小差" description="请尝试刷新页面" />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default ErrorStory;
