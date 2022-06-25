import React from 'react';
import { Meta } from '@storybook/react';

import PullToRefresh from '@/pull-to-refresh';

import './index.scss';

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
    <div style={{ overflowY: 'auto' }}>
      <div>
        <h3>基本用法</h3>
        <PullToRefresh onRefresh={onRefresh}>
          {list.map((_, index) => (
            <div key={index}>list-{index}</div>
          ))}
        </PullToRefresh>
      </div>
    </div>
  );
};

Basic.storyName = '基本用法';

export default CountdownStory;
