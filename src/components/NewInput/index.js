import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import {
  Input,
  InputAddon,
  InputGroupWrapper,
  InputLabel,
  InputWrapper,
  ErrorMessage,
  ErrorIcon,
} from './styles'

const NewInput = forwardRef(
  ({ prefix, suffix, label, width, error, ...rest }, ref) => {
    return (
      <InputGroupWrapper>
        {label && <InputLabel>{label}</InputLabel>}
        <InputWrapper
          onClick={() => {
            ref.current.focus()
          }}
          width={width}
          error={error}
        >
          {prefix && <InputAddon id="prefix">{prefix}</InputAddon>}
          <Input ref={ref} {...rest} />
          {suffix && <InputAddon id="suffix">{suffix}</InputAddon>}
          {error && (
            <ErrorMessage>
              <ErrorIcon name={error.icon} width="16px" />
              {error.message}
            </ErrorMessage>
          )}
        </InputWrapper>
      </InputGroupWrapper>
    )
  }
)

NewInput.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  width: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}

NewInput.defaultProps = {
  label: '',
  prefix: false,
  suffix: false,
  width: '100',
  error: false,
}

export default NewInput
