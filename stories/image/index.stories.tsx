import React from 'react';

import { Meta } from '@storybook/react';

import Image from '@/image';
import Space from '@/space';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

import demoImg from './img.png';

const ImageStory: Meta = {
  title: '信息展示/Image 图片',
  component: Image,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="基本用法">
        <Image src={demoImg} alt="demo" />
      </DemoBlock>

      <DemoBlock title="填充模式">
        <Space wrap>
          <Image src={demoImg} width="100" height="100" alt="demo" fit="contain" />
          <Image src={demoImg} width="100" height="100" alt="demo" fit="cover" />
          <Image src={demoImg} width="100" height="100" alt="demo" fit="fill" />
          <Image src={demoImg} width="100" height="100" alt="demo" fit="scale-down" />
        </Space>
      </DemoBlock>

      <DemoBlock title="圆角">
        <Space wrap>
          <Image src={demoImg} width="64" height="64" alt="demo" style={{ borderRadius: 4 }} />
          <Image src={demoImg} width="64" height="64" alt="demo" style={{ borderRadius: 8 }} />
          <Image src={demoImg} width="64" height="64" alt="demo" style={{ borderRadius: 32 }} />
        </Space>
      </DemoBlock>

      <DemoBlock title="懒加载">
        <Image src={demoImg} width="64" height="64" alt="demo" style={{ borderRadius: 4 }} lazy={true} />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default ImageStory;
