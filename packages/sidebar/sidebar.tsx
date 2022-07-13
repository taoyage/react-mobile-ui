import React from 'react';
import cx from 'classnames';

import SidebarItem from '@/sidebar/sidebar-item';

export interface SidebarProps {
  activeKey: string;
  onChange?: (key: string) => void;
  children?: React.ReactNode;
}

const classPrefix = `ygm-sidebar`;

const Sidebar: React.FC<SidebarProps> = React.memo((props) => {
  const [activeKey, setActiveKey] = React.useState<string>(props.activeKey);

  const items: React.ReactElement<React.ComponentProps<typeof SidebarItem>>[] = [];

  React.Children.forEach(props.children, (child) => {
    if (!React.isValidElement(child)) return;
    if (!child.key) return;
    items.push(child);
  });

  const onItem = React.useCallback(() => {}, []);

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-items`}>
        {items.map((item) => {
          const active = item.key === activeKey;

          return (
            <div
              className={cx(`${classPrefix}-item`, {
                [`${classPrefix}-item-active`]: active,
              })}
              key={item.key}
              onClick={onItem}
            >
              <div className={`${classPrefix}-item-title`}>{item.props.title}</div>
            </div>
          );
        })}
      </div>

      {items.map((item) => (
        <div key={item.key} className={`${classPrefix}-content`}>
          {item.props.children}
        </div>
      ))}
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
