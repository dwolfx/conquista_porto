import React from 'react'
import PropTypes from 'prop-types'

import { StyledDivisor } from './styles'

const Divisor = ({ vertical, customSize, ...rest }) => (
  <StyledDivisor vertical={vertical} customSize={customSize} {...rest} />
)

Divisor.propTypes = {
  vertical: PropTypes.bool,
  customSize: PropTypes.string,
}

Divisor.defaultProps = {
  vertical: false,
  customSize: '100%',
}

export default Divisor
