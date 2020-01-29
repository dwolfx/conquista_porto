import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import {
  Input,
  InputAddon,
  InputGroupWrapper,
  InputLabel,
  InputWrapper,
} from './styles'

const NewInput = ({ prefix, suffix, label, width, error, ...rest }) => {
  const inputRef = useRef()
  return (
    <InputGroupWrapper>
      {label && <InputLabel>{label}</InputLabel>}
      <InputWrapper
        onClick={() => {
          inputRef.current.focus()
        }}
        width={width}
        error={error}
      >
        {prefix && <InputAddon id="prefix">{prefix}</InputAddon>}
        <Input ref={inputRef} {...rest} />
        {suffix && <InputAddon id="suffix">{suffix}</InputAddon>}
      </InputWrapper>
    </InputGroupWrapper>
  )
}

NewInput.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  width: PropTypes.string,
  error: PropTypes.bool,
}

NewInput.defaultProps = {
  label: '',
  prefix: false,
  suffix: false,
  width: '100',
  error: false,
}

export default NewInput
