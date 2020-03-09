import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function ManageableItem({ active, children, onClick, ...rest }) {
  return (
    <Container onClick={onClick} active {...rest}>
      {children}
    </Container>
  )
}

ManageableItem.defaultProps = {
  active: false,
  onClick: null,
}

ManageableItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}
