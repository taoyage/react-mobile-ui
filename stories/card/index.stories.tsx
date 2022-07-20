import React from 'react';

import { Meta } from '@storybook/react';
import { RightOutline } from 'antd-mobile-icons';

import Card from '@/card';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const CardStory: Meta = {
  title: '信息展示/Card 卡片',
  component: Card,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="基本用法" style={{ background: '#dfdddd' }}>
        <Card title="标题">内容</Card>
      </DemoBlock>
      <DemoBlock title="只有标题" style={{ background: '#dfdddd' }}>
        <Card title="标题" />
      </DemoBlock>

      <DemoBlock title="只有内容" style={{ background: '#dfdddd' }}>
        <Card>内容</Card>
      </DemoBlock>

      <DemoBlock title="自定义卡片样式" style={{ background: '#dfdddd' }}>
        <Card titleClassName="card-wrap-title" bodyClassName="card-wrap-body" title="标题" extra={<RightOutline />}>
          <div className="card-wrap-body-item">
            <div className="card-wrap-body-item-inner" />
          </div>
          <div className="card-wrap-body-item">
            <div className="card-wrap-body-item-inner" />
          </div>
          <div className="card-wrap-body-item">
            <div className="card-wrap-body-item-inner" />
          </div>
        </Card>
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default CardStory;
