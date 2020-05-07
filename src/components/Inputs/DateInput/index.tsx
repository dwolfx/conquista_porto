/* eslint-disable no-param-reassign */
import React, { forwardRef } from 'react'

import NewTextInput from 'components/NewInput'

import { TextInputStyled } from './styles'

interface IProps {
  newInput?: boolean
  value?: string
  onKeyUp?: () => void
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
}

const DateInput = forwardRef<HTMLInputElement, IProps>(
  ({ newInput = false, onKeyUp = () => {}, ...rest }, ref) => {
    const applyDateMask = (event: any) => {
      const strippedValue = event.target.value.replace(/\D/g, '')
      let newValue = strippedValue

      if (strippedValue.length < 5) {
        newValue = strippedValue.replace(/(\d{2})(\d{1})/g, '$1/$2')
      } else {
        newValue = strippedValue.replace(/(\d{2})(\d{2})(\d{1})/g, '$1/$2/$3')
      }

      event.target.value = newValue

      onKeyUp()
    }

    if (newInput) {
      return (
        <NewTextInput
          onKeyUp={applyDateMask}
          maxLength="10"
          ref={ref}
          {...rest}
        />
      )
    }

    return (
      <TextInputStyled
        maxLength="10"
        ref={ref}
        onKeyUp={applyDateMask}
        {...rest}
      />
    )
  }
)

export default DateInput
