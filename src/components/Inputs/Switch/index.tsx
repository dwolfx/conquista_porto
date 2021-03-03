import React from 'react'

import { SwitchContainer, SwitchLabel, SwitchInput, Label } from './styles'

interface IProps {
  id: string
  value: boolean
  onChangeSwitch: () => void
  leftLabel?: string
  rightLabel?: string
  disabled?: boolean
  isToggle?: boolean
}

const Switch = ({
  id,
  value,
  onChangeSwitch,
  leftLabel = '',
  rightLabel = '',
  disabled = false,
  isToggle = false,
}: IProps) => {
  return (
    <SwitchContainer isToggle={isToggle}>
      <Label htmlFor={id}>{leftLabel}</Label>
      <SwitchInput
        id={id}
        disabled={disabled}
        checked={value}
        onChange={onChangeSwitch}
        isToggle={isToggle}
      />
      <SwitchLabel htmlFor={id} isToggle={isToggle}>
        {rightLabel}
      </SwitchLabel>
    </SwitchContainer>
  )
}

export default Switch
