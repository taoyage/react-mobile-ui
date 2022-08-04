import CellGroup from '@/cell/cell-group';
import InternalCell from '@/cell/cell';

export type { CellGroupProps } from '@/cell/cell-group';
export type { CellProps } from '@/cell/cell';

type InternalCellType = typeof InternalCell;

interface CellInterface extends InternalCellType {
  Group: typeof CellGroup;
}

const Cell = InternalCell as CellInterface;

Cell.Group = CellGroup;

export default Cell;
