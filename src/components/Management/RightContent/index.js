import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function RightContent({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>
}

RightContent.propTypes = {
  children: PropTypes.node.isRequired,
}
