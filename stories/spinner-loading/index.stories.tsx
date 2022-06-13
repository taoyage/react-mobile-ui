import React from 'react';
import { Meta } from '@storybook/react';

import SpinnerLoading from '@/spinner-loading';

import './index.scss';

const LoadingStory: Meta = {
  title: '反馈/Loading 加载中',
  component: SpinnerLoading,
};

export const Basic = () => {
  return (
    <>
      <div>
        <h3>基本用法</h3>
        <SpinnerLoading />
      </div>
      <div>
        <h3>颜色</h3>
        <div className="row">
          <SpinnerLoading />
          <SpinnerLoading color="primary" />
          <SpinnerLoading color="red" />
        </div>
      </div>
      <div>
        <h3>大小</h3>
        <div className="row">
          <SpinnerLoading size={24} />
          <SpinnerLoading size={32} />
          <SpinnerLoading size={48} />
        </div>
      </div>
    </>
  );
};

Basic.storyName = '基本用法';

export default LoadingStory;
