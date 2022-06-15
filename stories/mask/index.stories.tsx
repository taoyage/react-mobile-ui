import React from 'react';
import { Meta } from '@storybook/react';

import Mask from '@/mask';
import Button from '@/button';

const MaskStory: Meta = {
  title: '反馈/Mask 遮罩层',
  component: Mask,
};

export const Basic = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>显示遮罩层</Button>
      <Mask visible={visible} onMaskClick={() => setVisible(false)} />
    </div>
  );
};

Basic.storyName = '基本用法';

export default MaskStory;
