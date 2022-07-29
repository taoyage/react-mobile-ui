import React from 'react';
import cx from 'classnames';

import Space from '@/space';
import Grid from '@/grid';

import CheckMark from '@/selector/CheckMark';

import './styles/index.scss';

export interface SelectorOption<V = unknown> {
  label: React.ReactNode;
  value: V;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectorProps<V> {
  options: SelectorOption<V>[];
  value?: V[];
  /** 布局列数 */
  columns?: number;
  /** label间距 */
  gap?: number | string | [number | string, number | string];
  /** 是否支持多选 */
  multiple?: boolean;
  showCheckMark?: boolean;
  onChange?: (v: V[], items: SelectorOption<V>[]) => void;
  /** 自定义样式 */
  style?: React.CSSProperties &
    Partial<
      Record<
        | '--color'
        | '--checked-color'
        | '--text-color'
        | '--checked-text-color'
        | '--border'
        | '--checked-border'
        | '--border-radius'
        | '--padding',
        string
      >
    >;
}

type SelectorValue = string | number;

const classPrefix = `ygm-selector`;

const Selector = <V extends SelectorValue>(props: SelectorProps<V>) => {
  const [value, setValue] = React.useState<V[]>(props.value!);

  const items = props.options.map((option) => {
    const active = value.includes(option.value);
    const disabled = !!option.disabled;
    const className = cx(`${classPrefix}-item`, {
      [`${classPrefix}-item-active`]: active,
      [`${classPrefix}-item-disabled`]: disabled,
    });

    const onClick = () => {
      if (disabled) return;
      if (props.multiple) {
        const val = active ? value.filter((v) => v !== option.value) : [...value, option.value];
        const selectorOptions = props.options.filter((option) => val.includes(option.value));
        setValue(val);
        props.onChange?.(val, selectorOptions);
      } else {
        const val = active ? [] : [option.value];
        setValue(val);
        props.onChange?.(val, [option]);
      }
    };

    return (
      <div key={option.value} className={className} onClick={onClick} style={props.style}>
        {option.label}
        {option.description && <div className={`${classPrefix}-item-description`}>{option.description}</div>}

        {active && props.showCheckMark && (
          <div className={`${classPrefix}-check-mark`}>
            <CheckMark />
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={classPrefix}>
      {!props.columns ? (
        <Space wrap gap={props.gap}>
          {items}
        </Space>
      ) : (
        <Grid columns={props.columns} gap={props.gap}>
          {items}
        </Grid>
      )}
    </div>
  );
};

Selector.displayName = 'Selector';

Selector.defaultProps = {
  value: [],
  gap: 8,
  showCheckMark: true,
};
export default Selector;
