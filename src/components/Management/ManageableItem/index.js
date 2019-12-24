import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function ManageableItem({ children, onClick, ...rest }) {
  return (
    <Container onClick={onClick} {...rest}>
      {children}
    </Container>
  )
}

ManageableItem.defaultProps = {
  onClick: null,
}

ManageableItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}
