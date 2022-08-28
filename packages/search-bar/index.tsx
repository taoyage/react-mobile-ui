import React from 'react';
import Input, { InputRef } from '@/input';

import { SearchOutline } from 'antd-mobile-icons';

import './styles/index.scss';

const classPrefix = `ygm-search-bar`;

type TStyle = Partial<
  Record<'--color' | '--background' | '--search-background' | '--border-radius' | '--placeholder-color', string>
>;

export type SearchbarRef = InputRef;

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

const SearchBar = React.forwardRef<SearchbarRef, SearchBarProps>((props, ref) => {
  const [value, setValue] = React.useState<string>(props.value!);
  const composingRef = React.useRef<boolean>(false);
  const inputRef = React.useRef<InputRef>(null);

  React.useImperativeHandle(ref, () => ({
    clear: () => inputRef.current?.clear(),
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  const onChange = (value: string) => {
    setValue(value);
    props.onChange?.(value);
  };

  const onEnterPress = () => {
    // 在拼音输入法输入汉字时，避免enter键的搜索触发
    if (!composingRef.current) {
      inputRef.current?.blur();
      props.onSearch?.(value);
    }
  };

  return (
    <div className={classPrefix} style={props.style}>
      <div className={`${classPrefix}-content`}>
        <div className={`${classPrefix}-content-icon`}>{props.icon}</div>
        <Input
          ref={inputRef}
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
