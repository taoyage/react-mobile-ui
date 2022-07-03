import React from 'react';
import cx from 'classnames';

import Tab from '@/tabs/tab';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useUpdateIsomorphicLayoutEffect from '@/hooks/useUpdateIsomorphicLayoutEffect';

import './styles/index.scss';

export interface TabsProps {
  activeKey: string;
  children: React.ReactNode;
  showTabLine?: boolean;
  type?: 'line' | 'card';
  tabActiveClassName?: string;
  tabListClassName?: string;
  tabContentClassName?: string;
}

const classPrefix = 'ygm-tabs';

const Tabs: React.FC<TabsProps> = React.memo((props) => {
  const [activeKey, setActiveKey] = React.useState<string>(props.activeKey);
  const [activeLineStyle, setActiveLineStyle] = React.useState({
    width: 0,
    transform: `translate3d(0px, 0px, 0px)`,
    transitionDuration: '0',
  });
  const tabListRef = React.useRef<HTMLDivElement>(null);

  const keyToIndexRecord: Record<string, number> = React.useMemo(() => ({}), []);
  const panes: React.ReactElement<React.ComponentProps<typeof Tab>>[] = [];

  React.Children.forEach(props.children, (child) => {
    if (!React.isValidElement(child)) return;
    if (!child.key) return;
    const length = panes.push(child);
    keyToIndexRecord[child.key] = length - 1;
  });

  const onTab = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const key = (e.target as HTMLElement).dataset['key'];
    setActiveKey(key as string);
  }, []);

  const calculateLineWidth = React.useCallback(
    (immediate = false) => {
      if (!props.showTabLine) return;
      const tabListEle = tabListRef.current;
      if (!tabListEle) return;
      const activeIndex = keyToIndexRecord[activeKey];
      const activeTabWrapper = tabListRef.current.children.item(activeIndex + 1) as HTMLDivElement;
      const activeTab = activeTabWrapper.children.item(0) as HTMLDivElement;
      const activeTabWidth = activeTab.offsetWidth;
      const activeTabLeft = activeTab.offsetLeft;
      const width = activeTabWidth;
      const x = activeTabLeft;

      setActiveLineStyle({
        width,
        transform: `translate3d(${x}px, 0px, 0px)`,
        transitionDuration: immediate ? '0ms' : '300ms',
      });
    },
    [activeKey, keyToIndexRecord, props.showTabLine]
  );

  useIsomorphicLayoutEffect(() => {
    calculateLineWidth(true);
  }, []);

  useUpdateIsomorphicLayoutEffect(() => {
    calculateLineWidth();
  }, [calculateLineWidth]);

  React.useEffect(() => {
    window.addEventListener('resize', () => calculateLineWidth(true));

    return () => window.removeEventListener('resize', () => calculateLineWidth(true));
  }, [calculateLineWidth]);

  return (
    <div className={classPrefix}>
      <div
        className={cx(`${classPrefix}-tab-list`, props.tabListClassName, {
          [`${classPrefix}-tab-list-${props.type}`]: true,
        })}
        ref={tabListRef}
      >
        {props.showTabLine && (
          <div
            className={`${classPrefix}-tab-line`}
            style={{
              ...activeLineStyle,
            }}
          />
        )}
        {panes.map((item) => (
          <div
            key={item.key}
            className={cx(`${classPrefix}-tab`, props.tabActiveClassName, {
              [`${classPrefix}-tab-active`]: activeKey === item.key,
            })}
            data-key={item.key}
            onClick={onTab}
          >
            <div className={`${classPrefix}-tab-title`} data-key={item.key}>
              {item.props.title}
            </div>
          </div>
        ))}
      </div>

      {panes.map(
        (child) =>
          activeKey === child.key && (
            <div key={child.key} className={cx(`${classPrefix}-content`, props.tabContentClassName)}>
              {child}
            </div>
          )
      )}
    </div>
  );
});

Tabs.defaultProps = {
  showTabLine: true,
  type: 'line',
};

Tabs.displayName = 'Tabs';

export default Tabs;
