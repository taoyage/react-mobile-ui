import React from 'react';
import Input from '@/input';

import { SearchOutline } from 'antd-mobile-icons';

import './styles/index.scss';

const classPrefix = `ygm-search-bar`;

type TStyle = Partial<
  Record<'--color' | '--background' | '--search-background' | '--border-radius' | '--placeholder-color', string>
>;

export interface SearchBarProps {
  value?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  maxLength?: number;
  clearable?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties & TStyle;
  cancelText?: string;
  showCancel?: boolean;
  onCancel?: () => void;
  onSearch?: (val: string) => void;
  onChange?: (val: string) => void;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo((props) => {
  const [value, setValue] = React.useState<string>(props.value!);
  const composingRef = React.useRef<boolean>(false);

  const onChange = React.useCallback(
    (value: string) => {
      setValue(value);
      props.onChange?.(value);
    },
    [props.onChange]
  );

  const onEnterPress = React.useCallback(() => {
    // 在拼音输入法输入汉字时，避免enter键的搜索触发
    if (!composingRef.current) {
      props.onSearch?.(value);
    }
  }, [props.onSearch]);

  return (
    <div className={classPrefix} style={props.style}>
      <div className={`${classPrefix}-content`}>
        <div className={`${classPrefix}-content-icon`}>{props.icon}</div>
        <Input
          className={`${classPrefix}-content-input`}
          style={{ '--placeholder-color': props.style?.['--placeholder-color'], '--color': props.style?.['--color'] }}
          placeholder={props.placeholder}
          value={value}
          disabled={props.disabled}
          maxLength={props.maxLength}
          clearable={props.clearable}
          type="search"
          onChange={onChange}
          onClear={props.onClear}
          onEnterPress={onEnterPress}
          onCompositionStart={() => {
            composingRef.current = true;
          }}
          onCompositionEnd={() => {
            composingRef.current = false;
          }}
        />
      </div>
      {props.showCancel && (
        <div className={`${classPrefix}-content-cancel`} role="button" onClick={props.onCancel}>
          取消
        </div>
      )}
    </div>
  );
});

SearchBar.defaultProps = {
  value: '',
  icon: <SearchOutline />,
  clearable: true,
  cancelText: '取消',
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
