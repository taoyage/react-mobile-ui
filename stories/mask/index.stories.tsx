import React from 'react';
import { Meta } from '@storybook/react';

import Mask from '@/mask';
import Button from '@/button';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const MaskStory: Meta = {
  title: '反馈/Mask 遮罩层',
  component: Mask,
};

export const Basic = () => {
  const [visible1, setVisible1] = React.useState<boolean>(false);
  const [visible2, setVisible2] = React.useState<boolean>(false);
  return (
    <DemoWrap>
      <DemoBlock title="基本用法">
        <Button onClick={() => setVisible1(true)}>显示遮罩</Button>
        <Mask visible={visible1} onMaskClick={() => setVisible1(false)} />
      </DemoBlock>

      <DemoBlock title="自定义颜色">
        <Button onClick={() => setVisible2(true)}>自定义颜色遮罩</Button>
        <Mask
          visible={visible2}
          style={{ '--background': 'rgba(0, 0, 0, .2)' }}
          onMaskClick={() => setVisible2(false)}
        />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default MaskStory;
