import { useCallback, useState } from 'react'

function useValidation() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/

    const isValidDomain = domainRegex.test(email.split('@')[1])

    return emailRegex.test(email) && isValidDomain
  }

  const isValidSearch = (search) => {
    const searchRegex = /^[A-Za-zА-Яа-я\s]+$/
    return searchRegex.test(search)
  }

  const handleChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    setValues({ ...values, [name]: value })
    const getFormValidity = () => {
      const form = target.closest('form')
      const inputs = Array.from(form.querySelectorAll('input'))
      return inputs.every((input) => input.checkValidity())
    }

    if (name === 'email') {
      if (!isValidEmail(value)) {
        setErrors({
          ...errors,
          [name]: 'Введите e-mail в формате pochta@email.ru',
        })
        setIsValid(false)
      } else {
        setErrors({ ...errors, [name]: '' })
        const isValidForm = getFormValidity()
        setIsValid(isValidForm)
      }
    } else if (name === 'search') {
      if (!isValidSearch(value)) {
        setErrors({
          ...errors,
          [name]: 'Нужно ввести ключевое слово',
        })
        setIsValid(false)
      } else {
        setErrors({ ...errors, [name]: '' })
        const isValidForm = getFormValidity()
        setIsValid(isValidForm)
      }
    } else {
      setErrors({ ...errors, [name]: target.validationMessage })
      const isValidForm = getFormValidity()
      setIsValid(isValidForm)
    }
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
    },
    [setValues, setErrors, setIsValid]
  )

  return {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isValid,
    setIsValid,
    resetForm,
  }
}

export default useValidation
