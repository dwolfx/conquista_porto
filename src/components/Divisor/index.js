import React from 'react'
import PropTypes from 'prop-types'

import { StyledDivisor } from './styles'

const Divisor = ({ vertical }) => <StyledDivisor vertical={vertical} />

Divisor.propTypes = {
  vertical: PropTypes.bool,
}

Divisor.defaultProps = {
  vertical: false,
}

export default Divisor
