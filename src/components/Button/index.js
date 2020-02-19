import React from 'react'
import PropTypes from 'prop-types'

import LoadingSpinner from 'components/Loading'

import { Button, Content, LoadingContainer } from './styles'

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

const ConquistaButton = ({ children, color, outline, loading, ...rest }) => (
  <Button color={color} outline={outline} {...rest}>
    <Content>{children}</Content>
    {loading && (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    )}
  </Button>
)

ConquistaButton.defaultProps = {
  color: 'primary',
  loading: false,
  outline: false,
}

ConquistaButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
  loading: PropTypes.bool,
  outline: PropTypes.bool,
}

export default ConquistaButton
