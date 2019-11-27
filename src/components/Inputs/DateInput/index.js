/* eslint-disable no-param-reassign */
import React from 'react'
import PropTypes from 'prop-types'

import TextInput from 'components/Inputs/Text'

const DateInput = ({ onKeyPress, ...props }) => {
  const applyDateMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    let newValue = strippedValue

    if (strippedValue.length < 5) {
      newValue = strippedValue.replace(/(\d{2})(\d{1})/g, '$1/$2')
    } else {
      newValue = strippedValue.replace(/(\d{2})(\d{2})(\d{1})/g, '$1/$2/$3')
    }

    event.target.value = newValue

    if (onKeyPress) {
      onKeyPress()
    }
  }

  return <TextInput maxLength="10" onKeyUp={applyDateMask} {...props} />
}

DateInput.defaultProps = {
  onKeyPress: null,
}

DateInput.propTypes = {
  onKeyPress: PropTypes.func,
}

export default DateInput
