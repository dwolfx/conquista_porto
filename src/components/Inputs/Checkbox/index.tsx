import React from 'react'

import { Input, Label } from './styles'

interface IProps {
  id: string
  label: string | React.ReactNode
  checked: boolean
  disabled?: boolean
  onChange: () => void
}
const Checkbox = ({ id, label, checked, onChange, disabled }: IProps) => {
  return (
    <>
      <Input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <Label htmlFor={id}>{label}</Label>
    </>
  )
}

export default Checkbox
