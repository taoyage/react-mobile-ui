import InternalSidebar from '@/sidebar/sidebar';
import SidebarItem from '@/sidebar/sidebar-item';

export type { SidebarProps } from '@/sidebar/sidebar';
export type { SidebarItemProps } from '@/sidebar/sidebar-item';

type InternalSidebarType = typeof InternalSidebar;

export interface SidebarInterface extends InternalSidebarType {
  Item: typeof SidebarItem;
}

const Sidebar = InternalSidebar as SidebarInterface;

Sidebar.Item = SidebarItem;

export default Sidebar;
