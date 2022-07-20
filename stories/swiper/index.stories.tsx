import React from 'react';
import { Meta } from '@storybook/react';

import Swiper from '@/swiper';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

import './index.scss';

const SwiperStory: Meta = {
  title: '信息展示/Swiper 轮播图',
  component: Swiper,
  subcomponents: { 'Swiper.Item': Swiper.Item },
};

const colors = ['#ace0ff', '#bcffbd', '#e4fabd'];

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="基本用法">
        <Swiper autoplay={false}>
          {colors.map((color, index) => (
            <Swiper.Item key={index}>
              <div className="swiper-demo-content" style={{ background: color }}>
                {index + 1}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default SwiperStory;
