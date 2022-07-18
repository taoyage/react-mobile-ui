import React from 'react';

export interface InputProps {
  value: string;
  placeholder?: string;
  clearable?: boolean;
  autoFocus?: boolean;
  onChange?: (val: string) => void;
  onClear?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const classPrefix = `ygm-input`;

const Input: React.FC<InputProps> = React.memo((props) => {
  const [value, setValue] = React.useState<string>(props.value);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange?.(e.target.value);
  }, []);

  const onFocus = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    props?.onFocus(e);
  }, []);

  const onBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    props?.onBlur(e);
  }, []);

  return (
    <div className={classPrefix}>
      <input
        className={`${classPrefix}-element`}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
