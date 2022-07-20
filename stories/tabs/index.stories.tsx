import React from 'react';
import { Meta } from '@storybook/react';

import Tabs from '@/tabs';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

import './index.scss';

const TabsStory: Meta = {
  title: '导航/ Tabs 标签页',
  component: Tabs,
};

export const Basic = () => (
  <DemoWrap>
    <DemoBlock title="基本用法">
      <Tabs activeKey="1">
        <Tabs.Tab title="标签1" key="1">
          内容1
        </Tabs.Tab>
        <Tabs.Tab title="标签2" key="2">
          内容2
        </Tabs.Tab>
        <Tabs.Tab title="标签3" key="3">
          内容3
        </Tabs.Tab>
      </Tabs>
    </DemoBlock>

    <DemoBlock title="样式风格">
      <Tabs
        activeKey="1"
        showTabLine={false}
        type="card"
        tabListClassName="tabs-demo-list"
        tabActiveClassName="tabs-demo-active"
      >
        <Tabs.Tab title="标签1" key="1">
          内容1
        </Tabs.Tab>
        <Tabs.Tab title="标签2" key="2">
          内容2
        </Tabs.Tab>
        <Tabs.Tab title="标签3" key="3">
          内容3
        </Tabs.Tab>
      </Tabs>
    </DemoBlock>
  </DemoWrap>
);

Basic.storyName = '基础用法';

export default TabsStory;
