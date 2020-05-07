import React, { forwardRef } from 'react'

import TextInput from 'components/NewInput'
import { formatMoneyDecimal } from 'helpers'

interface IProps {
  prefix?: React.ReactNode
  onChange: (event: any) => void
  value?: string
}

const MoneyInput = forwardRef<HTMLInputElement, IProps>(
  ({ onChange, prefix = 'R$', ...rest }, ref) => {
    const onChangeHandler = (event: any) => {
      const formattedValue = formatMoneyDecimal(
        event.target.value.replace(/[\D]/g, '')
      )
      const newEvent = {
        ...event,
        target: { ...event.target, value: formattedValue },
      }
      onChange(newEvent)
    }

    return (
      <TextInput
        ref={ref}
        prefix={prefix}
        onChange={onChangeHandler}
        {...rest}
      />
    )
  }
)

export default MoneyInput
