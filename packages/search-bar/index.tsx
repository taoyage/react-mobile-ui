import React from 'react';
import Input from '@/input';

import { SearchOutline } from 'antd-mobile-icons';

const classPrefix = `ygm-search-bar`;

export interface SearchBarProps {
  value?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  maxLength?: number;
  clearable?: boolean;

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
    <div className={classPrefix}>
      <div className={`${classPrefix}-content`}>
        <div className={`${classPrefix}-content-icon`}>{props.icon}</div>
        <Input
          className={`${classPrefix}-content-input`}
          placeholder={props.placeholder}
          value={value}
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
    </div>
  );
});

SearchBar.defaultProps = {
  value: '',
  icon: <SearchOutline />,
  clearable: true,
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
