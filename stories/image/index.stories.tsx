import React from 'react';

import { Meta } from '@storybook/react';

import Image from '@/image';

import demoImg from './img.png';

import './index.scss';

const ImageStory: Meta = {
  title: '信息展示/Image 图片',
  component: Image,
};

export const Basic = () => {
  return (
    <div className="img-wrap">
      <div>
        <h3>基本用法</h3>
        <Image src={demoImg} alt="demo" />
      </div>
      <div>
        <h3>填充模式</h3>
        <Image src={demoImg} width="100" height="100" alt="demo" fit="contain" />
        <Image src={demoImg} width="100" height="100" alt="demo" fit="cover" />
        <Image src={demoImg} width="100" height="100" alt="demo" fit="fill" />
        <Image src={demoImg} width="100" height="100" alt="demo" fit="scale-down" />
      </div>

      <div>
        <h3>圆角</h3>
        <Image src={demoImg} width="64" height="64" alt="demo" style={{ borderRadius: 4 }} />
        <Image src={demoImg} width="64" height="64" alt="demo" style={{ borderRadius: 8 }} />
        <Image src={demoImg} width="64" height="64" alt="demo" style={{ borderRadius: 32 }} />
      </div>

      <div>
        <h3>懒加载</h3>
        <Image src={demoImg} width="64" height="64" alt="demo" style={{ borderRadius: 4 }} lazy={true} />
      </div>
    </div>
  );
};

Basic.storyName = '基本用法';

export default ImageStory;
