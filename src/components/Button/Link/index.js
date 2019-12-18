import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

import { Link } from './styles'

export default function ButtonLink({ text, ...rest }) {
  return (
    <Link {...rest}>
      {text}
      <Icon name="arrowright" />
    </Link>
  )
}

ButtonLink.defaultProps = {
  text: 'Link',
}

ButtonLink.propTypes = {
  text: PropTypes.string,
}
