/* eslint-disable no-underscore-dangle */
import { useEffect, useState, useMemo } from 'react'

const useCurrentValue = ({ data, currentStep, formData }) => {
  const { name } = data[currentStep]
  return formData[name]
}

const useValidate = ({ data, currentStep, currentValue }) =>
  useMemo(async () => {
    const { validate } = data[currentStep]
    return typeof validate !== 'function' ? false : validate(currentValue)
  }, [data, currentStep, currentValue])

export default function useValidator(data, currentStep, formData, inputRef) {
  const { current: ref } = inputRef
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState(undefined)
  const [invalid, setInvalid] = useState(undefined)

  const currentValue = useCurrentValue({ data, currentStep, formData })
  const validateStatus = useValidate({ data, currentStep, currentValue })

  useEffect(() => {
    const waitForValidate = async () => {
      setInvalid(await validateStatus)
    }

    waitForValidate()
  }, [validateStatus, setInvalid])

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

  useEffect(() => {
    const validateField = async () => {
      const errorMessage = await validateStatus
      setError(
        errorMessage && touched
          ? {
              message: errorMessage,
              icon: 'alertrounded',
            }
          : undefined
      )

      return undefined
    }

    validateField()
  }, [touched, validateStatus, setError])

  return [error, invalid]
}
