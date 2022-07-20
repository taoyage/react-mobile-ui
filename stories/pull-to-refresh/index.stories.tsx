import React from 'react';
import { Meta } from '@storybook/react';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

import PullToRefresh from '@/pull-to-refresh';

const CountdownStory: Meta = {
  title: '反馈/PullToRefresh 下拉刷新',
  component: PullToRefresh,
};

const list = new Array(20).fill(1);

export const Basic = () => {
  const onRefresh = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <DemoWrap>
      <DemoBlock title="基本用法">
        <PullToRefresh onRefresh={onRefresh}>
          {list.map((_, index) => (
            <div key={index}>list-{index}</div>
          ))}
        </PullToRefresh>
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default CountdownStory;
