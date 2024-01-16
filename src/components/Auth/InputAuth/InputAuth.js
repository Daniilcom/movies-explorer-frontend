import React from 'react'
import './InputAuth.css'

const InputAuth = (props) => {
  const {
    useInput,
    label,
    error,
    onActiveField,
    typeInput,
    minLength,
    maxLength,
    value,
    onChange,
    onFocus,
    onBlur,
    errorColor,
  } = props

  const errorMessage = error[useInput]

  return (
    <>
      <fieldset className="input__fieldset">
        <label className="input__label" htmlFor={useInput}>
          {label}
        </label>
        <input
          className={`input__auth ${
            errorMessage || errorColor ? 'input__error-color' : ''
          }`}
          name={useInput}
          id={useInput}
          type={typeInput}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={label}
          value={value || ''}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required
        />
      </fieldset>
      {onActiveField === useInput && errorMessage && (
        <span className="input__error">{errorMessage}</span>
      )}
    </>
  )
}

export default InputAuth
