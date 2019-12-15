import React from 'react'
import PropTypes from 'prop-types'

import { TextStyle } from './styles'

export default function Text({ type, bold, uppercase, children, ...rest }) {
  return (
    <TextStyle type={type} bold={bold} uppercase={uppercase} {...rest}>
      {children}
    </TextStyle>
  )
}

Text.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'title1',
    'title2',
    'title3',
    'title4',
    'title5',
    'title6',
    'paragraph',
    'subparagraph',
    'button',
  ]),
  uppercase: PropTypes.bool,
}

Text.defaultProps = {
  bold: false,
  type: 'paragraph',
  uppercase: false,
}
