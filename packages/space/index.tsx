import React from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface SpaceProps {
  /** 间距方向 */
  direction?: 'horizontal' | 'vertical';
  /** 交叉轴对齐方式 */
  align?: 'start' | 'end' | 'center' | 'baseline';
  /** 主轴对齐方式	 */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
  /** 是否自动换行，仅在 horizontal 时有效	 */
  wrap?: boolean;
  /** 是否渲染为块级元素	 */
  block?: boolean;
  /** 间距大小，设为数组时则分别设置垂直方向和水平方向的间距大小 */
  gap?: number | string | [number | string, number | string];
  /** 元素点击事件 */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const classPrefix = `ygm-space`;

const formatGap = (gap: string | number) => (typeof gap === 'number' ? `${gap}px` : gap);

const Space: React.FC<SpaceProps> = React.memo((props) => {
  const style = React.useMemo(() => {
    if (props.gap) {
      if (Array.isArray(props.gap)) {
        const [gapH, gapV] = props.gap;
        return {
          '--gap-vertical': formatGap(gapV),
          '--gap-horizontal': formatGap(gapH),
        };
      }
      return { '--gap': formatGap(props.gap) };
    }
    return {};
  }, [props.gap]);

  return (
    <div
      className={cx(classPrefix, {
        [`${classPrefix}-wrap`]: props.wrap,
        [`${classPrefix}-block`]: props.block,
        [`${classPrefix}-${props.direction}`]: true,
        [`${classPrefix}-align-${props.align}`]: !!props.align,
        [`${classPrefix}-justify-${props.justify}`]: !!props.justify,
      })}
      onClick={props.onClick}
      style={style as React.CSSProperties}
    >
      {React.Children.map(props.children, (child) => {
        return child !== null && child !== undefined && <div className={`${classPrefix}-item`}>{child}</div>;
      })}
    </div>
  );
});

Space.defaultProps = {
  direction: 'horizontal',
};

Space.displayName = 'Space';

export default Space;
