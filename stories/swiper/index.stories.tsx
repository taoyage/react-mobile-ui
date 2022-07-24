import React from 'react';
import { Meta } from '@storybook/react';

import Swiper, { SwiperRef } from '@/swiper';
import Button from '@/button';
import Space from '@/space';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

import './index.scss';

const SwiperStory: Meta = {
  title: '信息展示/Swiper 轮播图',
  component: Swiper,
  subcomponents: { 'Swiper.Item': Swiper.Item },
};

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];

export const Basic = () => {
  const swiperRef = React.useRef<SwiperRef>(null);

  return (
    <DemoWrap>
      <DemoBlock title="基本用法">
        <Swiper>
          {colors.map((color, index) => (
            <Swiper.Item key={index}>
              <div className="swiper-demo-content" style={{ background: color }}>
                {index + 1}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </DemoBlock>

      <DemoBlock title="自动播放">
        <Swiper autoplay={true}>
          {colors.map((color, index) => (
            <Swiper.Item key={index}>
              <div className="swiper-demo-content" style={{ background: color }}>
                {index + 1}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </DemoBlock>

      <DemoBlock title="循环">
        <Swiper loop={true} autoplay={true}>
          {colors.map((color, index) => (
            <Swiper.Item key={index}>
              <div className="swiper-demo-content" style={{ background: color }}>
                {index + 1}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </DemoBlock>

      <DemoBlock title="自定义样式">
        <Swiper loop={true} style={{ '--border-radius': '8px' }}>
          {colors.map((color, index) => (
            <Swiper.Item key={index}>
              <div className="swiper-demo-content" style={{ background: color }}>
                {index + 1}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </DemoBlock>

      <DemoBlock title="手动控制">
        <Swiper style={{ marginBottom: '8px' }} ref={swiperRef}>
          {colors.map((color, index) => (
            <Swiper.Item key={index}>
              <div className="swiper-demo-content" style={{ background: color }}>
                {index + 1}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
        <Space>
          <Button
            onClick={() => {
              swiperRef.current?.swipePrev();
            }}
          >
            上一张
          </Button>
          <Button
            onClick={() => {
              swiperRef.current?.swipeNext();
            }}
          >
            下一张
          </Button>
        </Space>
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default SwiperStory;
