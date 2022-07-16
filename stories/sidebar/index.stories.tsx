import React from 'react';
import { Meta } from '@storybook/react';

import Sidebar from '@/sidebar';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

import './index.scss';

const LoadingStory: Meta = {
  title: '导航/Sidebar 侧边导航',
  component: Sidebar,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="基础用法">
        <Sidebar activeKey="1">
          <Sidebar.Item key="1" title="item1">
            1
          </Sidebar.Item>
          <Sidebar.Item key="2" title="item2">
            2
          </Sidebar.Item>
          <Sidebar.Item key="3" title="item3">
            3
          </Sidebar.Item>
          <Sidebar.Item key="4" title="item4">
            4
          </Sidebar.Item>
        </Sidebar>
      </DemoBlock>

      <DemoBlock title="自定义列宽">
        <Sidebar activeKey="1" style={{ '--width': '120px' }}>
          <Sidebar.Item key="1" title="item1">
            1
          </Sidebar.Item>
          <Sidebar.Item key="2" title="item2">
            2
          </Sidebar.Item>
          <Sidebar.Item key="3" title="item3">
            3
          </Sidebar.Item>
          <Sidebar.Item key="4" title="item4">
            4
          </Sidebar.Item>
        </Sidebar>
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default LoadingStory;
