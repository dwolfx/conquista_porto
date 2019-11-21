import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function RightContent({ children }) {
  return <Container>{children}</Container>
}

RightContent.propTypes = {
  children: PropTypes.node.isRequired,
}
