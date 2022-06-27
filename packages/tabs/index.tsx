import Tabs from '@/tabs/tabs';
import Tab from '@/tabs/tab';

export type { TabsProps } from '@/tabs/tabs';
export type { TabProps } from '@/tabs/tab';

type TTabs = typeof Tabs;

export interface ITabs extends TTabs {
  Tab: typeof Tab;
}

const MyTabs: ITabs = Tabs as ITabs;

MyTabs.Tab = Tab;

export default MyTabs;
