import React from 'react'
import PropTypes from 'prop-types'

import {
  Input,
  InputAddon,
  InputGroupWrapper,
  InputLabel,
  InputWrapper,
} from './styles'

const NewInput = ({ prefix, suffix, label, questionType, width, ...rest }) => (
  <InputGroupWrapper>
    {label && <InputLabel>{label}</InputLabel>}
    <InputWrapper prefix={prefix} suffix={suffix}>
      {prefix && <InputAddon id="prefix">{prefix}</InputAddon>}
      <Input width={width} {...rest} questionType={questionType} />
      {suffix && <InputAddon id="suffix">{suffix}</InputAddon>}
    </InputWrapper>
  </InputGroupWrapper>
)

NewInput.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  questionType: PropTypes.string,
  width: PropTypes.string,
}

NewInput.defaultProps = {
  label: '',
  prefix: false,
  suffix: false,
  questionType: '',
  width: '100',
}

export default NewInput
