import clsx from 'clsx';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { InputWrapper, InputWrapperProps } from './input-wrapper';

type TextInputProps = Omit<InputWrapperProps, 'onInputReseted'> & {
  value: InputHTMLAttributes<HTMLInputElement>['value'];
  /** Name of the input */
  name: string;
  /** Optional: Input placeholder */
  placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder'];
  /** Optional: Input type */
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  /** Optional: Input mode */
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  /** Optional: Input step */
  step?: InputHTMLAttributes<HTMLInputElement>['step'];
  /** Optional: Show an icon in the input field */
  icon?: React.ReactElement;
  /** Optional: Input onBlur handler */
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
  /**
   * Callback function called when the value changes.
   * @param value New value
   * @returns void.
   */
  onValueChanged: (value: string) => void;
  className?: string;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    id,
    value,
    label,
    error = false,
    errorMessage,
    help = false,
    helpMessage,
    placeholder,
    name,
    icon,
    step = '1',
    type = 'text',
    inputMode = 'text',
    className,
    onBlur,
    onValueChanged,
  } = props;

  const getConvertedValue = (value: string | number) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    return '';
  };

  const [inputValue, setInputValue] = useState<string>(getConvertedValue(value as string | number));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    onValueChanged(getConvertedValue(inputValue));
  }, [inputValue]);

  return (
    <InputWrapper id={id} label={label} error={error} errorMessage={errorMessage} help={help} helpMessage={helpMessage}>
      {icon ? <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div> : null}
      <input
        ref={ref}
        name={name}
        value={inputValue}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        step={step}
        className={clsx(
          'focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-background-900 block w-full rounded-md border-neutral-200 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:text-neutral-200',
          error ? 'border-2 !border-red-600 dark:!border-red-400' : '',
          icon ? 'pl-10' : '',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        onChange={handleInputChange}
        onBlur={onBlur}
      />
    </InputWrapper>
  );
});

TextInput.displayName = 'TextInput';
