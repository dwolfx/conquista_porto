import React from 'react'
import PropTypes from 'prop-types'

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
  color: PropTypes.oneOf([
    'black',
    'gray1',
    'gray2',
    'gray3',
    'gray4',
    'gray5',
    'gray6',
    'gray7',
    'white',
    'darkBlue1',
    'darkBlue2',
    'blue1',
    'blue2',
    'blue3',
    'blue4',
    'blue5',
    'green1',
    'green2',
    'green3',
    'green4',
    'green5',
    'yellow1',
    'yellow2',
    'magenta1',
    'magenta2',
  ]),
}

Text.defaultProps = {
  children: null,
  bold: false,
  type: 'body',
  color: 'unset',
}
