import React from 'react'

import { SwitchContainer, SwitchLabel, SwitchInput, Label } from './styles'

interface IProps {
  id: string
  value: boolean
  onChangeSwitch: () => void
  leftLabel: string
  rightLabel: string
  disabled: boolean
}

const Switch = ({
  id,
  value,
  onChangeSwitch,
  leftLabel = '',
  rightLabel = '',
  disabled = false,
}: IProps) => {
  return (
    <SwitchContainer>
      <Label htmlFor={id}>{leftLabel}</Label>
      <SwitchInput
        id={id}
        disabled={disabled}
        checked={value}
        onChange={onChangeSwitch}
      />
      <SwitchLabel htmlFor={id}>{rightLabel}</SwitchLabel>
    </SwitchContainer>
  )
}

export default Switch
