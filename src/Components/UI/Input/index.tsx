import {HtmlHTMLAttributes, forwardRef } from 'react';
import style from './style.module.css';

type Props = {
  label?: string | null;
  placeHolder?: string;
  type: string;
  id?: string;
  isError?: boolean;
  textError?: string;
  inputName?: string;
  isChecked?: boolean;
} & HtmlHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(({
  label,
  isChecked,
  placeHolder,
  type = 'text',
  id,
  isError = false,
  textError = '',
  inputName,
  ...props
}, ref) => {
  const inputClass = `${style[inputName as string]} ${isError ? style.inputError : ''}`;
  if (type === 'radio') {
    return (
      <div className={style.radioInput}>
        <div className={style.labelWrapper}>
          {label && (
            <label htmlFor={id} className={`${style.radioLabel} ${isError ? style.errorRadioLabel : ''}`}>
              {label}
            </label>
          )}
          {isError && <p className={style.textError}>{textError}</p>}
        </div>
        <input
          type="radio"
          placeholder={placeHolder}
          checked={isChecked}
          id={id}
          className={style.radioButton}
          ref={ref}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={style.inputWrapper}>
      <div className={style.labelWrapper}>
        {label && (
          <label htmlFor={id} className={`${style.label} ${isError ? style.labelError : ''}`}>
            {label}
          </label>
        )}
        {isError && <p className={style.textError}>{textError}</p>}
      </div>
      <input
        type={type}
        ref={ref}
        placeholder={placeHolder}
        id={id}
        className={inputClass}
        {...props}
      />
    </div>
  );
});

export default Input;
