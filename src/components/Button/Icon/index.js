import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

import { Button } from './styles'

export default function ButtonIcon({ color, icon, size, ...rest }) {
  return (
    <Button color={color} size={size} {...rest}>
      <Icon name={icon} />
    </Button>
  )
}

ButtonIcon.defaultProps = {
  color: 'primary',
  size: 'small',
}

ButtonIcon.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
}
