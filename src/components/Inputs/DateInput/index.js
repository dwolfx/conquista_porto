/* eslint-disable no-param-reassign */
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import TextInput from 'components/Inputs/Text'
import NewTextInput from 'components/NewInput'

const DateInput = forwardRef(({ onKeyUp, newInput, ...rest }, ref) => {
  const applyDateMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    const newValue = strippedValue.replace(/(\d{2})(\d{2})(\d{1})/g, '$1/$2/$3')

    event.target.value = newValue

    onKeyUp()
  }

  if (newInput) {
    return (
      <NewTextInput
        onKeyUp={applyDateMask}
        maxLength="10"
        ref={ref}
        {...rest}
      />
    )
  }
  return (
    <TextInput maxLength="10" ref={ref} onKeyUp={applyDateMask} {...rest} />
  )
})

DateInput.defaultProps = {
  onKeyUp: () => {},
  newInput: false,
}

DateInput.propTypes = {
  onKeyUp: PropTypes.func,
  newInput: PropTypes.bool,
}

export default DateInput
