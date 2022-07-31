import React from 'react';

export interface TabProps {
  key: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const Tab: React.FC<TabProps> = (props) => {
  return props.children ? (props.children as React.ReactElement) : null;
};

Tab.displayName = 'Tab';

export default Tab;
