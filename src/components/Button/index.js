import React from 'react'
import PropTypes from 'prop-types'

import LoadingIcon from 'components/Loading'

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

const ConquistaButton = ({
  children,
  color,
  outline,
  loading,
  loadingColor,
  ...rest
}) => (
  <Button color={color} outline={outline} {...rest}>
    <Content>{children}</Content>
    {loading && (
      <LoadingContainer>
        <LoadingIcon type="spinner" color={loadingColor} />
      </LoadingContainer>
    )}
  </Button>
)

ConquistaButton.defaultProps = {
  color: 'primary',
  loading: false,
  loadingColor: 'blue4',
  outline: false,
}

ConquistaButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
  loading: PropTypes.bool,
  loadingColor: PropTypes.string,
  outline: PropTypes.bool,
}

export default ConquistaButton
