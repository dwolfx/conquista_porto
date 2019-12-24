import React from 'react'
import PropTypes from 'prop-types'

import { Button, Content } from './styles'

/**
 *
 * Props available:
 * - color:
 *  - (default) primary: blue background
 *  - secondary: green background
 * - outline:
 *  - true: white background, border of color props (blue or green)
 *
 */

const ConquistaButton = ({ children, color, outline, ...rest }) => (
  <Button color={color} outline={outline} {...rest}>
    <Content>{children}</Content>
  </Button>
)

ConquistaButton.defaultProps = {
  color: 'primary',
  outline: false,
}

ConquistaButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
  outline: PropTypes.bool,
}

export default ConquistaButton
