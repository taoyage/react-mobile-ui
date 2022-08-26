import React from 'react';

import { Meta } from '@storybook/react';

import Button from '@/button';
import Space from '@/space';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const ButtonStory: Meta = {
  title: '通用/Button 按钮',
  component: Button,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="填充模式">
        <Space wrap>
          <Button color="primary" fill="solid">
            Solid
          </Button>
          <Button color="primary" fill="outline">
            Outline
          </Button>
          <Button color="primary" fill="none">
            None
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="按钮颜色">
        <Space wrap>
          <Button>default</Button>
          <Button color="primary">primary</Button>
          <Button color="success">success</Button>
          <Button color="danger">danger</Button>
          <Button color="warning">warning</Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="块级按钮">
        <Button block color="primary" size="large">
          block button
        </Button>
      </DemoBlock>

      <DemoBlock title="按钮尺寸">
        <Space wrap>
          <Button color="primary" size="small">
            small
          </Button>
          <Button color="primary" size="middle">
            middle
          </Button>
          <Button color="primary" size="large">
            large
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="形状">
        <Space wrap>
          <Button shape="default" color="primary">
            Default Button
          </Button>
          <Button block shape="rounded" color="primary">
            Rounded Button
          </Button>
          <Button block shape="rectangular" color="primary">
            Rectangular Button
          </Button>
        </Space>
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default ButtonStory;
