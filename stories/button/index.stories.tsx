import React from 'react';

import { Meta } from '@storybook/react';

import Button from '@/button';

import './index.scss';

const ButtonStory: Meta = {
  title: '通用/Button 按钮',
  component: Button,
};

export const Basic = () => {
  return (
    <div>
      <div>
        <h3>按钮颜色</h3>
        <div className="button-wrap">
          <div>
            <Button>default</Button>
          </div>
          <div>
            <Button color="primary">primary</Button>
          </div>
          <div>
            <Button color="success">success</Button>
          </div>
          <div>
            <Button color="danger">danger</Button>
          </div>
          <div>
            <Button color="warning">warning</Button>
          </div>
        </div>
      </div>

      <div>
        <h3>按钮尺寸</h3>
        <div className="button-wrap">
          <div>
            <Button color="primary" size="small">
              small
            </Button>
          </div>
          <div>
            <Button color="primary" size="middle">
              middle
            </Button>
          </div>
          <div>
            <Button color="primary" size="large">
              large
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Basic.storyName = '基本用法';

export default ButtonStory;
