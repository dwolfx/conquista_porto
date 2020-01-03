import React from 'react'
import PropTypes from 'prop-types'

import { TextStyle } from './styles'

export default function Text({ type, bold, children, ...rest }) {
  return (
    <TextStyle type={type} bold={bold} {...rest}>
      {children}
    </TextStyle>
  )
}

Text.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'headline',
    'title',
    'subheading',
    'body',
    'caption',
    'captionUppercase',
    'button',
  ]),
}

Text.defaultProps = {
  bold: false,
  type: 'body',
}
