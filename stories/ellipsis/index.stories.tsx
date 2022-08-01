import React from 'react';
import { Meta } from '@storybook/react';

import Ellipsis from '@/ellipsis';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const EllipsisStory: Meta = {
  title: '信息展示/Ellipsis 文本省略',
  component: Ellipsis,
};

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="一行省略" style={{ padding: 20 }}>
        <Ellipsis text="React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes" />
      </DemoBlock>

      <DemoBlock title="多行省略" style={{ padding: 20 }}>
        <Ellipsis
          rows={3}
          text="React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes"
        />
      </DemoBlock>

      <DemoBlock title="展开和收起" style={{ padding: 20 }}>
        <Ellipsis
          expand="展开"
          collapse="收起"
          text="React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes"
        />
      </DemoBlock>

      <DemoBlock title="仅展开" style={{ padding: 20 }}>
        <Ellipsis
          expand="展开"
          text="React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes"
        />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default EllipsisStory;
