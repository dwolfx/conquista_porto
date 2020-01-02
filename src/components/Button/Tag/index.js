import React from 'react'
import PropTypes from 'prop-types'

import { Button } from './styles'

export default function ButtonTag({ color, children, ...rest }) {
  return (
    <Button color={color} {...rest}>
      {children}
    </Button>
  )
}

ButtonTag.defaultProps = {
  color: '',
}

ButtonTag.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
}
