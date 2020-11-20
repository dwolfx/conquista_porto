import React from 'react'

import * as s from './styles'

interface IProps {
  id: string
  name: string
  value: any
  checked: boolean
  label?: string
  disabled?: boolean
  handleChange: (event?: React.FormEvent<HTMLInputElement>) => void
}

const RadioComponent = ({
  id,
  name,
  label,
  value,
  checked,
  handleChange,
  disabled = false
}: IProps & React.HTMLAttributes<HTMLInputElement>) => {

  return (
    <s.RadioInputWrapper>
      <s.RadioInput
        id={`input-radio-${id}`}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        tabIndex={0}
        onChange={handleChange}
        aria-checked={checked}
        aria-label={label ? label : id}
      />
      {label && (
        <s.RadioLabel disabled={disabled} htmlFor={`input-radio-${id}`}>{label}</s.RadioLabel>
      )}
    </s.RadioInputWrapper>
  )
}

export default RadioComponent
