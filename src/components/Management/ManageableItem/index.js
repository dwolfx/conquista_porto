import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function ManageableItem({ children }) {
  return <Container>{children}</Container>
}

ManageableItem.propTypes = {
  children: PropTypes.node.isRequired,
}
