import React from 'react';
import { Meta } from '@storybook/react';

import Space from '@/space';
import Button from '@/button';

import './index.scss';

const LoadingStory: Meta = {
  title: '布局/Space 间距',
  component: Space,
};

export const Basic = () => {
  return (
    <div className="space-demo-wrap">
      <div>
        <h3>水平间距</h3>
        <Space>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </div>
      <div>
        <h3>垂直间距</h3>
        <Space direction="vertical">
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </div>
      <div>
        <h3>间距大小</h3>
        <Space gap={20}>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </div>
      <div>
        <h3>换行</h3>
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
      </div>

      <div>
        <h3>块级元素</h3>
        <Space block>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </div>

      <div>
        <h3>主轴对齐</h3>
        <Space justify="center" block>
          <Button>1</Button>
          <Button>
            2<br />2
          </Button>
          <Button>
            3<br />3<br />3
          </Button>
        </Space>
      </div>

      <div>
        <h3>交叉轴对齐</h3>
        <Space align="end">
          <Button>1</Button>
          <Button>
            2<br />2
          </Button>
          <Button>
            3<br />3<br />3
          </Button>
        </Space>
      </div>
    </div>
  );
};

Basic.storyName = '基本用法';

export default LoadingStory;
