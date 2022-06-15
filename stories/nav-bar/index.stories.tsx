import React from 'react';
import { Meta } from '@storybook/react';
import { SearchOutline } from 'antd-mobile-icons';

import NavBar from '@/nav-bar';

import './index.scss';

const LoadingStory: Meta = {
  title: '导航/NavBar 导航栏',
  component: NavBar,
};

export const Basic = () => {
  const onBack = () => {
    console.log('back');
  };

  return (
    <div className="nav-bar-wrap">
      <div>
        <h3>基本用法</h3>
        <NavBar leftArrow={false}>标题</NavBar>
      </div>
      <div>
        <h3>自定义返回按钮</h3>
        <NavBar onBack={onBack} leftText="返回" leftArrow={true}>
          标题
        </NavBar>
      </div>
      <div>
        <h3>右侧按钮</h3>
        <NavBar onBack={onBack} right={<SearchOutline />}>
          标题
        </NavBar>
      </div>
    </div>
  );
};

Basic.storyName = '基本用法';

export default LoadingStory;
