import React from 'react';
import { Meta } from '@storybook/react';

import Tabs from '@/tabs';

import './index.scss';

const TabsStory: Meta = {
  title: '导航/ Tabs 标签页',
  component: Tabs,
};

export const Basic = () => (
  <div className="tabs-demo">
    <div>
      <h3>基本用法</h3>
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
    </div>

    <div>
      <h3>样式风格</h3>
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
    </div>
  </div>
);

Basic.storyName = '基础用法';

export default TabsStory;
