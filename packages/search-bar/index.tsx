import React from 'react';
import Input, { InputRef } from '@/input';

import { SearchOutline } from 'antd-mobile-icons';

import './styles/index.scss';

const classPrefix = `ygm-search-bar`;

type TStyle = Partial<
  Record<'--color' | '--background' | '--search-background' | '--border-radius' | '--placeholder-color', string>
>;

export type SearchBarRef = InputRef;

export interface SearchBarProps {
  /** 输入内容 */
  value?: string;
  /** 提示文本 */
  placeholder?: string;
  /** 搜索框前缀图标 */
  icon?: React.ReactNode;
  /** 输入的最大字符数 */
  maxLength?: number;
  /** 是否显示清除图标，可点击清除文本框 */
  clearable?: boolean;
  /** 禁止输入 */
  disabled?: boolean;
  style?: React.CSSProperties & TStyle;
  /** 取消按钮文案 */
  cancelText?: string;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 点击取消按钮时触发事件 */
  onCancel?: () => void;
  /** 输入框回车键触发事件 */
  onSearch?: (val: string) => void;
  /** 输入框内容变化时触发事件 */
  onChange?: (val: string) => void;
  /** 点击清除图标时触发事件 */
  onClear?: () => void;
}

const SearchBar = React.forwardRef<SearchBarRef, SearchBarProps>((props, ref) => {
  const [value, setValue] = React.useState<string>(props.value!);
  const composingRef = React.useRef<boolean>(false);
  const inputRef = React.useRef<InputRef>(null);

  React.useImperativeHandle(ref, () => ({
    clear: () => inputRef.current?.clear(),
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    setValue: (val: string) => inputRef.current?.setValue(val),
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
          // 当用户使用拼音输入法开始输入汉字时，这个事件就会被触发。
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
          {props.cancelText}
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
