import React from 'react'
import './InputAuth.css'

const InputAuth = (props) => {
  return (
    <>
      <fieldset className="input__fieldset">
        <label className="input__label" htmlFor={props.useInput}>
          {props.label}
        </label>
        <input
          className={`input__auth ${
            props.onActiveError ? 'input__error-color' : ''
          }`}
          name={props.useInput}
          id={props.useInput}
          type={props.typeInput}
          minLength={props.minLength}
          maxLength={props.maxLength}
          required
        />
      </fieldset>
      {props.useInput === 'password' ? (
        <span
          className={`input__error ${
            props.onActiveError ? 'input__error-visible' : ''
          } `}
        >
          Что-то пошло не так...
        </span>
      ) : (
        <span className="input__error"></span>
      )}
    </>
  )
}

export default InputAuth
