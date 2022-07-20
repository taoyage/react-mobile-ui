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
      <DemoBlock title="按钮颜色">
        <Space wrap>
          <Button>default</Button>
          <Button color="primary">primary</Button>
          <Button color="success">success</Button>
          <Button color="danger">danger</Button>
          <Button color="warning">warning</Button>
        </Space>
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
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default ButtonStory;
