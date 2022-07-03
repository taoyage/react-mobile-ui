import React from 'react';

import { Meta } from '@storybook/react';

import Grid from '@/grid';

import './index.scss';

const GridStory: Meta = {
  title: '布局/Grid 栅格',
  component: Grid,
};

export const Basic = () => {
  return (
    <div className="grid-demo">
      <div>
        <h3>基本用法</h3>
        <Grid columns={3} gap={8}>
          <Grid.Item>
            <div className="grid-demo-item-block">A</div>
          </Grid.Item>
          <Grid.Item>
            <div className="grid-demo-item-block">B</div>
          </Grid.Item>
          <Grid.Item>
            <div className="grid-demo-item-block">C</div>
          </Grid.Item>
          <Grid.Item>
            <div className="grid-demo-item-block">D</div>
          </Grid.Item>
          <Grid.Item>
            <div className="grid-demo-item-block">E</div>
          </Grid.Item>
        </Grid>
      </div>
      <div>
        <h3>格子跨度</h3>
        <Grid columns={3} gap={8}>
          <Grid.Item>
            <div className="grid-demo-item-block">A</div>
          </Grid.Item>
          <Grid.Item span={2}>
            <div className="grid-demo-item-block">B</div>
          </Grid.Item>
          <Grid.Item span={2}>
            <div className="grid-demo-item-block">C</div>
          </Grid.Item>
          <Grid.Item>
            <div className="grid-demo-item-block">D</div>
          </Grid.Item>
          <Grid.Item span={3}>
            <div className="grid-demo-item-block">E</div>
          </Grid.Item>
        </Grid>
      </div>
    </div>
  );
};

Basic.storyName = '基本用法';

export default GridStory;
