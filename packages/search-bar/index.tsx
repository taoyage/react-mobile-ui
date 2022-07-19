import React from 'react';

const classPrefix = `ygm-search-bar`;

export interface SearchBarProps {
  value: string;
  placeholder?: string;
  icon?: React.ReactNode;
  onSearch?: (val: string) => void;
  onChange?: (val: string) => void;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo((props) => {
  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-box`}>
        <div className={`${classPrefix}-box-icon`} />
        <input
          className={`${classPrefix}-box-input`}
          placeholder={props.placeholder}
          value={props.value}
          type="search"
        />
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
