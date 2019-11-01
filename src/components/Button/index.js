import React from 'react'
import PropTypes from 'prop-types'
import { Button } from './styles'

const ConquistaButton = ({ children, color }) => (
  <Button color={color}>{children}</Button>
)

ConquistaButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string
}

export default ConquistaButton
