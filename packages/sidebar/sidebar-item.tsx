import React from 'react';

export interface SidebarItemProps {
  key: string;
  title: React.ReactNode;
  children: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  return props.children ? (props.children as React.ReactElement) : null;
};

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
