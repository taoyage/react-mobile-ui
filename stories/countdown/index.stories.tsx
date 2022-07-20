import React from 'react';
import { Meta } from '@storybook/react';

import Countdown from '@/countdown';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

import './index.scss';

const CountdownStory: Meta = {
  title: '信息展示/Countdown 倒计时',
  component: Countdown,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="基本用法">
        <Countdown time={3001} endText="活动结束" />
      </DemoBlock>

      <DemoBlock title="自定义格式">
        <Countdown time={24 * 60 * 60 * 1000} format="dd天hh时mm分ss秒" />
      </DemoBlock>

      <DemoBlock title="自定义样式">
        <Countdown
          time={60 * 60 * 1000}
          format="hh:mm:ss"
          numberClassName="demo-countdown-num"
          symbolClassName="demo-countdown-symbol"
        />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default CountdownStory;
