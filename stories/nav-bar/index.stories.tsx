import React from 'react';
import { Meta } from '@storybook/react';
import { SearchOutline } from 'antd-mobile-icons';

import NavBar from '@/nav-bar';
import Toast from '@/toast';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const NavBarStory: Meta = {
  title: '导航/NavBar 导航栏',
  component: NavBar,
};

export const Basic = () => {
  const onBack = () => {
    Toast.show('back');
  };

  return (
    <DemoWrap>
      <DemoBlock title="基本用法" style={{ padding: 0 }}>
        <NavBar leftArrow={false}>标题</NavBar>
      </DemoBlock>
      <DemoBlock title="自定义返回按钮" style={{ padding: 0 }}>
        <NavBar onBack={onBack} leftText="返回" leftArrow={true}>
          标题
        </NavBar>
      </DemoBlock>
      <DemoBlock title="右侧按钮" style={{ padding: 0 }}>
        <NavBar onBack={onBack} right={<SearchOutline />}>
          标题
        </NavBar>
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default NavBarStory;
