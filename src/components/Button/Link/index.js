import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

import { Link } from './styles'

export default function ButtonLink({ children, noIcon, ...rest }) {
  return (
    <Link {...rest}>
      {children}
      {!noIcon && <Icon name="arrowright" />}
    </Link>
  )
}

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  noIcon: PropTypes.bool,
}

ButtonLink.defaultProps = {
  noIcon: false,
}
