import InternalGrid from '@/grid/grid';
import GridItem from '@/grid/grid-item';

export type { GridProps } from '@/grid/grid';
export type { GridItemProps } from '@/grid/grid-item';

type InternalGridType = typeof InternalGrid;

export interface GridInterface extends InternalGridType {
  Item: typeof GridItem;
}

const Grid = InternalGrid as GridInterface;

Grid.Item = GridItem;

export default Grid;
