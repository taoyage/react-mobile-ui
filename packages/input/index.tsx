import React from 'react';
import cx from 'classnames';

import { CloseCircleFill } from 'antd-mobile-icons';

import './styles/index.scss';

type TStyle = Partial<Record<'--color' | '--placeholder-color', string>>;

export interface InputRef {
  clear: () => void;
  focus: () => void;
  blur: () => void;
}

export interface InputProps {
  id?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  /** 是否显示清除icon */
  clearable?: boolean;
  style?: React.CSSProperties & TStyle;

  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  pattern?: string;
  name?: string;
  autoComplete?: 'on' | 'off';
  autoCapitalize?: 'on' | 'off';
  autoCorrect?: 'on' | 'off';
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  type?: React.HTMLInputTypeAttribute;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onCompositionStart?: React.CompositionEventHandler<HTMLInputElement>;
  onCompositionEnd?: React.CompositionEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;

  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (val: string) => void;
  onClear?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const classPrefix = `ygm-input`;

const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const [value, setValue] = React.useState<string>(props.value!);
  const nativeInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useImperativeHandle(ref, () => ({
    clear: () => {
      setValue('');
    },
    focus: () => {
      nativeInputRef.current?.focus();
    },
    blur: () => {
      nativeInputRef.current?.blur();
    },
  }));

  const handleKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (props.onEnterPress && e.code === 'Enter') {
        props.onEnterPress(e);
      }
      props.onKeyDown?.(e);
    },
    [props]
  );

  const showClearable = React.useMemo(() => {
    if (!props.clearable || !value || props.readOnly) return false;
    return true;
  }, [props.clearable, props.readOnly, value]);

  return (
    <div className={cx(classPrefix, { [`${classPrefix}-disabled`]: props.disabled })}>
      <input
        ref={nativeInputRef}
        id={props.id}
        style={props.style}
        className={`${classPrefix}-element`}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        value={value}
        disabled={props.disabled}
        readOnly={props.readOnly}
        maxLength={props.maxLength}
        minLength={props.minLength}
        autoComplete={props.autoComplete}
        inputMode={props.inputMode}
        type={props.type}
        name={props.name}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        onKeyDown={handleKeydown}
        onKeyUp={props.onKeyUp}
        onCompositionStart={props.onCompositionStart}
        onCompositionEnd={props.onCompositionEnd}
        onClick={props.onClick}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange?.(e.target.value);
        }}
        onFocus={(e) => {
          props?.onFocus?.(e);
        }}
        onBlur={(e) => {
          props?.onBlur?.(e);
        }}
      />

      {showClearable && (
        <div
          className={`${classPrefix}-clear`}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={() => {
            setValue('');
            props.onClear?.();
          }}
        >
          <CloseCircleFill />
        </div>
      )}
    </div>
  );
});

Input.defaultProps = {
  autoComplete: 'off',
  autoCapitalize: 'off',
  autoCorrect: 'off',
  value: '',
  id: 'ygm-input',
  type: 'text',
};

Input.displayName = 'Input';

export default Input;
