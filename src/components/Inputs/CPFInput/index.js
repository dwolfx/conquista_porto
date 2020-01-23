/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import TextInput from 'components/Inputs/Text'

import ValidateCPF from './validate'

const getStrippedValue = value => value.replace(/\D/g, '')

const applyCPFMask = inputValue => {
  const strippedValue = getStrippedValue(inputValue)
  let newValue = strippedValue

  // apply mask to cpf field (gradual mask, applying as the user enters the digits)
  if (strippedValue.length > 9) {
    newValue = strippedValue.replace(
      /(\d{3})(\d{3})(\d{3})(\d{1})/g,
      '$1.$2.$3-$4'
    )
  } else if (strippedValue.length > 6) {
    newValue = strippedValue.replace(/(\d{3})(\d{3})(\d{1})/g, '$1.$2.$3')
  } else {
    newValue = strippedValue.replace(/(\d{3})(\d{1})/g, '$1.$2')
  }

  return newValue
}

const CPFInput = ({ value, onChange, ...props }) => {
  const [error, setError] = useState(false)
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setInternalValue(applyCPFMask(value))
  }, [value, internalValue])

  useEffect(() => {
    const strippedValue = getStrippedValue(internalValue)
    const isValidCPF = ValidateCPF(strippedValue)
    setError(strippedValue.length === 11 && !isValidCPF)
  }, [internalValue])

  return (
    <TextInput
      maxLength="14"
      value={internalValue}
      onChange={onChange}
      error={error}
      {...props}
    />
  )
}

CPFInput.defaultProps = {
  onChange: () => {},
  value: '',
}

CPFInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default CPFInput
