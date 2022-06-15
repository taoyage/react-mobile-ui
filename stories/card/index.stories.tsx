import React from 'react';

import { Meta } from '@storybook/react';
import { RightOutline } from 'antd-mobile-icons';

import Card from '@/card';

import './index.scss';

const CardStory: Meta = {
  title: '信息展示/Card 卡片',
  component: Card,
};

export const Basic = () => {
  return (
    <div className="card-wrap">
      <div>
        <h3>基本用法</h3>
        <Card title="标题">内容</Card>
      </div>
      <div>
        <h3>只有标题</h3>
        <Card title="标题" />
      </div>
      <div>
        <h3>只有内容</h3>
        <Card>内容</Card>
      </div>

      <div>
        <h3>自定义卡片样式</h3>
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
      </div>
    </div>
  );
};

Basic.storyName = '基本用法';

export default CardStory;
