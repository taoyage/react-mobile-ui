import React from 'react';
import { Meta } from '@storybook/react';

import Toast from '@/toast';
import ToastComponent from '@/toast/toast';
import Button from '@/button';

import './index.scss';

const ToastStory: Meta = {
  title: '反馈/ Toast 轻提示',
  component: ToastComponent,
};

export const Basic = () => (
  <div className="toast-demo">
    <div>
      <h3>基本用法</h3>
      <Button
        onClick={() =>
          Toast.show({
            content: 'Hello World',
            afterClose: () => {
              console.log('after');
            },
          })
        }
      >
        文字提示
      </Button>
    </div>

    <div>
      <h3>图标</h3>

      <Button
        color="success"
        onClick={() =>
          Toast.show({
            icon: 'success',
            content: 'success',
            afterClose: () => {
              console.log('after');
            },
          })
        }
      >
        成功
      </Button>

      <Button
        color="warning"
        onClick={() =>
          Toast.show({
            icon: 'fail',
            content: 'faild',
            afterClose: () => {
              console.log('after');
            },
          })
        }
      >
        失败
      </Button>

      <Button
        color="primary"
        onClick={() =>
          Toast.show({
            icon: 'loading',
            content: 'loading',
            afterClose: () => {
              console.log('after');
            },
          })
        }
      >
        加载中
      </Button>
    </div>
  </div>
);

Basic.storyName = '基础用法';

export default ToastStory;
