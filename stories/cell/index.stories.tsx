import React from 'react';
import { Meta } from '@storybook/react';
import { UnorderedListOutline, PayCircleOutline } from 'antd-mobile-icons';

import Cell from '@/cell';
import Space from '@/space';

import DemoWrap from '../../demos/demo-wrap';

const CellStory: Meta = {
  title: '信息展示/Cell 单元格',
  component: Cell,
  subcomponents: { 'Cell.Group': Cell.Group },
};

export const Basic = () => {
  return (
    <DemoWrap>
      <Space direction="vertical">
        <Cell.Group title="基本用法">
          <Cell title="单元格">内容</Cell>
          <Cell title="单元格" description="描述信息">
            内容
          </Cell>
        </Cell.Group>

        <Cell.Group title="卡片风格" mode="card">
          <Cell title="单元格">内容</Cell>
          <Cell title="单元格" description="描述信息">
            内容
          </Cell>
        </Cell.Group>

        <Cell.Group title="展示图标">
          <Cell title="单元格" leftIcon={<UnorderedListOutline />}>
            内容
          </Cell>
          <Cell title="单元格" leftIcon={<PayCircleOutline />} />
        </Cell.Group>

        <Cell.Group title="展示箭头">
          <Cell title="单元格" clickable>
            内容
          </Cell>
          <Cell title="单元格" clickable />
        </Cell.Group>
      </Space>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default CellStory;
