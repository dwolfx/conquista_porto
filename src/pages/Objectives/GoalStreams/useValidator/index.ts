/* eslint-disable no-underscore-dangle */
import { useEffect, useState, useLayoutEffect } from 'react'

import { IData } from '../types'

interface IFormData {
  [name: string]: string | number
}

interface ICurrentValue {
  data: IData[]
  currentStep: number
  formData: IFormData
}

const getCurrentValue = ({ data, currentStep, formData }: ICurrentValue) => {
  const { name } = data[currentStep]
  return formData[name]
}

interface IErrorMessage {
  data: IData[]
  currentStep: number
  currentValue: string | number
}

const getErrorMessage = ({
  data,
  currentStep,
  currentValue,
}: IErrorMessage) => {
  const { validate } = data[currentStep]
  return typeof validate !== 'function' ? null : validate(currentValue)
}

export default function useValidator(
  data: IData[],
  currentStep: number,
  formData: IFormData,
  inputRef: React.RefObject<HTMLInputElement | undefined>
) {
  const { current: ref } = inputRef
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState<null | {
    message: string
    icon: 'alertrounded'
  }>(null)
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

    return () => {
      if (ref) {
        ref.removeEventListener('blur', _setTouched)
      }
    }
  }, [ref])

  useLayoutEffect(() => {
    const message: string | null | undefined = getErrorMessage({
      data,
      currentStep,
      currentValue,
    })
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
