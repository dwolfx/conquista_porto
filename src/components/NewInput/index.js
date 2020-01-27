import React from 'react'
import PropTypes from 'prop-types'

import {
  Input,
  InputAddon,
  InputAddonText,
  InputGroupWrapper,
  InputLabel,
  InputWrapper,
} from './styles'

const NewInput = ({ prefix, suffix, label, width, ...rest }) => (
  <InputGroupWrapper>
    {label && <InputLabel>{label}</InputLabel>}
    <InputWrapper>
      {prefix && (
        <InputAddon>
          <InputAddonText>{prefix}</InputAddonText>
        </InputAddon>
      )}
      <Input width={width} {...rest} />
      {suffix && (
        <InputAddon>
          <InputAddonText>{suffix}</InputAddonText>
        </InputAddon>
      )}
    </InputWrapper>
  </InputGroupWrapper>
)

NewInput.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  width: PropTypes.string,
}

NewInput.defaultProps = {
  label: '',
  prefix: false,
  suffix: false,
  width: '100',
}

export default NewInput
