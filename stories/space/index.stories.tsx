import React from 'react';
import { Meta } from '@storybook/react';

import Space from '@/space';
import Button from '@/button';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

import './index.scss';

const LoadingStory: Meta = {
  title: '布局/Space 间距',
  component: Space,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="水平间距">
        <Space>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title="垂直间距">
        <Space direction="vertical">
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title="间距大小">
        <Space gap={20}>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title="换行">
        <Space wrap>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="块级元素">
        <Space block>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="主轴对齐">
        <Space justify="center" block>
          <Button>1</Button>
          <Button>
            2<br />2
          </Button>
          <Button>
            3<br />3<br />3
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="交叉轴对齐">
        <Space align="end">
          <Button>1</Button>
          <Button>
            2<br />2
          </Button>
          <Button>
            3<br />3<br />3
          </Button>
        </Space>
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default LoadingStory;
