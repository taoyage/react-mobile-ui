import React from 'react';

import './styles/grid.scss';

const classPrefix = 'ygm-grid';

export interface GridProps {
  columns: number;
  gap?: number | string | [number | string, number | string];
  children?: React.ReactNode;
}

const formatGap = (gap: string | number) => (typeof gap === 'number' ? `${gap}px` : gap);

const Grid: React.FC<GridProps> = React.memo((props) => {
  const style = React.useMemo(() => {
    if (props.gap !== undefined) {
      if (Array.isArray(props.gap)) {
        const [gapH, gapV] = props.gap;
        return {
          '--gap-horizontal': formatGap(gapH),
          '--gap-vertical': formatGap(gapV),
          '--columns': props.columns,
        };
      } else {
        return { '--gap': formatGap(props.gap), '--columns': props.columns };
      }
    }
    return { '--columns': props.columns };
  }, [props.gap, props.columns]);

  return (
    <div className={classPrefix} style={style as React.CSSProperties}>
      {props.children}
    </div>
  );
});

Grid.displayName = 'Grid';

export default Grid;
