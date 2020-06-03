import React, { forwardRef } from 'react'

import NewTextInput from 'components/NewInput'
import { dict } from 'components/IconExporter'

import { TextInputStyled } from './styles'

interface IProps {
  newInput?: boolean
  value?: string
  error?: boolean | { icon: keyof typeof dict; message: string }
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
  name?: string
  placeholder?: string
}

const DateInput = forwardRef<HTMLInputElement, IProps>(
  ({ newInput = false, onChange, ...rest }, ref) => {
    const applyDateMask = (event: any) => {
      const strippedValue = event.target.value.replace(/\D/g, '')
      let newValue = strippedValue

      if (strippedValue.length < 5) {
        newValue = strippedValue.replace(/(\d{2})(\d{1})/g, '$1/$2')
      } else {
        newValue = strippedValue.replace(/(\d{2})(\d{2})(\d{1})/g, '$1/$2/$3')
      }

      event.target.value = newValue

      onChange!(event)
    }

    if (newInput) {
      return (
        <NewTextInput
          onChange={applyDateMask}
          maxLength={10}
          ref={ref}
          {...rest}
        />
      )
    }

    return (
      <TextInputStyled
        maxLength="10"
        ref={ref}
        onChange={applyDateMask}
        {...rest}
      />
    )
  }
)

export default DateInput
