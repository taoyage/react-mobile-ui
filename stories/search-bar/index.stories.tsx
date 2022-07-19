import React from 'react';
import { Meta } from '@storybook/react';

import SearchBar from '@/search-bar';
import Toast from '@/toast';

import DemoWrap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';

const SearchBarStories: Meta = {
  title: '信息录入/SearchBar 搜索栏',
  component: SearchBar,
};

export const Basic = () => {
  const onClear = () => {
    Toast.show('清除');
  };

  const onSearch = () => {
    Toast.show('搜索');
  };

  return (
    <DemoWrap>
      <DemoBlock title="基础用法">
        <SearchBar placeholder="请输入搜索关键词" />
      </DemoBlock>

      <DemoBlock title="事件监听">
        <SearchBar placeholder="请输入搜索关键词" onClear={onClear} onSearch={onSearch} showCancel />
      </DemoBlock>

      <DemoBlock title="禁用搜索框">
        <SearchBar placeholder="请输入搜索关键词" disabled />
      </DemoBlock>

      <DemoBlock title="自定义样式">
        <SearchBar
          placeholder="请输入搜索关键词"
          style={{
            '--background': '#b8dee8',
            '--border-radius': '10px',
            '--search-background': '#e1dbdb',
            '--placeholder-color': '#726969',
          }}
        />
      </DemoBlock>
    </DemoWrap>
  );
};

Basic.storyName = '基本用法';

export default SearchBarStories;
