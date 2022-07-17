import React from 'react';
import { Meta } from '@storybook/react';

import { List } from 'antd-mobile';

import InfiniteScroll from '@/infinite-scroll';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const ErrorStory: Meta = {
  title: '信息展示/infiniteScroll 无限滚动',
  component: InfiniteScroll,
};

const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];

export const Basic = () => {
  const loadMore = async () => {
    Promise.resolve(1);
  };

  return (
    <DemoWrap>
      <DemoBlock title="基础用法" style={{ padding: '10px' }}>
        <div style={{ height: 300, overflow: 'hidden', overflowY: 'scroll', position: 'relative' }}>
          <InfiniteScroll hasMore={true} loadMore={loadMore}>
            <List>
              {data.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
          </InfiniteScroll>
        </div>
      </DemoBlock>

      {/* <DemoBlock title="自定义title" style={{ padding: '10px' }}>
        <ErrorBlock title="网络开小差" />
      </DemoBlock>

      <DemoBlock title="自定义descript" style={{ padding: '10px' }}>
        <ErrorBlock title="网络开小差" description="请尝试刷新页面" />
      </DemoBlock> */}
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default ErrorStory;
