import React from 'react';

export interface SidebarItemProps {
  key: string;
  title: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = React.memo((props) => {
  return props.children as React.ReactElement;
});

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
