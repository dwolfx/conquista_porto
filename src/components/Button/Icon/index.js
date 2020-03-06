import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

import { Button } from './styles'

export default function ButtonIcon({ color, icon, size, isLoading, ...rest }) {
  return (
    <Button color={color} size={size} {...rest}>
      {!isLoading ? <Icon name={icon} /> : <Icon name="spinner" />}
    </Button>
  )
}

ButtonIcon.defaultProps = {
  color: 'primary',
  size: 'small',
  isLoading: false,
}

ButtonIcon.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
  isLoading: PropTypes.bool,
}
