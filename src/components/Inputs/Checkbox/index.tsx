import React, { forwardRef } from 'react'

import { Input, Label, CheckboxWrapper } from './styles'

interface IProps {
  id: string
  label?: string | React.ReactNode
  checked: boolean
  disabled?: boolean
}
const Checkbox = forwardRef<
  HTMLInputElement,
  IProps & React.HTMLAttributes<HTMLInputElement>
>(({ id, label, checked, disabled, className, ...rest }, ref) => {
  return (
    <CheckboxWrapper className={className}>
      <Input
        ref={ref}
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        {...rest}
      />
      <Label htmlFor={id}>{label}</Label>
    </CheckboxWrapper>
  )
})

export default Checkbox
