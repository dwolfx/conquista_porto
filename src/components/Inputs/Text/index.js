import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { InputWrapper, InputLabel, InputText } from './styles'

/**
 * Instructions
 *
 * - label: name of input
 * - onChange: function that handles on change input
 * - other props
 */

export default function Text({
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
  labelFixed,
  ...rest
}) {
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
      labelFixed={labelFixed}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <InputText
        type={type || 'text'}
        onChange={changeLabelPosition}
        {...rest}
      />
    </InputWrapper>
  )
}

Text.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingRight: PropTypes.number,
  paddingLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginLeft: PropTypes.number,
  disabled: PropTypes.bool,
  labelFixed: PropTypes.bool,
  error: PropTypes.bool,
}
Text.defaultProps = {
  label: '',
  type: 'text',
  onChange: () => {},
  width: '100%',
  paddingRight: 0,
  paddingLeft: 0,
  marginRight: 0,
  marginLeft: 0,
  disabled: false,
  labelFixed: false,
  error: false,
}
