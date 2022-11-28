import React from 'react';
import cx from 'classnames';

import Tab from '@/tabs/tab';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useUpdateIsomorphicLayoutEffect from '@/hooks/useUpdateIsomorphicLayoutEffect';

import { traverseReactNode } from '@/utils/traverse-react-node';

import './styles/index.scss';

export interface TabsProps {
  /** 当前激活tab面板的key */
  activeKey: string;
  children?: React.ReactNode;
  /** 是否显示tab下划线 */
  showTabLine?: boolean;
  /** tab展示形式 */
  type?: 'line' | 'card';
  /** 点击tab切换后回调 */
  onChange?: (key: string) => void;
  /** 激活的tab样式 */
  tabActiveClassName?: string;
  /** tab列表样式 */
  tabListClassName?: string;
  /** tab内容样式 */
  tabContentClassName?: string;
}

const classPrefix = 'ygm-tabs';

const Tabs: React.FC<TabsProps> = (props) => {
  const [activeKey, setActiveKey] = React.useState<string>(props.activeKey);
  const [activeLineStyle, setActiveLineStyle] = React.useState({
    width: 0,
    transform: `translate3d(0px, 0px, 0px)`,
    transitionDuration: '0',
  });
  const tabListRef = React.useRef<HTMLDivElement>(null);

  const keyToIndexRecord: Record<string, number> = React.useMemo(() => ({}), []);
  const panes: React.ReactElement<React.ComponentProps<typeof Tab>>[] = [];

  traverseReactNode(props.children, (child) => {
    if (!React.isValidElement(child)) return;
    if (!child.key) return;
    const length = panes.push(child);
    keyToIndexRecord[child.key] = length - 1;
  });

  const onTab = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const key = (e.target as HTMLElement).dataset['key'] as string;
      setActiveKey(key);
      props?.onChange?.(key);
    },
    [props?.onChange]
  );

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
          child.props.children && (
            <div
              key={child.key}
              className={cx(`${classPrefix}-content`, props.tabContentClassName)}
              style={{ display: activeKey === child.key ? 'block' : 'none' }}
            >
              {child}
            </div>
          )
      )}
    </div>
  );
};

Tabs.defaultProps = {
  showTabLine: true,
  type: 'line',
};

Tabs.displayName = 'Tabs';

export default Tabs;
