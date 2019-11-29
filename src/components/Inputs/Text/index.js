import React, { useState } from 'react'
import { InputWrapper, InputLabel, InputText } from './styles'

/**
 * Instructions
 *
 * - label: name of input
 * - onChange: function that handles on change input
 * - other props
 */

export default ({
  label,
  type,
  onChange,
  width,
  paddingRight,
  paddingLeft,
  marginRight,
  marginLeft,
  disabled,
  error,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false)

  const changeLabelPosition = event => {
    if (event.target.value.length) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }

    if (onChange) {
      onChange()
    }
  }

  return (
    <InputWrapper
      active={isActive}
      error={error}
      width={width}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      marginLeft={marginLeft}
      marginRight={marginRight}
      disabled={disabled}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <InputText
        type={type || 'text'}
        onChange={changeLabelPosition}
        {...props}
      />
    </InputWrapper>
  )
}
