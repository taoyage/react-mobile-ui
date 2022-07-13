import React from 'react';

export interface TabProps {
  key: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Tab: React.FC<TabProps> = React.memo((props) => {
  return props.children as React.ReactElement;
});

Tab.displayName = 'Tab';

export default Tab;
