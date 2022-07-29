import React from 'react';
import { Meta } from '@storybook/react';

import Selector from '@/selector';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const SidebarStory: Meta = {
  title: '信息录入/Selector 选择组',
  component: Selector,
};

const options = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
  },
];

const options1 = [
  {
    label: '选项一',
    value: '1',
    disabled: true,
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
  },
];

const options2 = [
  {
    label: '选项一',
    value: '1',
    description: '描述一',
  },
  {
    label: '选项二',
    value: '2',
    description: '描述二',
  },
];

export const Basic = () => {
  return (
    <DemoWrap>
      <DemoBlock title="单选">
        <Selector options={options} value={['2']} />
      </DemoBlock>

      <DemoBlock title="多选">
        <Selector
          options={options}
          value={['1', '2']}
          multiple={true}
          onChange={(value, selectorOptions) => {
            console.log(value);
            console.log(selectorOptions);
          }}
        />
      </DemoBlock>

      <DemoBlock title="自定义N列布局">
        <Selector options={options} value={['1', '2']} columns={2} multiple={true} />
      </DemoBlock>

      <DemoBlock title="禁用状态">
        <Selector options={options1} value={['1']} columns={3} multiple={true} />
      </DemoBlock>

      <DemoBlock title="描述">
        <Selector options={options2} value={['1']} columns={3} />
      </DemoBlock>

      <DemoBlock title="自定义样式">
        <Selector
          options={options}
          value={['1']}
          showCheckMark={false}
          style={{
            '--border-radius': '100px',
            '--border': 'solid transparent 1px',
            '--checked-border': 'solid var(--ygm-color-primary) 1px',
          }}
        />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default SidebarStory;
