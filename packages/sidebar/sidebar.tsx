import React from 'react';
import cx from 'classnames';

import SidebarItem from '@/sidebar/sidebar-item';

import './styles/index.scss';

export interface SidebarProps {
  activeKey: string;
  onChange?: (key: string) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties &
    Partial<
      Record<'--width' | '--height' | '--background-color' | '--content-padding' | '--sidebar-item-padding', string>
    >;
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

  const onSetActive = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const key = (e.target as HTMLElement).dataset['key'];
      setActiveKey(key as string);
      props.onChange?.(key as string);
    },
    [props.onChange]
  );

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-items`} style={props.style}>
        {items.map((item) => {
          const active = item.key === activeKey;
          return (
            <div
              className={cx(`${classPrefix}-item`, {
                [`${classPrefix}-item-active`]: active,
              })}
              key={item.key}
              data-key={item.key}
              onClick={onSetActive}
            >
              <div className={`${classPrefix}-item-title`} data-key={item.key}>
                {item.props.title}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${classPrefix}-content`}>
        {items.map((item) => (
          <div
            key={item.key}
            className={`${classPrefix}-content-item`}
            style={{ display: activeKey === item.key ? 'block' : 'none' }}
          >
            {item.props.children}
          </div>
        ))}
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
