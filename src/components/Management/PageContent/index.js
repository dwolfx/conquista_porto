import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function PageContent({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
}
