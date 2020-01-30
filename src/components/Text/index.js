import React from 'react'
import PropTypes from 'prop-types'

import { themeColors, fontTypes } from 'styles/theme'

import { TextStyle } from './styles'

export default function Text({ type, bold, color, children, ...rest }) {
  return (
    <TextStyle type={type} bold={bold} color={color} {...rest}>
      {children}
    </TextStyle>
  )
}

Text.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.oneOf(Object.keys(fontTypes)),
  color: PropTypes.oneOf([...Object.keys(themeColors), 'unset']),
}

Text.defaultProps = {
  children: null,
  bold: false,
  type: 'body',
  color: 'unset',
}
