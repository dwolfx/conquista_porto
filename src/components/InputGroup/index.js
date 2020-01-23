import React from 'react'
import PropTypes from 'prop-types'

import { InputGroupWrapper, InputAddon, InputAddonText } from './styles'

const InputGroup = ({ prefix, suffix, children }) => (
  <InputGroupWrapper prefix={prefix} sufix={suffix}>
    <>
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
    </>
  </InputGroupWrapper>
)

InputGroup.propTypes = {
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  children: PropTypes.node.isRequired,
}

InputGroup.defaultProps = {
  prefix: false,
  suffix: false,
}

export default InputGroup
