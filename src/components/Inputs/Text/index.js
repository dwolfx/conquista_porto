import React from 'react'
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
  value,
  isLabelFixed,
  ...rest
}) {
  return (
    <InputWrapper
      error={error}
      width={width}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      marginLeft={marginLeft}
      marginRight={marginRight}
      disabled={disabled}
      isLabelFixed={isLabelFixed}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <InputText
        type={type || 'text'}
        value={value}
        onChange={onChange}
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
  isLabelFixed: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  isLabelFixed: false,
  error: false,
  value: '',
}
