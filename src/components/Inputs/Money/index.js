import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import TextInput from 'components/NewInput'
import { formatMoneyDecimal } from 'helpers'

const MoneyInput = forwardRef(({ onChange, prefix, ...rest }, ref) => {
  const onChangeHandler = event => {
    const ev = event
    ev.target.value = formatMoneyDecimal(
      event.target.value.replace(/[\D]/g, '')
    )
    onChange(event)
  }

  return (
    <TextInput ref={ref} prefix={prefix} onChange={onChangeHandler} {...rest} />
  )
})

MoneyInput.propTypes = {
  onChange: PropTypes.func,
  prefix: PropTypes.string,
}

MoneyInput.defaultProps = {
  onChange: () => {},
  prefix: 'R$',
}

export default MoneyInput
