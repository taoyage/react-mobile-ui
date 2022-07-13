import InternalTabs from '@/tabs/tabs';
import Tab from '@/tabs/tab';

export type { TabsProps } from '@/tabs/tabs';
export type { TabProps } from '@/tabs/tab';

type InternalTabsType = typeof InternalTabs;

export interface TabsInterface extends InternalTabsType {
  Tab: typeof Tab;
}

const Tabs = InternalTabs as TabsInterface;

Tabs.Tab = Tab;

export default Tabs;
