import React from 'react';
import { Meta } from '@storybook/react';

import { List } from 'antd-mobile';

import InfiniteScroll from '@/infinite-scroll';
import Space from '@/space';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const ErrorStory: Meta = {
  title: '信息展示/infiniteScroll 无限滚动',
  component: InfiniteScroll,
};

const mockData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];

function sleep(ms: number): any {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export const Basic = () => {
  const [data1, setData1] = React.useState<string[]>(mockData);
  const [data2, setData2] = React.useState<string[]>(mockData);
  const [hasMore1, setHasMore1] = React.useState<boolean>(true);
  const [hasMore2, setHasMore2] = React.useState<boolean>(true);

  const loadMore1 = async () => {
    await sleep(3000);
    setData1((val) => [...val, ...mockData]);
    if (data1.length >= 68) {
      setHasMore1(false);
    }
  };

  const loadMore2 = async () => {
    await sleep(3000);
    setData2((val) => [...val, ...mockData]);
    if (data2.length >= 68) {
      setHasMore2(false);
    }
  };

  return (
    <DemoWrap>
      <Space direction="vertical">
        <DemoBlock title="基础用法" style={{ padding: '10px' }}>
          <div style={{ height: 300, overflow: 'hidden', overflowY: 'scroll', position: 'relative' }}>
            <InfiniteScroll hasMore={hasMore1} loadMore={loadMore1}>
              <List>
                {data1.map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </InfiniteScroll>
          </div>
        </DemoBlock>

        <DemoBlock title="自定义底部加载" style={{ padding: '10px' }}>
          <div style={{ height: 300, overflow: 'hidden', overflowY: 'scroll', position: 'relative' }}>
            <InfiniteScroll
              hasMore={hasMore2}
              loadMore={loadMore2}
              footer={hasMore2 ? <span>加载中</span> : <span>--- 没有更多 ---</span>}
            >
              <List>
                {data2.map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </InfiniteScroll>
          </div>
        </DemoBlock>
      </Space>

      {/* <DemoBlock title="自定义descript" style={{ padding: '10px' }}>
        <ErrorBlock title="网络开小差" description="请尝试刷新页面" />
      </DemoBlock> */}
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default ErrorStory;
