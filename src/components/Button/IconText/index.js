import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from './styles'

export default function IconText({ iconName, children, ...rest }) {
  return (
    <Button {...rest}>
      <Icon name={iconName} color="gray4" />
      {children}
    </Button>
  )
}

IconText.propTypes = {
  iconName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
