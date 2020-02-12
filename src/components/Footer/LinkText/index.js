import React from 'react'
import PropTypes from 'prop-types'

import { BlueText } from './styles'

const LinkText = ({ hrefValue, children, ...rest }) => (
  <a {...rest} href={hrefValue}>
    <BlueText>{children}</BlueText>
  </a>
)

export default LinkText

LinkText.propTypes = {
  hrefValue: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}
