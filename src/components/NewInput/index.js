import React from 'react'
import PropTypes from 'prop-types'

import {
  Input,
  InputAddon,
  InputGroupWrapper,
  InputLabel,
  InputWrapper,
} from './styles'

const NewInput = ({ prefix, suffix, label, type, width, ...rest }) => (
  <InputGroupWrapper>
    {label && <InputLabel>{label}</InputLabel>}
    <InputWrapper prefix={prefix} suffix={suffix}>
      {prefix && <InputAddon id="prefix">{prefix}</InputAddon>}
      <Input width={width} {...rest} type={type} />
      {suffix && <InputAddon id="suffix">{suffix}</InputAddon>}
    </InputWrapper>
  </InputGroupWrapper>
)

NewInput.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  type: PropTypes.string,
  width: PropTypes.string,
}

NewInput.defaultProps = {
  label: '',
  prefix: false,
  suffix: false,
  type: '',
  width: '100',
}

export default NewInput
