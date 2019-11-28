/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextInput from 'components/Inputs/Text'

import ValidateCPF from './validate'

const CPFInput = ({ onKeyUp, ...props }) => {
  const [error, setError] = useState(false)

  const applyCPFMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
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

    if (strippedValue.length === 11) {
      const isValid = ValidateCPF(strippedValue)

      if (!isValid) {
        setError(true)
      } else {
        setError(false)
      }
    } else {
      setError(false)
    }

    event.target.value = newValue

    if (onKeyUp) {
      onKeyUp()
    }
  }

  return (
    <TextInput maxLength="14" onKeyUp={applyCPFMask} error={error} {...props} />
  )
}

CPFInput.defaultProps = {
  onKeyUp: null,
}

CPFInput.propTypes = {
  onKeyUp: PropTypes.func,
}

export default CPFInput
