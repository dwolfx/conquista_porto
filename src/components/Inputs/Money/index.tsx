import React, { forwardRef } from 'react'

import TextInput from 'components/NewInput'
import { dict } from 'components/IconExporter'
import { formatMoneyDecimal } from 'helpers'

interface IProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  onChange: (event: any) => void
  value?: string
  label?: string
  name?: string
  maxLength?: number
  placeholder?: string
  error?: boolean | { icon: keyof typeof dict; message: string }
  disabled?: boolean
}

const MoneyInput = forwardRef<
  HTMLInputElement,
  IProps & React.HTMLAttributes<HTMLInputElement>
>(({ onChange, prefix = 'R$', suffix, ...rest }, ref) => {
  const onChangeHandler = (event: any) => {
    const formattedValue = formatMoneyDecimal(
      event.target.value.replace(/[\D]/g, '')
    )
    event.target.value = formattedValue
    onChange(event)
  }

  return (
    <TextInput
      ref={ref}
      prefix={prefix}
      suffix={suffix}
      onChange={onChangeHandler}
      {...rest}
    />
  )
})

export default MoneyInput
