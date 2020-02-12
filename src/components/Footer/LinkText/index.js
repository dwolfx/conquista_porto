import React from 'react'
import PropTypes from 'prop-types'

import { BlueText } from './styles'

const LinkText = ({ hrefValue, children, gtmType, gtmClickType, gtmName }) => (
  <a
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-name={gtmName}
    href={hrefValue}
  >
    <BlueText>{children}</BlueText>
  </a>
)

export default LinkText

LinkText.propTypes = {
  hrefValue: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  gtmType: PropTypes.string,
  gtmClickType: PropTypes.string,
  gtmName: PropTypes.string,
}

LinkText.defaultProps = {
  gtmType: '',
  gtmClickType: '',
  gtmName: '',
}
