/* eslint-disable no-underscore-dangle */
import { useEffect, useState, useLayoutEffect } from 'react'

const getCurrentValue = ({ data, currentStep, formData }) => {
  const { name } = data[currentStep]
  return formData[name]
}

const getErrorMessage = ({ data, currentStep, currentValue }) => {
  const { validate } = data[currentStep]
  return typeof validate !== 'function' ? null : validate(currentValue)
}

export default function useValidator(data, currentStep, formData, inputRef) {
  const { current: ref } = inputRef
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState(null)
  const [invalid, setInvalid] = useState(false)

  const currentValue = getCurrentValue({ data, currentStep, formData })

  useEffect(() => {
    setTouched(false)
  }, [currentStep])

  useEffect(() => {
    const _setTouched = () => {
      setTouched(true)
    }
    if (ref) {
      ref.addEventListener('blur', _setTouched)
    }

    return () => ref && ref.removeEventListener('blur', _setTouched)
  }, [ref])

  useLayoutEffect(() => {
    const message = getErrorMessage({ data, currentStep, currentValue })
    setError(
      message && touched
        ? {
            message,
            icon: 'alertrounded',
          }
        : null
    )

    setInvalid(!!message)
  }, [touched, data, currentStep, currentValue])

  return [error, invalid]
}
