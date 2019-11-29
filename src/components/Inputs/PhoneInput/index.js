/* eslint-disable no-param-reassign */
import React from 'react'
import PropTypes from 'prop-types'

import TextInput from 'components/Inputs/Text'

const PhoneInput = ({ onKeyUp, ...props }) => {
  const applyPhoneMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    let newValue = strippedValue

    newValue = strippedValue.replace(/(\d{4})(\d{1})/g, '$1-$2')

    if (strippedValue.length === 9) {
      newValue = strippedValue.replace(/(\d{5})(\d{1})/g, '$1-$2')
    }

    event.target.value = newValue

    if (onKeyUp) {
      onKeyUp()
    }
  }

  return <TextInput maxLength="10" onKeyUp={applyPhoneMask} {...props} />
}

PhoneInput.propTypes = {
  onKeyUp: PropTypes.func,
}

PhoneInput.defaultProps = {
  onKeyUp: null,
}

export default PhoneInput
