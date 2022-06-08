import React from 'react';
import { Meta } from '@storybook/react';

import { Mask } from '@/mask';

const MaskStory: Meta = {
  title: '反馈/Mas 遮罩层',
  component: Mask,
};

export const Basic = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>显示遮罩层</button>
      <Mask visible={visible} onMaskClick={() => setVisible(false)} />
    </div>
  );
};

Basic.storyName = '基本用法';

export default MaskStory;
