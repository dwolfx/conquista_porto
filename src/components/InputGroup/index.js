import React from 'react'
import PropTypes from 'prop-types'

import {
  InputGroupWrapper,
  InputWrapper,
  InputLabel,
  InputAddon,
  InputAddonText,
} from './styles'

const InputGroup = ({ prefix, suffix, children, label }) => (
  <InputGroupWrapper>
    {label && <InputLabel>{label}</InputLabel>}
    <InputWrapper>
      {prefix && (
        <InputAddon>
          <InputAddonText>{prefix}</InputAddonText>
        </InputAddon>
      )}
      {children}
      {suffix && (
        <InputAddon>
          <InputAddonText>{suffix}</InputAddonText>
        </InputAddon>
      )}
    </InputWrapper>
  </InputGroupWrapper>
)

InputGroup.propTypes = {
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
}

InputGroup.defaultProps = {
  prefix: false,
  suffix: false,
  label: '',
}

export default InputGroup
