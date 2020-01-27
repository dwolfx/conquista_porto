import React from 'react'
import PropTypes from 'prop-types'

import { StyledDivisor } from './styles'

const Divisor = ({ vertical, customSize }) => (
  <StyledDivisor vertical={vertical} customSize={customSize} />
)

Divisor.propTypes = {
  vertical: PropTypes.bool,
  customSize: PropTypes.string,
}

Divisor.defaultProps = {
  vertical: false,
}

export default Divisor
