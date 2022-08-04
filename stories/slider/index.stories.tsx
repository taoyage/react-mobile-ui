import React from 'react';
import { Meta } from '@storybook/react';

import Slider from '@/slider';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const SliderStory: Meta = {
  title: '信息录入/Slider 滑动条',
  component: Slider,
};

export const Basic = () => {
  const onChange = (value: number) => {
    console.log(value);
  };

  const onChangeAfter = (value: number) => {
    console.log(value);
  };

  return (
    <DemoWrap>
      <DemoBlock title="基础用法" style={{ padding: 30 }}>
        <Slider onChange={onChange} onChangeAfter={onChangeAfter} />
      </DemoBlock>
      <DemoBlock title="最大/最小值" style={{ padding: 30 }}>
        <Slider onChange={onChange} min={10} max={200} onChangeAfter={onChangeAfter} />
      </DemoBlock>
      <DemoBlock title="禁用状态" style={{ padding: 30 }}>
        <Slider onChange={onChange} disabled={true} value={10} onChangeAfter={onChangeAfter} />
      </DemoBlock>
      <DemoBlock title="自定义样式" style={{ padding: 30 }}>
        <Slider
          onChange={onChange}
          onChangeAfter={onChangeAfter}
          value={30}
          style={{ '--slider-bar-fill-color': 'red', '--slider-background-color': 'gray' }}
        />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default SliderStory;
