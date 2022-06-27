import React from 'react';

export interface TabProps {
  key: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Tab: React.FC<TabProps> = React.memo((props) => {
  return <div>{props.children}</div>;
});

Tab.displayName = 'Tab';

export default Tab;
