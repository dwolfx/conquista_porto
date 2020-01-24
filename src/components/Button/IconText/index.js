import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from './styles'

export default function IconText({ iconName, children }) {
  return (
    <Button>
      <Icon name={iconName} />
      {children}
    </Button>
  )
}

IconText.propTypes = {
  iconName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
