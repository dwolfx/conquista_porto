import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function LeftNav({ children }) {
  return <Container>{children}</Container>
}

LeftNav.propTypes = {
  children: PropTypes.node.isRequired,
}
