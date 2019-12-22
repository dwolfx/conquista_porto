import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

import { Link } from './styles'

export default function ButtonLink({ children, ...rest }) {
  return (
    <Link {...rest}>
      {children}
      <Icon name="arrowright" />
    </Link>
  )
}

ButtonLink.propTypes = {
  children: PropTypes.string.isRequired,
}
