import React, { forwardRef } from 'react'

import TextInput from 'components/NewInput'
import { dict } from 'components/IconExporter'

interface IProps {
  prefix?: React.ReactNode
  onChange: (event: any) => void
  value?: string
  label?: string
  name?: string
  maxLength?: number
  placeholder?: string
  error?: boolean | { icon: keyof typeof dict; message: string }
  disabled?: boolean
}

const CEPInput = forwardRef<
  HTMLInputElement,
  IProps & React.HTMLAttributes<HTMLInputElement>
>(({ onChange, ...rest }, ref) => {
  const onChangeHandler = (event: any) => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    event.target.value = strippedValue.replace(/(\d{5})(\d{1})/g, '$1-$2')
    onChange(event)
  }

  return (
    <TextInput
      maxLength={9}
      ref={ref}
      onChange={onChangeHandler} 
      {...rest} 
    />
  )
})

export default CEPInput
