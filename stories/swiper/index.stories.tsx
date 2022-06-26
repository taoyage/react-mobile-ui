import React from 'react';
import { Meta } from '@storybook/react';

import Swiper from '@/swiper';

import './index.scss';

const SwiperStory: Meta = {
  title: '信息展示/Swiper 轮播图',
  component: Swiper,
  subcomponents: { 'Swiper.Item': Swiper.Item },
};

const colors = ['#ace0ff', '#bcffbd', '#e4fabd'];

export const Basic = () => {
  return (
    <div className="swiper-demo">
      <div>
        <h3>基本用法</h3>
        <Swiper autoplay={false}>
          {colors.map((color, index) => (
            <Swiper.Item key={index}>
              <div className="swiper-demo-content" style={{ background: color }}>
                {index + 1}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

Basic.storyName = '基本用法';

export default SwiperStory;
